import useAuthStore from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl mb-4">Welcome, {user.name}!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}
