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
    <div className="main-container">
      <div className="bg-white px-10 py-8 rounded-lg border-2 border-border shadow-sm flex flex-col items-center">
        <h1 className="text-3xl font-semibold">
          Welcome, {" "}
          <span className="font-bold text-secondary">{user.name}</span>!
        </h1>
        
        <div className="flex flex-col gap-2 w-60">
          <ReusableButton
            to="/invoices"
            className="btn-secondary"
          >
            View My Invoices
          </ReusableButton>

          <ReusableButton
            onClick={handleLogout}
            className="bg-warning hover:bg-[#915a61]
             text-white px-4 py-2 rounded transition-colors cursor-pointer"
          >
            Logout
          </ReusableButton>
        </div>
      </div>
    </div>
  )
}
