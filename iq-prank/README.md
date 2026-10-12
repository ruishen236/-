# 国际智力水平测评中心

React + Vite + JavaScript 编写的朋友间整蛊网站。15道原创逻辑题按难度渐进，完成答题后播放约4秒的模拟分析动画，再暂停1.2秒，显示固定文字「李大燚是SB！」。答案不会影响最终结果，本项目不提供真实智商测量。

## 从 GitHub 下载到 Windows

点击 [下载包含本项目的 ZIP](https://github.com/ruishen236/-/archive/refs/heads/iq-prank-download.zip)，下载完成后右键选择「全部提取」。请下载 `iq-prank-download` 分支；原来的 `main` 分支不包含本网站。

在解压后的文件夹里打开 `iq-prank` 子文件夹，确认能看到 `package.json` 和 `start-windows.cmd`。安装 Node.js LTS 后，双击 `start-windows.cmd` 即可安装依赖并自动打开网站。不要在压缩包里直接双击脚本；先解压全部文件。

仓库页面：[查看 iq-prank 文件夹](https://github.com/ruishen236/-/tree/iq-prank-download/iq-prank)。GitHub 页面只能查看源码，运行网站仍需下方的本地启动或 Vercel 部署步骤。

## 功能

- 中文蓝白色首页、原创脑形与轨道插画，支持电脑与手机。
- 可选昵称（不影响固定结果），无需登录或注册。
- 数学逻辑、数字规律、空间推理各5题，每题4选1。
- 单题显示、选择高亮、未选提示、上一题修改、动态答题进度。
- 约4秒模拟分析、结论暂停、巨大文字弹出、纸屑及彩带动画。
- 浏览器合成音效与静音开关；系统限制音频播放时，视觉流程正常。
- 重新测试、系统分享、复制链接及手动复制回退。
- 明暗模式、键盘操作、减少动态效果偏好适配。
- 昵称与答案只存在当前页面内存中，刷新后清空；只有明暗偏好保存在本机 localStorage。
- 无数据库、无后台服务、无追踪脚本、无付费 API、无外部字体或运行时资源请求。

## Windows 本地运行（PowerShell）

**快捷方式：** 安装 Node.js LTS 后，双击项目里的 `start-windows.cmd`，它会安装依赖、启动 Vite 并自动打开浏览器。保留终端窗口即可。首次使用需要联网下载依赖。也可以按下面步骤手动运行。

1. 安装免费的 [Node.js LTS](https://nodejs.org/)，版本需要 **22.12.0或更新**，建议使用当前LTS版本。安装后重新打开终端。
2. 将整个项目文件夹下载或复制到电脑，例如 `C:\Projects\iq-prank`。不要只复制 `src`；需要保留 `package.json`、锁文件、`index.html` 等。
3. 在资源管理器打开项目目录，在地址栏输入 `powershell` 并回车，或者运行：

```powershell
cd C:\Projects\iq-prank
node --version
npm.cmd --version
npm.cmd install
npm.cmd run dev
```

`npm.cmd` 与 `npm` 是同一个工具的 Windows 启动入口，可避免 PowerShell 的脚本执行策略阻止 `npm.ps1`。正常环境下也可以直接使用 `npm install` 和 `npm run dev`。

4. 浏览器访问终端中显示的 Local 地址，通常是 `http://localhost:5173`。端口被占用时，以终端实际地址为准。
5. 保持终端运行；结束时按 `Ctrl+C`。

**不能双击源码中的 index.html 来运行 React 项目。** 请通过 Vite 服务器打开。

### 手机查看

手机与电脑连接同一个 Wi-Fi，使用 `npm.cmd run dev` 启动后，打开终端打印的 Network 地址，例如 `http://192.168.1.20:5173`。若 Windows 防火墙提示，可允许在私人网络访问。`localhost` 只指当前设备，不能把电脑的 localhost 链接发给朋友使用。

### 查看最终效果

点击「开始测试」，每题随意选择答案、点击「下一题」，第15题点击「提交测试」。等待约4秒分析及1.2秒结论暂停即可看到完整整蛊动画。不同答对数量的结果完全一致；昵称不会替换结果里的名字。

### 验证与生产预览

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

生产预览通常为 `http://localhost:4173`。`npm run build` 会生成 `dist`，可托管在静态网站平台。

## 使用 Vercel 免费部署

个人、非商业朋友娱乐项目可使用 [Vercel Hobby 方案](https://vercel.com/docs/plans/hobby)，免费额度和限制以官网为准。Vercel 账号登录需要由你本人完成；本次没有替你登录或创建 Vercel 项目。

### 方法一：直接从电脑部署（无需 GitHub）

在项目文件夹运行：

```powershell
npm.cmd install
npm.cmd run build
npx.cmd vercel login
npx.cmd vercel --prod
```

1. 根据提示在浏览器登录自己的 Vercel 账号。
2. 提示是否设置并部署项目时选择 `Y`。
3. 选择自己的个人账号 / Hobby 工作区。
4. `Link to existing project?` 选择 `N`；项目名可用 `iq-prank`。
5. 项目目录选择 `./`。
6. Vercel 通常自动识别 Vite；核对构建命令为 `npm run build`，输出目录为 `dist`，不需要环境变量。
7. 部署完成后保存终端中的 **Production** HTTPS 地址，通常形如 `https://你的项目名.vercel.app`。
8. 以后修改内容，再次运行 `npx.cmd vercel --prod` 即可更新。

如果提示选择付费套餐，请回到个人 Hobby 工作区，不需要购买付费计划来运行此项目。

### 方法二：GitHub + Vercel 网页导入

**当前仓库提示：** 本网站位于 `ruishen236/-` 仓库的 `iq-prank-download` 分支、`iq-prank` 子目录。原来的 `main` 不包含本网站。网页导入时需选择该分支，Root Directory 设为 `iq-prank`，生产分支也设为 `iq-prank-download`；如果界面无法选择分支，使用方法一从电脑的 `iq-prank` 文件夹直接部署。项目已提供 `vercel.json` 固定安装、框架、构建命令及输出目录。

1. 登录自己的 GitHub 账号，新建个人仓库，例如 `iq-prank`。
2. 可使用 GitHub Desktop 将项目文件夹加入仓库并发布；不要上传 `node_modules`、`.env`，项目已提供 `.gitignore`。
3. 登录 [Vercel](https://vercel.com/)，点击 **Add New → Project**。
4. 连接 GitHub，选择新建的仓库并点击 **Import**。
5. 选择 **Vite**，Root Directory 指向包含本项目 `package.json` 的目录，Build Command 为 `npm run build`，Output Directory 为 `dist`。
6. 点击 **Deploy**，完成后在项目的 Domains / Production 页面找到 HTTPS 生产域名。
7. 后续推送更新到生产分支，Vercel 会重新构建发布。

官方参考：[Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)、[CLI 部署](https://vercel.com/docs/projects/deploy-from-cli)、[Git 部署](https://vercel.com/docs/git)。

### 获得可发给朋友的链接

把 Vercel 的 **生产域名**复制发给朋友即可，对方无需安装软件或登录。上线后也可以在结果页点击「分享给朋友」，支持时打开系统分享，否则复制当前网站链接。分享内容不暴露整蛊结论。

不要分享本机 localhost、开发服务器的内网地址或 Vercel 仪表盘地址。在无痕窗口检查生产域名是否无需登录即可访问；如出现 Vercel Authentication，检查项目 Settings → Deployment Protection 下的生产访问设置，分享开放访问的生产域名。

## 修改文字与题目

修改 `src/data/config.js`：

```js
export const RESULT_TEXT = '李大燚是SB！';
export const RESULT_INTRO = '经过本次测试，系统得出最终结论……';
export const ANALYSIS_DURATION = 4000; // 毫秒
export const REVEAL_DELAY = 1200;      // 结论出现后的暂停时间
```

题目在 `src/data/questions.js`，`correct` 是正确选项的下标（0、1、2、3），`explanation` 是开发者核对答案的说明，不在结果页显示。修改后运行测试和构建，重新部署即可生效。

## 文件结构

```text
src/
  App.jsx                 首页、答题、分析、结果流程
  main.jsx                React 入口
  styles.css              响应式布局、明暗主题和动画
  components/
    BrainVisual.jsx       首页原创 SVG 插画
    Diagram.jsx           题目图形与正方体展开图
  data/
    config.js             整蛊文字、分析时间
    questions.js          独立原创题库及答案说明
  lib/
    share.js              系统分享、复制与回退
    sound.js              Web Audio 合成音效
  tests/
    setup.js              测试初始化
    App.test.jsx          功能与题库测试
public/favicon.svg        原创网站图标
index.html                HTML 入口
vite.config.js            开发与测试配置
package.json              npm 命令与依赖
package-lock.json         固定依赖树
README.md                 本文件
```

## 题型参考与原创说明

开发前已通过网络搜索查阅以下公开页面，仅参考数列、数量关系与空间变换的通用题型。本站15道题的中文表述、数字设置、选项和SVG图形均自行编写，不复制商业智商题库，也不使用机构标识或认证。

- [Math is Fun — Patterns](https://www.mathsisfun.com/algebra/patterns.html)
- [Math is Fun — Math and Logic Puzzles](https://www.mathsisfun.com/puzzles/)
- [NRICH — Thinking 3D](https://nrich.maths.org/articles/thinking-3d)

数列题明确给出规则，以保证在四个选项中只有一个符合题意的答案。

## 验证范围

实际验证结果见 `VALIDATION.md`。Linux 云环境已完成安装、React 功能测试、生产构建及 Chromium 浏览器检查。Windows 和真实手机未进行实机测试；已提供标准跨平台 npm 命令并检查移动屏幕布局。剪贴板与音效受浏览器权限、HTTPS 和播放策略影响，已提供链接手动复制回退。
