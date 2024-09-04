import { Header } from 'antd/es/layout/layout'
import { AppMenu } from './AppMenu'

export const AppHeader = () => {
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="logo" >
        <img src="/meta-vis-logo.svg" alt="logo" style={{ height: '40px' }} />
      </div>
      <AppMenu />
    </Header>
  )
}
