import { Routes, Route } from 'react-router-dom'
import Editor from './Editor'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgetPassword'
import ResetPassword from '../pages/ResetPassword'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Editor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path = "/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}
