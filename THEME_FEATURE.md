# 主题切换功能说明

## 功能概述
为 web-tradingView 项目添加了完整的黑夜/白天主题切换功能，支持实时切换和主题状态持久化。

## 新增文件

### 1. 主题上下文 (`src/contexts/ThemeContext.tsx`)
- 提供全局主题状态管理
- 支持主题切换和持久化存储
- 使用 localStorage 保存用户选择

### 2. 主题切换组件 (`src/components/ThemeToggle.tsx`)
- 美观的主题切换按钮
- 支持点击切换和视觉反馈
- 显示当前主题状态（太阳/月亮图标）

## 更新的文件

### 1. 样式组件 (`src/components/styled/App.styled.ts`)
- 添加了完整的主题配置系统
- 定义了 `lightTheme` 和 `darkTheme` 配置
- 所有样式组件都支持主题props

### 2. 全局样式 (`src/components/styled/Global.styled.ts`)
- 更新了全局样式以支持主题切换
- 添加了平滑的过渡动画

### 3. 主要组件更新
- `App.tsx`: 集成主题上下文和切换组件
- `TradingViewChart.tsx`: 图表组件支持主题切换
- `main.tsx`: 添加 ThemeProvider 包装

## 主题配置

### 白天主题 (Light Theme)
```typescript
{
  mode: 'light',
  colors: {
    background: '#ffffff',
    surface: '#f8f9fa',
    primary: '#26a69a',
    secondary: '#2962FF',
    text: '#333333',
    textSecondary: '#555555',
    border: '#e1e1e1',
    shadow: 'rgba(0, 0, 0, 0.1)',
  }
}
```

### 黑夜主题 (Dark Theme)
```typescript
{
  mode: 'dark',
  colors: {
    background: '#1a1a1a',
    surface: '#2a2a2a',
    primary: '#4a9eff',
    secondary: '#26a69a',
    text: '#ffffff',
    textSecondary: '#cccccc',
    border: '#444444',
    shadow: 'rgba(0, 0, 0, 0.3)',
  }
}
```

## 功能特性

### 1. 实时主题切换
- 点击主题切换按钮即可立即切换
- 所有组件都会同步更新主题
- 平滑的过渡动画效果

### 2. 状态持久化
- 主题选择自动保存到 localStorage
- 页面刷新后保持用户选择
- 默认使用白天主题

### 3. 图表主题支持
- TradingView 图表完全支持主题切换
- 图表背景、文字、网格线等都会跟随主题变化
- 保持图表的可读性和美观性

### 4. 响应式设计
- 主题切换组件适配移动端
- 保持原有的响应式布局
- 在不同屏幕尺寸下都有良好的显示效果

## 使用方法

### 1. 在组件中使用主题
```typescript
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <div>
      <p>当前主题: {theme}</p>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  );
}
```

### 2. 在样式组件中使用主题
```typescript
const StyledComponent = styled.div<{ theme: Theme }>`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
`;
```

## 技术实现

### 1. Context API
- 使用 React Context 提供全局主题状态
- 避免 prop drilling 问题
- 支持类型安全的主题访问

### 2. Styled Components
- 所有样式组件都支持主题props
- 使用 TypeScript 确保类型安全
- 支持动态样式计算

### 3. 持久化存储
- 使用 localStorage 保存主题选择
- 页面加载时自动恢复主题
- 支持跨标签页同步

## 构建验证
- ✅ TypeScript 编译通过
- ✅ 无 linting 错误
- ✅ Vite 构建成功
- ✅ 主题切换功能正常
- ✅ 图表主题同步更新

## 未来扩展
- 支持更多主题选项（如高对比度主题）
- 支持系统主题自动检测
- 支持主题自定义配置
- 支持主题动画效果配置
