import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

export default function Register() {
  const register = useAuthStore(s => s.register)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

      if (!PASSWORD_REGEX.test(password)) {
      setError(
        'Password must be at least 8 characters long and include at least one number and one symbol.'
      )
      return
    }

    const res = register(name, email, password)
    if (res.error) {
      setError(res.error)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 flex justify-center">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          required
        />
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          required
        />
        <label className="block mb-1">Password</label>
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Register
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-3 w-full border border-gray-300 py-2 rounded"
        >
          Back to Login
        </button>
      </form>
    </div>
  )
}
