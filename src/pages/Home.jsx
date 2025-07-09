import useAuthStore from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import ReusableButton from '../components/Reusable/ReusableButton'

export default function Home() {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl mb-4">Welcome, {user.name}!</h1>
      <ReusableButton
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </ReusableButton>

      <ReusableButton
        to="/invoices"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
       View My Invoices
     </ReusableButton>
    </div>
  )
}
