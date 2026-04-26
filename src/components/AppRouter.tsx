import { Routes, Route } from 'react-router-dom'

// PUBLIC / AUTH
import Editor from './Editor'
import HomePage from '../pages/HomePage/HomePage'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgetPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import VerifyEmail from '../pages/auth/VerifyEmail'

// ADMIN
import AdminLayout from './layout/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageCourses from '../pages/admin/ManageCourses'
import Analytics from '../pages/admin/analytics/Analytics'

// TEACHER
import TeacherLayout from './layout/TeacherLayout'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import TeacherCourses from '../pages/teacher/TeacherCourses'
import TeacherAssignments from '../pages/teacher/TeacherAssignment'
import TeacherStudents from '../pages/teacher/TeacherStudent'

// STUDENT

import StudentLayout from './layout/StudentLayouts'
import StudentDashboard from '../pages/student/StudentDashBoard'
import StudentCourses from '../pages/student/StudentCourses'
import StudentAssignments from '../pages/student/StudentAssignments'
import StudentProfile from '../pages/student/StudentProfile'



export default function AppRoutes() {
  return (
    <Routes>

      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/" element={<Editor />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* ---------- ADMIN ROUTES ---------- */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* ---------- TEACHER ROUTES ---------- */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="courses" element={<TeacherCourses />} />
        <Route path="assignment" element={<TeacherAssignments />} />
        <Route path="student" element={<TeacherStudents />} />
      </Route>

       {/* ---------- STUDENT ROUTES ---------- */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

    </Routes>
  )
}