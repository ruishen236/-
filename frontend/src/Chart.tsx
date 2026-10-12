import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { Dashboard } from './api';

echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

export default function Chart({ data, theme }: { data: Dashboard; theme: string }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    const chart = echarts.init(container.current);
    const muted = theme === 'dark' ? '#91a0b3' : '#65758a';
    chart.setOption({
      animation: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationDuration: 500,
      grid: { top: 24, right: 20, bottom: 30, left: 62 },
      tooltip: { trigger: 'axis', valueFormatter: (value: unknown) => `¥${Number(value).toLocaleString('zh-CN')}（模拟）` },
      xAxis: { type: 'category', boundaryGap: false, data: data.series.map(p => p.date.slice(5)), axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: muted } },
      yAxis: { type: 'value', min: 990000, max: 1030000, axisLabel: { color: muted, formatter: (v: number) => `${v / 10000}万` }, splitLine: { lineStyle: { color: theme === 'dark' ? '#24303e' : '#e7edf2', type: 'dashed' } } },
      series: [{ type: 'line', data: data.series.map(p => p.value), smooth: false, showSymbol: false, lineStyle: { width: 3, color: '#36bba0' }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#36bba040' }, { offset: 1, color: '#36bba000' }]) } }],
    });
    // 观察容器尺寸，导航与手机布局变化时也能重绘，不只监听窗口。
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(container.current);
    return () => { observer.disconnect(); chart.dispose(); };
  }, [data, theme]);
  return <div ref={container} className="chart" role="img" aria-label={`模拟资产走势，${data.provenance.start_date}至${data.provenance.end_date}，期末${data.demo_equity}元`} />;
}
