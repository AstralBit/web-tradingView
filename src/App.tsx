import TradingViewChart from './components/TradingViewChart'
import ThemeToggle from './components/ThemeToggle'
import { 
  generateCandlestickData, 
  generateLineData, 
  generateVolumeData,
  sampleCandlestickData,
  sampleLineData,
  sampleVolumeData
} from './components/sampleData'
import { useState } from 'react'
import { useTheme } from './contexts/ThemeContext'
import {
  RootContainer,
  ControlPanel,
  ControlPanelTitle,
  Controls,
  ControlLabel,
  ChartSection,
  ChartTitle,
  ChartInfo,
  ChartInfoTitle,
  ChartInfoList,
  ChartInfoItem,
  lightTheme,
  darkTheme
} from './components/styled/App.styled'

function App() {
  const [useSampleData, setUseSampleData] = useState(true)
  const [showVolume, setShowVolume] = useState(true)
  const [showLine, setShowLine] = useState(false)
  const [showCandlestick, setShowCandlestick] = useState(true)
  const { theme } = useTheme()

  // 生成随机数据
  const randomCandlestickData = generateCandlestickData(30)
  const randomLineData = generateLineData(30)
  const randomVolumeData = generateVolumeData(30)

  // 获取当前主题
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme

  return (
    <RootContainer theme={currentTheme}>
      {/* 控制面板 */}
      <ControlPanel theme={currentTheme}>
        <ControlPanelTitle theme={currentTheme}>图表控制面板</ControlPanelTitle>
        <Controls>
          <ControlLabel theme={currentTheme}>
            <input 
              type="checkbox" 
              checked={useSampleData}
              onChange={(e) => setUseSampleData(e.target.checked)}
            />
            使用示例数据
          </ControlLabel>
          <ControlLabel theme={currentTheme}>
            <input 
              type="checkbox" 
              checked={showCandlestick}
              onChange={(e) => setShowCandlestick(e.target.checked)}
            />
            显示K线图
          </ControlLabel>
          <ControlLabel theme={currentTheme}>
            <input 
              type="checkbox" 
              checked={showLine}
              onChange={(e) => setShowLine(e.target.checked)}
            />
            显示折线图
          </ControlLabel>
          <ControlLabel theme={currentTheme}>
            <input 
              type="checkbox" 
              checked={showVolume}
              onChange={(e) => setShowVolume(e.target.checked)}
            />
            显示成交量
          </ControlLabel>
        </Controls>
        {/* 主题切换组件 */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
          <ThemeToggle />
        </div>
      </ControlPanel>

      {/* TradingView 图表 */}
      <ChartSection theme={currentTheme}>
        <ChartTitle theme={currentTheme}>TradingView 图表示例</ChartTitle>
        <TradingViewChart 
          candlestickData={useSampleData ? sampleCandlestickData : randomCandlestickData}
          lineData={useSampleData ? sampleLineData : randomLineData}
          volumeData={useSampleData ? sampleVolumeData : randomVolumeData}
          height={500}
          showVolume={showVolume}
          showLine={showLine}
          showCandlestick={showCandlestick}
        />
      </ChartSection>

      {/* 图表说明 */}
      <ChartInfo theme={currentTheme}>
        <ChartInfoTitle theme={currentTheme}>功能说明</ChartInfoTitle>
        <ChartInfoList>
          <ChartInfoItem theme={currentTheme}><strong>K线图</strong>：显示开盘价、最高价、最低价、收盘价</ChartInfoItem>
          <ChartInfoItem theme={currentTheme}><strong>折线图</strong>：显示价格趋势线</ChartInfoItem>
          <ChartInfoItem theme={currentTheme}><strong>成交量</strong>：显示交易量柱状图</ChartInfoItem>
          <ChartInfoItem theme={currentTheme}><strong>交互功能</strong>：支持缩放、平移、十字线等</ChartInfoItem>
          <ChartInfoItem theme={currentTheme}><strong>响应式</strong>：自动适应容器大小变化</ChartInfoItem>
        </ChartInfoList>
      </ChartInfo>
    </RootContainer>
  )
}

export default App