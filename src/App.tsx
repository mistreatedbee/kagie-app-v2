import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Layouts
import { MobileShell } from './components/layout/MobileShell';
import { DashboardShell } from './components/layout/DashboardShell';
import { AuthGuard } from './components/auth/AuthGuard';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDataProvider } from './context/AdminDataContext';
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
import { Saved } from './pages/student/Saved';
import { HostOverview } from './pages/host/HostOverview';
import { AdminLogin } from './pages/admin/AdminLogin';
import {
  AdminAnalytics,
  AdminAuditLogs,
  AdminBookings,
  AdminContent,
  AdminDashboard,
  AdminDocuments,
  AdminFallback,
  AdminHosts,
  AdminInstitutions,
  AdminListings,
  AdminNotifications,
  AdminPayments,
  AdminPayouts,
  AdminPromotions,
  AdminReports,
  AdminReviews,
  AdminSettings,
  AdminStudents,
  AdminSupport,
  AdminUsers,
  AdminVerification
} from './pages/admin/AdminPages';
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
        <Route path="/admin/login" element={<AdminLogin />} />

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
          <Route path="/saved" element={<Saved />} />
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

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
          <AuthGuard allowedRoles={['admin']} redirectTo="/admin/login">
              <AdminDataProvider>
                <AdminLayout />
              </AdminDataProvider>
            </AuthGuard>
          }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="hosts" element={<AdminHosts />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="payouts" element={<AdminPayouts />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="verification" element={<AdminVerification />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="promotions" element={<AdminPromotions />} />
          <Route path="institutions" element={<AdminInstitutions />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="*" element={<AdminFallback />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}
