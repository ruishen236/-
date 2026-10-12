export interface Dashboard {
  provenance: {
    source: string; is_simulated: boolean; start_date: string; end_date: string;
    generated_at: string; method: string; unit: string; adjustment: string;
  };
  initial_capital: number; demo_equity: number; demo_profit: number; demo_return_percent: number;
  series: { date: string; value: number }[];
  quotes: { symbol: string; name: string; sector: string; price: number; change_percent: number }[];
}

export async function getDashboard(signal: AbortSignal): Promise<Dashboard> {
  const response = await fetch('/api/dashboard', { signal });
  if (!response.ok) throw new Error(`演示数据接口返回 ${response.status}`);
  return response.json();
}
