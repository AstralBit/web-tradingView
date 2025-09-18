import './App.css'
import TradingViewChart from './components/TradingViewChart'
import { 
  generateCandlestickData, 
  generateLineData, 
  generateVolumeData,
  sampleCandlestickData,
  sampleLineData,
  sampleVolumeData
} from './components/sampleData'
import { useState } from 'react'

function App() {
  const [useSampleData, setUseSampleData] = useState(true)
  const [showVolume, setShowVolume] = useState(true)
  const [showLine, setShowLine] = useState(false)
  const [showCandlestick, setShowCandlestick] = useState(true)

  // 生成随机数据
  const randomCandlestickData = generateCandlestickData(30)
  const randomLineData = generateLineData(30)
  const randomVolumeData = generateVolumeData(30)

  return (
    <>
      <h1>Vite + React + TradingView</h1>
      
      {/* 控制面板 */}
      <div className="control-panel">
        <h2>图表控制面板</h2>
        <div className="controls">
          <label>
            <input 
              type="checkbox" 
              checked={useSampleData}
              onChange={(e) => setUseSampleData(e.target.checked)}
            />
            使用示例数据
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={showCandlestick}
              onChange={(e) => setShowCandlestick(e.target.checked)}
            />
            显示K线图
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={showLine}
              onChange={(e) => setShowLine(e.target.checked)}
            />
            显示折线图
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={showVolume}
              onChange={(e) => setShowVolume(e.target.checked)}
            />
            显示成交量
          </label>
        </div>
      </div>

      {/* TradingView 图表 */}
      <div className="chart-section">
        <h2>TradingView 图表示例</h2>
        <TradingViewChart 
          candlestickData={useSampleData ? sampleCandlestickData : randomCandlestickData}
          lineData={useSampleData ? sampleLineData : randomLineData}
          volumeData={useSampleData ? sampleVolumeData : randomVolumeData}
          height={500}
          showVolume={showVolume}
          showLine={showLine}
          showCandlestick={showCandlestick}
        />
      </div>

      {/* 图表说明 */}
      <div className="chart-info">
        <h3>功能说明</h3>
        <ul>
          <li><strong>K线图</strong>：显示开盘价、最高价、最低价、收盘价</li>
          <li><strong>折线图</strong>：显示价格趋势线</li>
          <li><strong>成交量</strong>：显示交易量柱状图</li>
          <li><strong>交互功能</strong>：支持缩放、平移、十字线等</li>
          <li><strong>响应式</strong>：自动适应容器大小变化</li>
        </ul>
      </div>
    </>
  )
}

export default App