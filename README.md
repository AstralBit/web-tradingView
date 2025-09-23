# Web TradingView - Advanced Trading Interface

A modern, responsive web application built with React, TypeScript, and TradingView integration, featuring real-time order book visualization, interactive charts, and comprehensive trading tools.

<img width="1871" height="894" alt="Snipaste_2025-09-22_17-14-37" src="https://github.com/user-attachments/assets/71e586a9-3a24-4b06-bfc8-c9bd5f61599b" />


## 🚀 Features

### 📊 **Interactive Trading Charts**
- **TradingView Integration**: Embedded TradingView widgets with customizable themes
- **Real-time Data**: Live market data updates and price movements
- **Multiple Timeframes**: Support for 1H, 1D, 1W, 1M, 1Y, and ALL timeframes
- **Theme Support**: Dark and light theme switching

### 📈 **Order Book Visualization**
- **Real-time Order Book**: Live bid/ask order display with depth visualization
- **Interactive Tooltips**: Hover tooltips with detailed order information and statistics
- **Smart Positioning**: Tooltips that follow elements during scrolling
- **Visual Indicators**: Color-coded order types and volume bars

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for desktop and mobile devices
- **Styled Components**: Modern CSS-in-JS styling with TypeScript support
- **Smooth Animations**: Flash animations for order updates and interactions
- **Accessibility**: Keyboard navigation and screen reader support

### ⚡ **Performance Optimized**
- **React Portals**: Efficient tooltip rendering outside component tree
- **Event Optimization**: Debounced scroll handlers and efficient re-renders
- **Memory Management**: Proper cleanup of event listeners and subscriptions

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components
- **Charts**: TradingView Widget API
- **State Management**: React Context + Hooks
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-tradingView
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   ```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── OrderBook.tsx    # Main order book component
│   ├── OrderList.tsx    # Order list with tooltips
│   ├── TradingExtend.tsx # TradingView iframe wrapper
│   └── OrderBookToolTip.tsx # Interactive tooltip component
├── hooks/               # Custom React hooks
│   ├── useOrderBookWebSocket.ts # WebSocket data management
│   └── useOrderBookDealData.ts  # Order book calculations
├── contexts/            # React Context providers
│   └── ThemeContext.tsx # Theme management
├── styles/              # Global styles and themes
└── types/               # TypeScript type definitions
```

## 🎯 Key Components

### OrderBook Component
- Real-time order book display
- Bid/ask order separation
- Volume visualization with progress bars
- Interactive hover effects

### OrderList Component
- Individual order row rendering
- Smart tooltip positioning
- Scroll-aware content updates
- Gray-out effects for better UX

### OrderBookToolTip Component
- Portal-based rendering for z-index management
- Dynamic position calculation
- Real-time content updates
- Theme-aware styling

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_TRADINGVIEW_SYMBOL=BITFINEX:BTCUSD
VITE_WEBSOCKET_URL=wss://your-websocket-url
```

### TradingView Configuration
The TradingView widget can be configured in `TradingExtend.tsx`:

```typescript
const buildTradingViewUrl = (config: Record<string, string>) => {
  // Customize chart appearance, intervals, and features
}
```

## 🎨 Theming

The application supports both dark and light themes:

```typescript
// Theme switching
const { theme, toggleTheme } = useTheme();
```

## 📱 Responsive Design

- **Desktop**: Full-width layout with side-by-side chart and order book
- **Mobile**: Stacked layout with optimized touch interactions
- **Tablet**: Adaptive grid system for optimal viewing

## 🚀 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Memoization**: Optimized re-renders with React.memo
- **Event Debouncing**: Efficient scroll and resize handlers
- **Portal Rendering**: Tooltips rendered outside component tree

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TradingView](https://www.tradingview.com/) for the charting library
- [React](https://reactjs.org/) for the UI framework
- [Styled Components](https://styled-components.com/) for CSS-in-JS
- [Vite](https://vitejs.dev/) for the build tool

---

**Built with ❤️ for the trading community**
