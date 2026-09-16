import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '../store/authStore'

function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const res = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        const data = await res.json()
        if (!res.ok) return setError(data.error)
        navigate('/login')
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        setError('')
        const res = await fetch('http://localhost:5000/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: credentialResponse.credential }),
        })
        const data = await res.json()
        if (!res.ok) return setError(data.error)
        login(data.token, data.user)
        navigate('/dashboard')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
                <h1 className="text-center text-2xl font-bold text-gray-900">Create your account</h1>
                <p className="mt-1 text-center text-sm text-gray-500">Start using the CRM for free</p>

                {error && (
                    <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        placeholder="Full name"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        placeholder="Email address"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                        Sign Up
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="flex justify-center">
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google login failed')} />
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignupPage
