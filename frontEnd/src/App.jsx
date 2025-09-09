import './App.css'
import Navbar from './components/store/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/store/Home'
import Register from './pages/store/Register'
import Login from './pages/store/Login'
import Footer from './components/store/Footer'
// import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
function App() {
 

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
