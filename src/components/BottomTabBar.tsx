import { TabBar } from 'antd-mobile'
import { AiOutlineHome, AiOutlineWallet, AiOutlineHistory, AiOutlineSetting } from 'react-icons/ai'
import { useNavigate, useLocation } from 'react-router'

const { Item: TabBarItem } = TabBar

const tabs = [
  { key: '/', title: 'Home', icon: AiOutlineHome },
  { key: '/payment', title: 'Payment', icon: AiOutlineWallet },
  { key: '/history', title: 'History', icon: AiOutlineHistory },
  { key: '/settings', title: 'Settings', icon: AiOutlineSetting },
]

const BottomTabBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const activeKey = tabs.find(t => t.key === location.pathname)?.key || '/'

  return (
    <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant z-50">
      <TabBar activeKey={activeKey} onChange={(key) => navigate(key)}>
        {tabs.map(tab => (
          <TabBarItem
            key={tab.key}
            icon={(active: boolean) => (
              <tab.icon size={24} color={active ? '#570a22' : '#877274'} />
            )}
            title={(active: boolean) => (
              <span style={{ color: active ? '#570a22' : '#877274', fontSize: '12px' }}>
                {tab.title}
              </span>
            )}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default BottomTabBar
