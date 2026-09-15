import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-80 rounded-lg bg-white p-6 shadow-md">
                <h1 className="mb-4 text-xl font-semibold text-gray-800">Sign Up</h1>
                {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
                <input
                    className="mb-3 w-full rounded border border-gray-300 p-2"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
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
                <button className="w-full rounded bg-green-600 p-2 text-white hover:bg-green-700">
                    Sign Up
                </button>
                <p className="mt-3 text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default SignupPage
