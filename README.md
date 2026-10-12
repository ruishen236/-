# StockLab · 股票学习实验室

面向中国 A 股学习的前后端分离网站。阶段一已实现六页基础界面、响应式导航、搜索、深浅主题及 FastAPI 首页演示数据接口。

**所有行情、资产预览与收益都是模拟数据。** 初始虚拟资金为 1,000,000 元；首页的示例期末资产 1,018,600 元和示例收益 18,600 元只是独立人工样例，不代表已经发生交易。当前不能下单、持久化账户或运行回测，不连接真实证券账户。

## 功能与页面

| 页面 | 路径 | 当前行为 |
| --- | --- | --- |
| 首页 | `/` | 从后端加载资金、示例收益、ECharts 十日走势与虚构股票列表；加载失败可重试 |
| 股票学习 | `/learn` | 三个入门导览，可点击目录切换阅读内容；不是完整课程 |
| 行情中心 | `/market` | 展示四只 DEMO 虚构股票，按名称、代码或行业搜索 |
| 模拟交易 | `/trade` | 展示未来流程及功能边界，下单按钮不可执行 |
| 我的资产 | `/assets` | 展示 100 万元初始资金与无持仓状态；不持久化 |
| 策略实验室 | `/lab` | 展示后续回测流程，回测按钮不可执行 |

桌面左侧固定导航；手机点击左上角菜单打开导航。右上角太阳/月亮按钮切换主题，并在浏览器本地保存偏好。搜索示例：`科技`、`DEMO001`、`消费`；提交搜索后进入行情中心，匹配不到时显示空结果。

## 技术与目录

- 前端：React 19、TypeScript、Vite 6、Tailwind CSS 4、React Router、ECharts、Lucide 图标。
- 后端：Python 3.12、FastAPI、Pydantic、Uvicorn。
- 测试：Pytest、Vitest、Testing Library。
- 当前为只读演示 API，未引入 SQLite、SQLAlchemy、Pandas、NumPy；持久化与回测阶段再按需求引入。

```text
frontend/                 前端项目、package-lock.json、组件测试
backend/app/              FastAPI 应用与演示数据模型
backend/tests/            后端接口测试
backend/requirements.txt  直接依赖
backend/requirements.lock.txt  锁定传递依赖
AGENTS.md                 开发规范
docs/                     规划、架构与进度
```

## Windows 安装与启动（PowerShell）

先安装 Node.js **22.12+（建议 24 LTS）** 和 **Python 3.12**，检查 `node --version`、`npm --version`、`py -3.12 --version`。以下假设项目文件已放在 `C:\Projects\StockLab`，请替换为实际目录。云端 `/workspace/-` 不是 Windows 路径。可从 GitHub 克隆或下载项目到 Windows 后再运行：`git clone https://github.com/ruishen236/-.git C:\Projects\StockLab`。

**窗口一：后端**

```powershell
cd C:\Projects\StockLab\backend
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.lock.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

直接使用虚拟环境中的 Python，不需要激活脚本或修改 PowerShell 执行策略。后端就绪后，可在浏览器访问 `http://127.0.0.1:8000/docs` 查看接口文档。

**窗口二：前端**

```powershell
cd C:\Projects\StockLab\frontend
npm.cmd ci
npm.cmd run dev
```

使用 `npm.cmd` 可避免 PowerShell 对 `npm.ps1` 的执行策略限制。打开浏览器并输入 `http://127.0.0.1:5173`。两个终端都要保持运行，分别按 `Ctrl+C` 停止。

默认深色首页应显示左侧六页导航、顶部搜索、100 万元虚拟初始资金、模拟收益卡片、示例资产走势图、学习路径与四只虚构股票；页面下方有数据来源、覆盖日期及生成时间说明。手机宽度下内容纵向排列，表格可横向滚动。

## 测试与生产构建

在后端目录执行：

```powershell
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m pip check
```

在前端目录执行：

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
```

`build` 包含 TypeScript 检查，生成 `frontend/dist/`。本地预览构建可运行 `npm.cmd run preview`（默认 4173 端口），仍需保持后端运行。这是本地验证方式，不是公开部署方案。未来部署需配置 `/api` 反向代理与单页应用路径回退。

云环境（Linux）的等效后端步骤为 `python3 -m venv .venv`、`.venv/bin/python -m pip install -r requirements.lock.txt`、`.venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000`；前端使用 `npm ci` 和 `npm run dev`。

## 接口与数据说明

- `GET /api/health`：返回 `status=ok`、`mode=demo`。
- `GET /api/dashboard`：返回初始资金、示例资产、收益、走势、虚构股票与来源元数据。
- 没有订单、登录、真实行情或回测接口。

样例覆盖 2026-09-01 至 2026-09-10，生成时间为 2026-10-12 00:00（Asia/Shanghai）。连续自然日只是演示标签，不是 A 股交易日历；股票代码 `DEMO001` 等不对应真实证券。人民币元、百分比与复权“不适用”均随 API 元数据展示。固定数据每次请求相同，不会随时间自动更新。

浏览器请求同源 `/api`，Vite 开发和本地预览服务器代理到 `127.0.0.1:8000`，无需开放全局跨域。没有外部行情请求、付费服务或密钥要求。

## 常见问题与限制

- 首页提示接口失败：确认后端运行且 8000 端口可用，访问健康检查后点击“重新加载”。前端不会静默切换到假成功数据。
- 5173 端口占用：先停止占用进程；开发服务器设置为严格端口，不自动换端口。
- 交易与回测按钮灰色：属于本阶段的明确边界，不是错误。
- 网站目前没有账户存储，刷新不会保留交易状态；仅主题偏好保存在浏览器。
- 目前在 Linux 云环境验证，尚未在 Windows 真机执行上述步骤。

后续开发范围参见 `docs/PROJECT_PLAN.md`，实际验证结果参见 `docs/PROGRESS.md`。
