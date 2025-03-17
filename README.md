# My App

一个使用Expo和React Native构建的现代化移动应用。

## 项目概述

这是一个基于Expo和React Native的跨平台移动应用，使用了最新的开发技术和库。应用采用了标签式导航结构，并集成了现代UI组件系统。

## 技术栈

- **Expo** (v52.0.38): 简化React Native开发的框架
- **React Native** (v0.76.7): 用于构建原生移动应用的JavaScript框架
- **Expo Router** (v4.0.18): 用于应用导航的路由系统
- **NativeWind** (v4.1.23): 在React Native中使用Tailwind CSS
- **Tailwind CSS** (v3.4.17): 实用优先的CSS框架
- **React Native Reusables**: 基于NativeWind v4构建的通用UI组件库，类似于shadcn/ui
- **TypeScript**: 为JavaScript添加类型支持

## 功能特点

- 标签式导航界面
- 自定义UI组件
- 响应式设计
- 深色/浅色主题支持
- 类型安全的代码库

## UI组件系统

项目使用了基于React Native Reusables的UI组件系统，这些组件位于`components/ui/`目录下：

- **Text**: 自定义文本组件，支持样式定制和主题适配
- **Button**: 可定制的按钮组件，支持不同的变体和状态
- **Dialog**: 模态对话框组件，用于显示重要信息或交互界面

这些组件都是使用NativeWind构建的，遵循类似于shadcn/ui的设计理念，注重可访问性和可定制性。

## 开始使用

### 前提条件

- Node.js (推荐使用最新的LTS版本)
- npm或yarn
- 用于iOS开发的Xcode (仅Mac)
- 用于Android开发的Android Studio
- Expo Go应用（用于在实体设备上测试）

### 安装

1. 克隆仓库或直接下载项目代码：

```bash
git clone <仓库URL>
cd my-app
```

2. 安装依赖：

```bash
npm install
# 或
yarn install
```

3. 启动开发服务器：

```bash
npx expo start
```

### 运行应用

- 在iOS设备/模拟器上运行：`npx expo start --ios`
- 在Android设备/模拟器上运行：`npx expo start --android`
- 在Web浏览器中运行：`npx expo start --web`
- 使用Expo Go扫描QR码在实体设备上运行

## 项目结构

```
my-app/
├── app/                  # 应用路由和页面
│   ├── (tabs)/           # 标签页面
│   ├── +not-found.tsx    # 404页面
│   ├── _layout.tsx       # 主布局
│   └── modal.tsx         # 模态窗口
├── assets/               # 静态资源
├── components/           # 可复用组件
│   ├── ui/               # UI组件库
│   └── ...
├── lib/                  # 工具函数和常量
├── constants/            # 应用常量
└── ...
```

## 开发

### 代码规范

项目使用ESLint和Prettier来保持代码质量和一致性：

- 运行代码检查：`npm run lint` 或 `yarn lint`
- 格式化代码：`npm run format` 或 `yarn format`

### 自定义组件

项目使用了自定义UI组件系统，位于`components/ui/`目录下。

## 构建和部署

使用Expo EAS (Expo Application Services) 进行构建和部署：

```bash
# 安装EAS CLI
npm install -g eas-cli

# 登录Expo账户
eas login

# 配置EAS
eas build:configure

# 构建预览版
eas build --profile preview

# 构建生产版
eas build --profile production
```

## 贡献指南

欢迎对本项目进行贡献！请遵循以下步骤：

1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个Pull Request

## 许可证

MIT许可证 - 详情请查看LICENSE文件
