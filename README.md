# ai screen design

> 个人学习项目

## 开发与构建

```bash
pnpm install
pnpm dev
pnpm build
```

开发服务和生产构建会先生成主题色板。生成阶段使用开发依赖 `@ant-design/colors@8.0.1`，浏览器只加载编译后的 CSS。

## 主题和样式

- 全局入口为 `src/styles/index.scss`，按主题、重置、基础样式加载；只在应用主入口导入一次。
- 在 `scripts/generate-theme.mjs` 的 `BASE_COLORS` 修改基色，执行 `pnpm gen:theme` 生成 `src/styles/generated/palette.scss`。生成文件纳入版本管理，请勿手动编辑；开发服务运行期间修改基色也需要重新执行生成命令。
- 彩色使用 Ant Design 色阶算法，中性色使用近白到黑的插值。语义映射在 `src/styles/theme.scss` 中维护，组件通过 CSS 变量消费。
- 主题默认跟随系统，启动前初始化 `html.dark`，运行时监听系统主题变化；没有独立设置页或持久化偏好。
- 字号通过 `html` 的 `data-font-size="small"` / `"large"` 切换，移除属性或设置 `"standard"` 使用标准档。根字号固定为 16px，界面通过 `--font-size-*` 使用字号；画布节点的像素尺寸和用户内容样式保持独立。
- 组件使用 scoped SCSS 和语义类，不使用 Tailwind 工具类。子类在根类下完整嵌套书写；变体和状态使用 props、属性或伪类选择器。
- Button 保留 variant、size、as/asChild 和外部 class；Dialog 保留 Reka UI 交互能力。外部 class 按正常 CSS 层叠工作。

## 校验

```bash
pnpm gen:theme
pnpm type-check
pnpm build
pnpm exec oxlint .
pnpm exec eslint .
```

已知 ESLint 基线：`src/materials/types.ts` 中的 `no-explicit-any`。本次样式迁移未改变物料 schema 类型，也未放宽检查规则。
