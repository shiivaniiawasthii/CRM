import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        const data = await res.json()
        if (!res.ok) return setError(data.error)
        login(data.token, data.user)
        navigate('/dashboard')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-80 rounded-lg bg-white p-6 shadow-md">
                <h1 className="mb-4 text-xl font-semibold text-gray-800">Login</h1>
                {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
                <input
                    className="mb-3 w-full rounded border border-gray-300 p-2"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="mb-4 w-full rounded border border-gray-300 p-2"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
                    Login
                </button>
                <p className="mt-3 text-sm text-gray-600">
                    No account? <Link to="/signup" className="text-blue-600">Sign up</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage
