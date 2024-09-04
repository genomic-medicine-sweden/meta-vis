import { Menu } from 'antd'
import { appMenuItems } from './AppMenuItems'

export const AppMenu = () => {
    const menuItems = appMenuItems()
  return (
    <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['1']}
    items={menuItems}
    style={{ flex: 1, minWidth: 0 }}
  />
  )
}
