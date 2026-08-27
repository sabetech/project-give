import { Button, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useSignOut, useAuthUser } from '../hooks/authHooks'
import Navbar from '../components/Navbar'

const Settings = () => {
  const navigate = useNavigate()
  const signOut = useSignOut()
  const getUser = useAuthUser()
  const user = getUser()

  const handleSignOut = () => {
    signOut()
    Toast.show({ content: 'Signed out successfully' })
    navigate('/login')
  }

  return (
    <div className="pb-24">
      <Navbar title="Settings" />
      <div className="px-4 mt-20">
        <div className="bg-surface-container-low rounded-xl p-4 mb-4">
          <h3 className="font-display text-base font-bold text-on-surface mb-2">
            Account
          </h3>
          <p className="text-on-surface-variant text-sm">
            {user?.email || 'Not logged in'}
          </p>
        </div>

        <Button
          block
          color="danger"
          size="large"
          className="!rounded-xl !h-14"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default Settings
