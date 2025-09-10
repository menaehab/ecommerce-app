import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/store/Home'
import Register from './pages/store/Register'
import Login from './pages/store/UserLogin'
import PublicRoute from './routes/PublicRoute'
import StoreLayout from './components/layouts/StoreLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import AdminLogin from './pages/dashboard/AdminLogin'
import AdminRoute from './routes/AdminRoute'
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Route>
      <Route path="/dashboard/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<DashboardLayout />} >
        <Route index element={<AdminRoute><Dashboard /></AdminRoute>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
