import { ConfigProvider } from 'antd'
import EarthInit from './components/EarthInit'
import StatsPanel from './components/StatsPanel'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fc4c02'
        }
      }}>
      <EarthInit>
        <StatsPanel>
        </StatsPanel>
      </EarthInit>
    </ConfigProvider>
  )
}
