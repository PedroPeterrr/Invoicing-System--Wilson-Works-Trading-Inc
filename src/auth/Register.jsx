import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import ReusableButton from '../components/Reusable/ReusableButton'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

export default function Register() {
  const register = useAuthStore(state => state.register)
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
    <div className="main-container">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form-card"
      >
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="form-label">
          Name
          <span className="required-symbol">*</span>
        </label>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-field"
          required
        />

        <label className="form-label">
          Email
          <span className="required-symbol">*</span>
        </label>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-field"
          required
        />
        
        <label className="form-label">
          Password
          <span className="required-symbol">*</span>
        </label>
        
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input-field"
          required
        />

        <ReusableButton 
          type="submit" 
          className="btn-secondary"
        >
          Register
        </ReusableButton>

        <ReusableButton
          to="/login"
            className="mt-3 w-full border border-terniary text-terniary py-2 rounded 
            hover:bg-terniary/10 transition-colors cursor-pointer"
        >
          Back to Login
        </ReusableButton>
      </form>
    </div>
  )
}
