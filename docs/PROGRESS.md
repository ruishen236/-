# StockLab 开发进度

更新时间：2026-10-12（Asia/Shanghai）

## 已完成

- 阶段 0：项目路线、架构、进度与开发规范文档初始化。
- 阶段 1（本次指定范围）：React + TypeScript + Vite 前端、Tailwind CSS 响应式界面、FastAPI 后端。
- 六个中文页面：首页、股票学习、行情中心、模拟交易、我的资产、策略实验室；未知路由可返回首页。
- 桌面侧边导航、手机展开导航、顶部按名称/代码/行业搜索、深浅主题切换和偏好保存。
- 首页通过 `/api/dashboard` 展示 100 万元虚拟初始资金、独立模拟收益卡片、ECharts 示例走势图和四只 DEMO 虚构股票。
- `/api/health` 健康检查；接口失败或超时时显示错误并可重试，不静默填入备用数据。
- 所有演示行情和收益标注模拟数据、来源、覆盖日期与生成时间；资产页初始状态不等同于首页示例收益。
- 三个可切换的学习导览；模拟交易和回测页面明确标注筹备状态，执行按钮禁用。
- 中文 README、Windows PowerShell 安装/启动/测试方法、前后端基础测试及依赖锁定。

## 进行中

无。本次要求的阶段一实现及可用环境验证已完成。项目采用 Git 保存，远程同步状态以 GitHub 仓库分支为准。

## 本次验证记录

运行环境：Linux 云环境，Node.js 24.19.0、npm 11.9.0、Python 3.12.14。

| 验证 | 结果 |
| --- | --- |
| `backend/.venv/bin/python -m pytest -q`（backend 目录执行时使用 `.venv/bin/python`） | 4 项通过：健康接口、资金与来源一致性、固定数据重复性、无交易接口 |
| `.venv/bin/python -m pip check`（backend） | 通过，无损坏依赖 |
| `npm test`（frontend） | 6 项通过：首页数据、六页导航、搜索与空结果、主题和菜单、失败重试、学习切换与禁用操作 |
| `npm run build`（frontend） | TypeScript 检查及 Vite 生产构建通过 |
| `npm audit`（frontend） | 最终依赖版本检查：0 个已报告漏洞；不代表未来无新漏洞 |
| 锁定依赖安装 | 已执行 `npm ci` 与 `pip install -r requirements.lock.txt`；测试工具安全更新后再次执行完整锁定安装脚本、测试和构建通过 |
| 实际启动与接口通信 | Uvicorn 启动成功；Vite 开发代理请求健康接口成功；首页 API 返回预期结构和金额 |
| Chromium 浏览器检查 | 对生产构建本地预览验证六页、真实 API 通信、ECharts、搜索、主题刷新保存、深链接重载、错误重试；无 JavaScript 错误 |
| 响应式与视觉检查 | 桌面 1440px、手机 390px 截图检查；320px/390px 无页面横向溢出，图表适应宽度，手机导航操作正常 |

初轮后端收益率断言因浮点精确比较失败，已改用 Decimal 核对，最终通过；前端测试代码一个不受支持的类型选项已修正。窄屏动态切换时需要等待 ECharts 的 ResizeObserver 重绘，浏览器验证使用就绪条件等待后通过。

后端测试有 1 条 Starlette 对 AnyIO 旧别名的弃用提示，不影响测试通过；未关闭警告或绕过断言。浏览器下载曾被域名策略拒绝，改用环境已有 `/usr/bin/chromium` 完成验证，没有更改网络策略。

Windows 真机测试和公开部署未执行。

## 待开发

- 系统学习课程、测验和交易规则权威参考（目前只有导览）。
- 合法行情来源评估、历史数据导入、K 线及技术指标（目前只有人工样例折线和报价）。
- SQLite + SQLAlchemy 持久化账户、100 万元虚拟资金模拟交易及经过核实的交易规则。
- Python + Pandas + NumPy 策略回测与可复现结果。
- 按需完善、多用户隔离与公开部署准备。

本次范围按用户明确要求聚焦界面与演示 API。原阶段一路线中的 SQLite 接入延后，当前不产生持久化交易数据。

## 待确认事项

真实行情来源及许可、证券范围、交易日历、成交模型、费用与涨跌幅规则、复权和公司行动处理均未确定。涉及相关功能的任务开始前查证，不用演示数据替代真实规则证据。

## Windows 运行方式

完整步骤见根目录 `README.md`。要求 Node.js 22.12+（建议 24 LTS）、Python 3.12。两个 PowerShell 窗口分别运行后端 8000 和前端 5173；打开 `http://127.0.0.1:5173`。从 GitHub 克隆或下载项目到 Windows 后，按 README 安装依赖并启动。

## 本次文件清单与云环境配置

创建文件：

- 根目录：`.gitignore`、`README.md`。
- 后端：`backend/app/__init__.py`、`backend/app/main.py`、`backend/requirements.txt`、`backend/requirements.lock.txt`、`backend/pytest.ini`、`backend/tests/test_api.py`。
- 前端配置：`frontend/package.json`、`frontend/package-lock.json`、`frontend/index.html`、`frontend/tsconfig.json`、`frontend/vite.config.ts`。
- 前端源码与测试：`frontend/src/main.tsx`、`frontend/src/App.tsx`、`frontend/src/api.ts`、`frontend/src/Chart.tsx`、`frontend/src/styles.css`、`frontend/src/App.test.tsx`、`frontend/src/test-setup.ts`。

修改文件：`AGENTS.md`、`docs/PROJECT_PLAN.md`、`docs/ARCHITECTURE.md`、`docs/PROGRESS.md`。原文档初始化成果均保留并更新状态。

已在云环境配置草稿保存完整 `install_script` 和 `start_skill`；锁定安装与启动就绪检查已在当前实例执行。保存不等于发布，也不等于推送代码或证明新任务恢复成功。需要持久化此云环境时，在环境设置中审阅、保存并发布。

## 仓库同步

按用户授权将规划文档和阶段一实现一并提交至 `ruishen236/-` 的 `main` 分支。提交不包含虚拟环境、node_modules、构建产物、数据库或本地凭据。Windows 运行方式见 README，尚未在 Windows 真机验证。
