import { useState, useEffect } from 'react'
import { useAuthStore } from "./store/authStore.JS"
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' })
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const { token, user, login, logout } = useAuthStore()

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Could not reach the backend'))
  }, [])

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    const res = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupForm),
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    alert('Signup successful! Ab login karo.')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    login(data.token, data.user)
  }

  if (token) {
    return (
      <div>
        <h1>{message}</h1>
        <h2>Welcome, {user.name}!</h2>
        <p>Aapka email: {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <h1>{message}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Name" onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} />
        <button type="submit">Sign Up</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default App