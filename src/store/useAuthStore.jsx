import { create } from 'zustand'
import bcrypt from 'bcryptjs'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('currentUser')) || null,

  register: (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    if (users.find(u => u.email === email)) {
      return { error: 'Registration failed. Please try again.' }
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser  = { name, email, hash }
    users.push(newUser)

    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify({ name, email}))
    set({ user: {name, email} })
    return { success: true }
  },

  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.email === email)
    
    if (!user || !bcrypt.compareSync(password, user.hash)) {
      return { error: 'Login failed. Please try again.' }
    }

    localStorage.setItem(
        'currentUser', 
        JSON.stringify({ name: user.name, email: user.email })
    )
    set({ user: { name: user.name, email: user.email } })
    return { success: true }
  },

  logout: () => {
    localStorage.removeItem('currentUser')
    set({ user: null })
  },
}))

export default useAuthStore
