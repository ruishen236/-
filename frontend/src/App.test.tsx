import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, test, expect, beforeEach } from 'vitest';
import App from './App';

vi.mock('./Chart', () => ({ default: () => <div aria-label="模拟走势图" /> }));
const demo = {
  initial_capital: 1000000, demo_equity: 1018600, demo_profit: 18600, demo_return_percent: 1.86,
  series: [{ date: '2026-09-01', value: 1000000 }],
  provenance: { source: 'StockLab 内置人工演示数据', is_simulated: true, start_date: '2026-09-01', end_date: '2026-09-10', generated_at: '2026-10-12T00:00:00+08:00', method: '人工固定样例', unit: '人民币元', adjustment: '不适用' },
  quotes: [{ symbol: 'DEMO001', name: '示例科技', sector: '科技', price: 128.60, change_percent: 2.35 }, { symbol: 'DEMO002', name: '示例消费', sector: '消费', price: 20, change_percent: -1 }],
};
beforeEach(() => { vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => demo })); });
function mount(path = '/') { return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>); }

test('首页使用接口数据，显示资金和来源标记', async () => {
  mount();
  expect(await screen.findByText('让每一次尝试，都成为进步。')).toBeInTheDocument();
  expect(screen.getByText('¥ 1,000,000.00')).toBeInTheDocument();
  expect(screen.getByText('全部行情与收益均为模拟数据')).toBeInTheDocument();
  expect(screen.getByText(/来源：StockLab 内置人工演示数据/)).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith('/api/dashboard', expect.objectContaining({ signal: expect.any(AbortSignal) }));
});

test('六个页面均能通过导航访问，未知路径可以返回首页', async () => {
  const user = userEvent.setup();
  mount('/missing');
  expect(screen.getByText('页面不存在')).toBeInTheDocument();
  const nav = within(screen.getByRole('navigation', { name: '主导航' }));
  for (const [name, heading] of [['首页', '让每一次尝试，都成为进步。'], ['股票学习', '从零开始，读懂股票。'], ['行情中心', '行情中心'], ['模拟交易', '模拟交易'], ['我的资产', '我的资产'], ['策略实验室', '策略实验室']]) {
    await user.click(nav.getByRole('link', { name: new RegExp(name) }));
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  }
});

test('搜索跳转行情页并过滤演示数据，支持空结果', async () => {
  const user = userEvent.setup(); mount();
  await screen.findByText('让每一次尝试，都成为进步。');
  const input = screen.getByRole('textbox', { name: '搜索演示股票' });
  await user.type(input, '科技'); await user.click(screen.getByRole('button', { name: '搜索' }));
  expect(await screen.findByText('搜索结果：科技')).toBeInTheDocument();
  expect(screen.getByText('示例科技')).toBeInTheDocument();
  expect(screen.queryByText('示例消费')).not.toBeInTheDocument();
  await user.clear(input); await user.type(input, '不存在'); await user.keyboard('{Enter}');
  expect(await screen.findByText(/没有匹配的演示股票/)).toBeInTheDocument();
});

test('主题切换保存偏好，手机导航点击后关闭', async () => {
  const user = userEvent.setup(); mount();
  await user.click(screen.getByRole('button', { name: '切换浅色主题' }));
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(localStorage.getItem('stocklab-theme')).toBe('light');
  await user.click(screen.getByRole('button', { name: '打开导航' }));
  expect(screen.getByRole('button', { name: '关闭导航' })).toHaveAttribute('aria-expanded', 'true');
  await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: '股票学习' }));
  expect(screen.getByRole('button', { name: '打开导航' })).toHaveAttribute('aria-expanded', 'false');
});

test('接口失败显示错误且可重试，不使用假成功数据', async () => {
  vi.mocked(fetch).mockRejectedValueOnce(new Error('offline'));
  const user = userEvent.setup(); mount();
  expect(await screen.findByRole('alert')).toHaveTextContent('接口连接失败');
  expect(screen.queryByText('¥ 1,000,000.00')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: '重新加载' }));
  expect(await screen.findByText('¥ 1,000,000.00')).toBeInTheDocument();
});

test('学习目录可切换，交易和回测按钮不可执行', async () => {
  const user = userEvent.setup(); mount('/learn');
  await user.click(screen.getByRole('button', { name: /理解收益与风险/ }));
  expect(screen.getByRole('heading', { name: '理解收益与风险' })).toBeInTheDocument();
  await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: '模拟交易' }));
  expect(screen.getByRole('button', { name: '下单功能尚未开放' })).toBeDisabled();
  await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: /策略实验室/ }));
  expect(screen.getByRole('button', { name: '回测功能尚未开放' })).toBeDisabled();
});
