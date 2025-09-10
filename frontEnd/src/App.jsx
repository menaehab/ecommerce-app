import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/store/Home'
import Register from './pages/store/Register'
import Login from './pages/store/UserLogin'
import StoreLayout from './components/layouts/StoreLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import AdminLogin from './pages/dashboard/AdminLogin'
import AdminPrivateRoute from './routes/dashboard/AdminPrivateRoute'
import UserPublicRoute from './routes/store/UserPublicRoute'
import AdminPublicRoute from './routes/dashboard/AdminPublicRoute'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<UserPublicRoute><Login /></UserPublicRoute>} />
        <Route path="/register" element={<UserPublicRoute><Register /></UserPublicRoute>} />
      </Route>
      <Route path="/dashboard/login" element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
      <Route path="/dashboard" element={<DashboardLayout />} >
        <Route index element={<AdminPrivateRoute><Dashboard /></AdminPrivateRoute>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
