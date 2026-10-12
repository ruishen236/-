from decimal import Decimal

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    assert client.get("/api/health").json() == {"status": "ok", "mode": "demo"}


def test_dashboard_amounts_and_provenance():
    response = client.get("/api/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert data["initial_capital"] == 1_000_000
    assert data["demo_equity"] - data["initial_capital"] == data["demo_profit"]
    assert Decimal(str(data["demo_return_percent"])) == Decimal(data["demo_profit"]) / Decimal(data["initial_capital"]) * 100
    assert data["provenance"]["is_simulated"] is True
    assert data["provenance"]["source"]
    assert data["provenance"]["generated_at"].endswith("+08:00")
    assert data["series"][0]["date"] == data["provenance"]["start_date"]
    assert data["series"][-1]["date"] == data["provenance"]["end_date"]
    assert data["series"][-1]["value"] == data["demo_equity"]
    assert all(q["symbol"].startswith("DEMO") for q in data["quotes"])


def test_demo_is_repeatable():
    assert client.get("/api/dashboard").json() == client.get("/api/dashboard").json()


def test_no_trading_endpoint():
    assert client.post("/api/orders", json={"symbol": "DEMO001"}).status_code == 404
