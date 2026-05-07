import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Layouts
import { MobileShell } from './components/layout/MobileShell';
import { DashboardShell } from './components/layout/DashboardShell';
import { AuthGuard } from './components/auth/AuthGuard';
// Student Pages
import { Splash } from './pages/student/Splash';
import { Onboarding } from './pages/student/Onboarding';
import { RoleSelection } from './pages/auth/RoleSelection';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { EmailVerificationResult } from './pages/auth/EmailVerificationResult';
import { Home } from './pages/student/Home';
import { Listings } from './pages/student/Listings';
import { ListingDetail } from './pages/student/ListingDetail';
import { Map } from './pages/student/Map';
import { BookingFlow } from './pages/student/BookingFlow';
import { BookingConfirmation } from './pages/student/BookingConfirmation';
import { Profile } from './pages/student/Profile';
import { Bookings } from './pages/student/Bookings';
import { HostOverview } from './pages/host/HostOverview';
import { AdminOverview } from './pages/admin/AdminOverview';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth Routes */}
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/auth/role" element={<RoleSelection />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verify-email" element={<EmailVerificationResult />} />

        {/* Student App Routes (Mobile Shell) */}
        <Route
          element={
          <AuthGuard allowedRoles={['student']}>
              <MobileShell />
            </AuthGuard>
          }>
          <Route path="/home" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/map" element={<Map />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/book" element={<BookingFlow />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          {/* Add more student routes here */}
        </Route>

        {/* Host Dashboard Routes (Dashboard Shell) */}
        <Route
          path="/host"
          element={
          <AuthGuard allowedRoles={['host']}>
              <DashboardShell role="host" />
            </AuthGuard>
          }>
          <Route index element={<HostOverview />} />
        </Route>

        {/* Admin Dashboard Routes (Dashboard Shell) */}
        <Route
          path="/admin"
          element={
          <AuthGuard allowedRoles={['admin']}>
              <DashboardShell role="admin" />
            </AuthGuard>
          }>
          <Route index element={<AdminOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}
