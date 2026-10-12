import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowDownLeft, ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, ChevronRight, FlaskConical, GraduationCap, House, Layers3, Menu, Moon, Search, ShieldCheck, Sun, Wallet, X } from 'lucide-react';
import { getDashboard, type Dashboard } from './api';

const Chart = lazy(() => import('./Chart'));
const navigation = [
  { to: '/', name: '首页', icon: House },
  { to: '/learn', name: '股票学习', icon: BookOpen },
  { to: '/market', name: '行情中心', icon: ChartNoAxesCombined },
  { to: '/trade', name: '模拟交易', icon: Layers3 },
  { to: '/assets', name: '我的资产', icon: Wallet },
  { to: '/lab', name: '策略实验室', icon: FlaskConical },
];
const money = (n: number) => n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function Badge({ children = '模拟数据' }: { children?: React.ReactNode }) { return <span className="badge">{children}</span>; }
function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{text}</p></div>;
}
function Provenance({ data }: { data: Dashboard }) {
  const p = data.provenance;
  return <div className="provenance"><ShieldCheck size={17} /><div><strong>全部行情与收益均为模拟数据</strong><p>来源：{p.source} · 覆盖日期：{p.start_date} 至 {p.end_date}</p><p>生成时间：{p.generated_at} · {p.unit} · 复权：{p.adjustment}</p><p>{p.method}</p></div></div>;
}
function DataState({ error, retry }: { error: string; retry: () => void }) {
  return error ? <div className="panel state" role="alert"><h2>暂时无法获取演示数据</h2><p>{error}。请确认 FastAPI 已启动。</p><button className="primary" onClick={retry}>重新加载</button></div> : <div className="panel state" role="status">正在加载演示数据…</div>;
}
function Quotes({ data, query = '' }: { data: Dashboard; query?: string }) {
  const items = data.quotes.filter(q => `${q.name} ${q.symbol} ${q.sector}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <div className="table-scroll"><table><caption className="sr-only">虚构股票样例，模拟数据</caption><thead><tr><th>股票名称 / 代码</th><th>行业</th><th>示例价格（元）</th><th>模拟涨跌幅</th></tr></thead><tbody>{items.map(q => <tr key={q.symbol}><td><strong>{q.name}</strong><small>{q.symbol} · 模拟数据</small></td><td>{q.sector}</td><td className="number">{q.price.toFixed(2)}</td><td className={`number ${q.change_percent >= 0 ? 'up' : 'down'}`}>{q.change_percent > 0 ? '+' : ''}{q.change_percent.toFixed(2)}%</td></tr>)}</tbody></table>{!items.length && <p className="state">没有匹配的演示股票，请尝试“科技”或“DEMO001”。</p>}</div>;
}
function Home({ data, theme }: { data: Dashboard; theme: string }) {
  return <>
    <Heading eyebrow="你的投资学习，从这里开始" title="让每一次尝试，都成为进步。" text="在安全的模拟环境中认识市场，建立自己的投资思考方式。" />
    <div className="hero-strip"><div className="hero-symbol"><GraduationCap size={30} /></div><div><Badge>学习模式</Badge><h2>先学习，再实践</h2><p>从股票基础出发，用虚拟资金探索投资世界。</p></div><Link className="hero-link" to="/learn">开始学习 <ArrowRight size={18} /></Link></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 stats">
      <Stat title="虚拟初始资金" value={`¥ ${money(data.initial_capital)}`} hint="100万元 · 未发生交易" icon={<Wallet size={19} />} />
      <Stat title="示例期末资产" value={`¥ ${money(data.demo_equity)}`} hint="图表示例 · 非账户余额" icon={<ChartNoAxesCombined size={19} />} />
      <Stat title="示例累计收益" value={`+ ¥ ${money(data.demo_profit)}`} hint="人工演示 · 非实际收益" positive icon={<ArrowUpRight size={19} />} />
      <Stat title="示例收益率" value={`+ ${data.demo_return_percent.toFixed(2)}%`} hint="人工演示 · 非策略表现" positive icon={<FlaskConical size={19} />} />
    </div>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
      <section className="panel"><div className="panel-head"><div><h2>资产走势示例</h2><p className="muted text-sm">虚拟资金的十日样例 · 单位：元</p></div><Badge /></div><Suspense fallback={<div className="chart state">加载图表…</div>}><Chart data={data} theme={theme} /></Suspense><div className="chart-footer">{data.provenance.start_date} — {data.provenance.end_date}<span>非真实账户表现</span></div></section>
      <section className="panel learning-panel"><div className="panel-head"><h2>入门学习路径</h2><BookOpen size={19} /></div><p className="muted text-sm">从理解风险，到认识投资工具</p>{['认识股票与股东', '理解收益与风险', '了解模拟交易'].map((title, i) => <Link className="lesson-row" key={title} to="/learn"><span className="step-number">0{i + 1}</span><div><strong>{title}</strong><small>入门导览 · 内容预览</small></div><ChevronRight size={17} /></Link>)}<Link className="text-link" to="/learn">查看学习中心 <ArrowRight size={15} /></Link></section>
    </div>
    <section className="panel mt-5"><div className="panel-head"><div className="flex items-center gap-3"><h2>行情一览</h2><Badge /></div><Link className="text-link" to="/market">查看全部 <ArrowRight size={15} /></Link></div><Quotes data={data} /></section>
    <Provenance data={data} />
  </>;
}
function Stat({ title, value, hint, icon, positive = false }: { title: string; value: string; hint: string; icon: React.ReactNode; positive?: boolean }) {
  return <section className="panel stat"><div className="stat-label"><span>{title}</span>{icon}</div><div className={`stat-value ${positive ? 'up' : ''}`}>{value}</div><p>{hint}</p><Badge /></section>;
}
const lessons = [
  { title: '认识股票与股东', label: '01 · 基础概念', content: '股票可以理解为公司所有权的一部分。购买股票意味着承担公司经营与市场变化带来的风险；价格上涨不是必然结果。这里先建立概念，后续阶段再提供系统课程和参考资料。' },
  { title: '理解收益与风险', label: '02 · 风险意识', content: '股票价格可能上涨，也可能下跌。历史表现不能保证未来收益；分散持有不同资产也不能消除所有风险。学习时应区分事实、假设与预测，避免把演示收益当作盈利承诺。' },
  { title: '了解模拟交易', label: '03 · 实践准备', content: 'StockLab 使用虚拟资金，演示行情为人工样例，不代表真实证券。当前阶段没有下单或撮合功能。后续实现前会核实适用的交易规则，并说明模拟成交与真实市场的差异。' },
];
function Learn() {
  const [selected, setSelected] = useState(0);
  return <><Heading eyebrow="学习中心" title="从零开始，读懂股票。" text="先建立基础概念，再逐步形成自己的判断。当前提供三个入门导览。" /><div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]"><section className="panel"><div className="panel-head"><h2>入门目录</h2><Badge>内容预览</Badge></div>{lessons.map((lesson, i) => <button key={lesson.title} className={`course-button ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)} aria-pressed={selected === i}><span>{lesson.label}</span><strong>{lesson.title}</strong><ChevronRight size={18} /></button>)}</section><article className="panel article"><BookOpen size={32} className="accent" /><p className="eyebrow">{lessons[selected].label}</p><h2>{lessons[selected].title}</h2><p>{lessons[selected].content}</p><div className="notice">系统课程、测验与规则参考资料将在后续阶段逐步补充。</div></article></div></>;
}
function Market({ data }: { data: Dashboard }) {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  return <><Heading eyebrow="市场观察" title="行情中心" text="用虚构的股票样例认识行情界面；这里没有实时或真实历史行情。" /><section className="panel"><div className="panel-head"><h2>{query ? `搜索结果：${query}` : '全部演示股票'}</h2><Badge /></div><Quotes data={data} query={query} /></section><Provenance data={data} /><div className="notice">K 线、真实历史数据导入及技术指标将在后续阶段实现。</div></>;
}
function Trade() {
  return <><Heading eyebrow="实践空间" title="模拟交易" text="100万元虚拟资金，给学习留出试错的空间。" /><div className="grid gap-5 lg:grid-cols-2"><section className="panel feature-panel"><Layers3 size={36} className="accent" /><Badge>功能筹备中</Badge><h2>交易，从理解规则开始</h2><p>本阶段尚未开放下单、撮合和持仓更新。交易日历、成交价格、费用及可交易范围将在实现前核实并说明。</p><button disabled className="primary">下单功能尚未开放</button></section><section className="panel feature-panel"><h2>未来的模拟交易流程</h2>{['选择支持的股票与交易日期', '确认数量、价格和虚拟资金', '查看模拟成交与账户变化'].map((t, i) => <div className="lesson-row" key={t}><span className="step-number">0{i + 1}</span><p>{t}</p></div>)}<div className="notice">仅使用虚拟资金，不连接真实证券账户。</div></section></div></>;
}
function Assets({ data }: { data: Dashboard }) {
  return <><Heading eyebrow="账户概览" title="我的资产" text="初始状态展示；尚未创建持久化账户或执行任何交易。" /><div className="grid gap-4 md:grid-cols-3 stats"><Stat title="虚拟初始资金" value={`¥ ${money(data.initial_capital)}`} hint="初始化预览 · 模拟数据" icon={<Wallet size={19} />} /><Stat title="示例可用资金" value={`¥ ${money(data.initial_capital)}`} hint="未发生交易 · 不持久化" icon={<ArrowDownLeft size={19} />} /><Stat title="示例持仓市值" value="¥ 0.00" hint="无持仓 · 模拟数据" icon={<Layers3 size={19} />} /></div><section className="panel state"><Wallet size={40} className="accent" /><h2>还没有模拟持仓</h2><p>首页的收益卡片和走势图是独立人工样例，不计入这里的资金。</p><Link className="text-link" to="/trade">了解模拟交易 <ArrowRight size={16} /></Link></section><Provenance data={data} /></>;
}
function Lab() {
  return <><Heading eyebrow="用数据检验想法" title="策略实验室" text="让投资想法变成可以解释、可以检验的实验。" /><section className="panel feature-panel lab-panel"><div className="lab-icon"><FlaskConical size={42} /></div><Badge>功能筹备中</Badge><h2>你的第一个策略实验，即将从这里开始</h2><p>后续使用 Python、Pandas 与 NumPy 实现策略回测。本阶段不运行策略，也不展示虚构的回测结果。</p><div className="grid gap-4 md:grid-cols-3 w-full mt-6">{[['01', '准备数据', '记录来源、日期和复权方式'], ['02', '定义策略', '明确参数、信号与成交假设'], ['03', '检验结果', '关注风险与复现，避免未来数据']].map(([n, title, text]) => <div className="lab-step" key={n}><span className="eyebrow">{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div><button className="primary mt-6" disabled>回测功能尚未开放</button></section></>;
}
export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('stocklab-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('stocklab-theme', theme); } catch { /* 私密模式下仍允许当前会话切换主题。 */ }
  }, [theme]);
  useEffect(() => { setMenu(false); }, [location.pathname, location.search]);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    setError('');
    getDashboard(controller.signal).then(setData).catch((e: unknown) => {
      if (!cancelled) setError(e instanceof Error && e.name === 'AbortError' ? '请求超时' : '接口连接失败');
    }).finally(() => window.clearTimeout(timeout));
    let cancelled = false;
    return () => { cancelled = true; controller.abort(); window.clearTimeout(timeout); };
  }, [attempt]);
  const ready = (page: (d: Dashboard) => React.ReactNode) => data ? page(data) : <DataState error={error} retry={() => setAttempt(n => n + 1)} />;
  return <div className="app-shell">
    <a className="skip-link" href="#main">跳到正文</a>
    {menu && <button className="nav-backdrop" aria-label="关闭导航遮罩" onClick={() => setMenu(false)} />}
    <aside className={`sidebar ${menu ? 'open' : ''}`} aria-label="侧边栏">
      <Link to="/" className="brand" onClick={() => setMenu(false)}><span className="brand-mark"><ChartNoAxesCombined size={24} /></span><span>Stock<span className="accent">Lab</span><small>股票学习实验室</small></span></Link>
      <div className="sidebar-label">探索与实践</div>
      <nav aria-label="主导航">{navigation.map(({ to, name, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setMenu(false)} end={to === '/'}><Icon size={20} /><span>{name}</span>{to === '/lab' && <span className="nav-tag">实验</span>}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="sandbox-note"><ShieldCheck size={21} /><strong>安心学习，放心探索</strong><p>全站仅供学习与模拟<br />不涉及真实证券交易</p></div><div className="profile"><span className="avatar">学</span><div><strong>学习者</strong><small>本地演示模式 · 无登录</small></div></div></div>
    </aside>
    <div className="workspace"><header className="topbar"><button className="icon-button mobile-menu" aria-label={menu ? '关闭导航' : '打开导航'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={21} /> : <Menu size={21} />}</button><form className="search" role="search" onSubmit={e => { e.preventDefault(); navigate(`/market${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`); }}><Search size={18} /><input aria-label="搜索演示股票" placeholder="搜索演示股票、代码或行业" value={query} onChange={e => setQuery(e.target.value)} /><button type="submit">搜索</button></form><div className="top-actions"><span className="mode-dot" /><span className="mode-text">模拟学习模式</span><button className="icon-button" aria-label={theme === 'dark' ? '切换浅色主题' : '切换深色主题'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button></div></header>
    <main id="main" className="main-content"><Routes><Route path="/" element={ready(d => <Home data={d} theme={theme} />)} /><Route path="/learn" element={<Learn />} /><Route path="/market" element={ready(d => <Market data={d} />)} /><Route path="/trade" element={<Trade />} /><Route path="/assets" element={ready(d => <Assets data={d} />)} /><Route path="/lab" element={<Lab />} /><Route path="*" element={<div className="panel state"><h1>页面不存在</h1><Link className="text-link" to="/">返回首页</Link></div>} /></Routes><footer>StockLab · 从理解开始，让投资学习更有章法。<span>学习用途 / 虚拟资金 / 模拟数据</span></footer></main></div>
  </div>;
}
