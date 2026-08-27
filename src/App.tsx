import { Routes, Route, Navigate } from 'react-router'
import Login from './auth/Login'
import Home from './pages/Home'
import Payment from './pages/Payment'
import History from './pages/History'
import Settings from './pages/Settings'
import ProtectedRoute from './routes/auth/ProtectedRoute'
import BottomTabBar from './components/BottomTabBar'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomTabBar />
    </>
  )
}

export default App
