import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import ReusableButton from '../components/Reusable/ReusableButton'

export default function Login() {
  const login = useAuthStore(state => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const res = login(email, password)
    if (res.error) {
      setError(res.error)
    } else {
      navigate('/home')
    }
  }

  return (
    <div className="main-container">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-sm border-2 border-border shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <label className="form-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input-field"
          required
        />

        <ReusableButton 
          type="submit"
          className="btn-secondary"
        >
          Login
        </ReusableButton>

        <p className="mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-terniary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
