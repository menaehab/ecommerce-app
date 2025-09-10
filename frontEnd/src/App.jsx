import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/store/Home'
import Register from './pages/store/Register'
import Login from './pages/store/Login'
import PublicRoute from './routes/PublicRoute'
import StoreLayout from './components/layouts/StoreLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />} >
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
