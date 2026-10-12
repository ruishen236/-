"""StockLab 阶段一：只读演示接口，不创建真实或模拟交易订单。"""

from fastapi import FastAPI
from pydantic import BaseModel


class Provenance(BaseModel):
    source: str
    is_simulated: bool
    start_date: str
    end_date: str
    generated_at: str
    method: str
    unit: str
    adjustment: str


class Point(BaseModel):
    date: str
    value: int


class Quote(BaseModel):
    symbol: str
    name: str
    sector: str
    price: float
    change_percent: float


class Dashboard(BaseModel):
    provenance: Provenance
    initial_capital: int
    demo_equity: int
    demo_profit: int
    demo_return_percent: float
    series: list[Point]
    quotes: list[Quote]


app = FastAPI(title="StockLab 演示 API", version="0.1.0")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "mode": "demo"}


@app.get("/api/dashboard", response_model=Dashboard)
def dashboard() -> Dashboard:
    # 固定人工样例可重复验证；日期不是交易日历，收益不是账户结算结果。
    values = [1000000, 1002800, 998600, 1005200, 1001900, 1010800, 1008200, 1015600, 1012300, 1018600]
    return Dashboard(
        provenance=Provenance(
            source="StockLab 内置人工演示数据",
            is_simulated=True,
            start_date="2026-09-01",
            end_date="2026-09-10",
            generated_at="2026-10-12T00:00:00+08:00",
            method="人工固定样例，按连续自然日展示，不对应实际证券或交易日",
            unit="人民币元（虚拟）；涨跌幅单位：%",
            adjustment="不适用（虚构样例，非真实行情）",
        ),
        initial_capital=1000000,
        demo_equity=values[-1],
        demo_profit=values[-1] - values[0],
        demo_return_percent=1.86,
        series=[Point(date=f"2026-09-{i:02d}", value=value) for i, value in enumerate(values, 1)],
        quotes=[
            Quote(symbol="DEMO001", name="示例科技", sector="科技", price=128.60, change_percent=2.35),
            Quote(symbol="DEMO002", name="示例新能源", sector="新能源", price=36.82, change_percent=-1.24),
            Quote(symbol="DEMO003", name="示例消费", sector="消费", price=82.15, change_percent=0.86),
            Quote(symbol="DEMO004", name="示例金融", sector="金融", price=15.76, change_percent=1.12),
        ],
    )
