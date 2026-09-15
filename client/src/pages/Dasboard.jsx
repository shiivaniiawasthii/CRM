import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function DashboardPage() {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-80 rounded-lg bg-white p-6 text-center shadow-md">
                <h1 className="mb-2 text-xl font-semibold text-gray-800">Welcome, {user?.name}!</h1>
                <p className="mb-4 text-sm text-gray-600">{user?.email}</p>
                <button onClick={handleLogout} className="w-full rounded bg-red-600 p-2 text-white hover:bg-red-700">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default DashboardPage
