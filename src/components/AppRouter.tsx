import { Routes, Route } from 'react-router-dom'
import Editor from './Editor'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Editor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  )
}
