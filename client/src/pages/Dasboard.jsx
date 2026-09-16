import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function DashboardPage() {
    const { user, token, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleUpgrade = async () => {
        const res = await fetch('http://localhost:5000/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await res.json()
        window.location.href = data.url
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-80 rounded-lg bg-white p-6 text-center shadow-md">
                <h1 className="mb-2 text-xl font-semibold text-gray-800">Welcome, {user?.name}!</h1>
                <p className="mb-4 text-sm text-gray-600">{user?.email}</p>
                <button onClick={handleUpgrade} className="mb-2 w-full rounded bg-indigo-600 p-2 text-white hover:bg-indigo-700">
                    Upgrade to Pro
                </button>
                <button onClick={handleLogout} className="w-full rounded bg-red-600 p-2 text-white hover:bg-red-700">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default DashboardPage
