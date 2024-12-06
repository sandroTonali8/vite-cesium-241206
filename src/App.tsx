import { ConfigProvider } from 'antd'
import Earth from './components/EarthInit'
import Login from './components/Login'
// import Loginbutton from './components/LoginButton'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fc4c02'
        }
      }}>
      <Earth>
        <Login/>
        {/* <Loginbutton/> */}
      </Earth>
    </ConfigProvider>
  )
}
