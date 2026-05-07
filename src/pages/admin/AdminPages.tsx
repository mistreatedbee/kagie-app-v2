import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Home,
  MessageSquare,
  Save,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';
import {
  adminResources,
  analyticsSeries,
  bookingStatusSeries,
  overviewActivity,
  overviewIconMap,
  settingsSections
} from '../../data/adminMockData';
import { useAdminData } from '../../context/AdminDataContext';
import {
  ActivityTimeline,
  AdminDataTable,
  AdminTabs,
  ChartCard,
  EmptyState,
  LoadingSkeleton,
  StatCard,
  StatusBadge,
  UploadPlaceholder,
  UserAvatar
} from '../../components/admin/AdminUI';

const chartColors = ['#E50914', '#2F9BFF', '#16A34A', '#FFD24C', '#FF5A1F'];

function getResourceConfig(resourceKey: string) {
  const config = adminResources.find((resource) => resource.key === resourceKey);
  if (!config) throw new Error(`Unknown admin resource: ${resourceKey}`);
  return config;
}

function AdminResourcePage({ resourceKey }: { resourceKey: string }) {
  const { resources } = useAdminData();
  const config = getResourceConfig(resourceKey);

  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label={`Total ${config.title}`} value={String(resources[resourceKey]?.length || 0)} icon={config.icon} trend="+8%" />
        <StatCard
          label="Pending Review"
          value={String((resources[resourceKey] || []).filter((record) => String(record.status).includes('Pending')).length)}
          icon={AlertTriangle}
          accent="orange"
        />
        <StatCard
          label="Active / Approved"
          value={String((resources[resourceKey] || []).filter((record) => ['Active', 'Approved', 'Published', 'Paid'].includes(record.status)).length)}
          icon={CheckCircle2}
          accent="green"
        />
      </section>
      <AdminDataTable
        resourceKey={config.key}
        title={config.title}
        singular={config.singular}
        records={resources[config.key] || []}
        columns={config.columns}
        filters={config.filters}
        formFields={config.formFields}
      />
    </div>
  );
}

export function AdminDashboard() {
  const { resources } = useAdminData();
  const users = resources.users || [];
  const listings = resources.listings || [];
  const bookings = resources.bookings || [];
  const payments = resources.payments || [];
  const payouts = resources.payouts || [];
  const support = resources.support || [];
  const reports = resources.reports || [];
  const documents = resources.documents || [];

  const totalRevenue = payments.reduce((total, payment) => total + Number(payment.amount || 0), 0);
  const averageRating =
    listings.reduce((total, listing) => total + Number(listing.rating || 0), 0) / Math.max(listings.length, 1);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value={String(users.length)} icon={overviewIconMap.users} trend="+12%" />
        <StatCard label="Total Students" value={String((resources.students || []).length)} icon={overviewIconMap.students} trend="+9%" />
        <StatCard label="Total Hosts" value={String((resources.hosts || []).length)} icon={overviewIconMap.hosts} trend="+6%" />
        <StatCard label="Total Listings" value={String(listings.length)} icon={overviewIconMap.listings} trend="+15%" />
        <StatCard label="Active Bookings" value={String(bookings.filter((item) => item.status === 'Active').length)} icon={ClipboardCheck} accent="blue" />
        <StatCard label="Pending Bookings" value={String(bookings.filter((item) => item.status === 'Pending').length)} icon={AlertTriangle} accent="orange" />
        <StatCard label="Total Revenue" value={`R${totalRevenue.toLocaleString('en-ZA')}`} icon={CreditCard} accent="green" />
        <StatCard label="Pending Payouts" value={String(payouts.filter((item) => item.status === 'Pending').length)} icon={CreditCard} accent="orange" />
        <StatCard label="Pending Verifications" value={String(documents.filter((item) => item.status === 'Pending').length)} icon={ShieldCheck} accent="orange" />
        <StatCard label="Support Tickets" value={String(support.filter((item) => item.status !== 'Closed').length)} icon={MessageSquare} accent="blue" />
        <StatCard label="Reported Listings" value={String(reports.filter((item) => item.status !== 'Resolved').length)} icon={AlertTriangle} accent="orange" />
        <StatCard label="Average Rating" value={averageRating.toFixed(1)} icon={Star} accent="green" />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Monthly Bookings">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#E50914" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="#16A34A33" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="User Growth">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#2F9BFF" fill="#2F9BFF33" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Booking Status">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={bookingStatusSeries} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105} paddingAngle={4}>
                {bookingStatusSeries.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="mb-4 text-lg font-black text-[#111827]">Action Required</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['Pending host approvals', resources.hosts || []],
              ['Pending listing approvals', listings],
              ['Latest support tickets', support],
              ['Recent payments', payments]
            ].map(([title, source]) => (
              <div key={String(title)} className="rounded-2xl border border-[#E5E7EB] p-4">
                <p className="mb-3 text-sm font-black text-[#111827]">{String(title)}</p>
                {(source as typeof users).slice(0, 3).map((record) => (
                  <div key={record.id} className="flex items-center justify-between gap-3 border-t border-[#E5E7EB] py-2 first:border-t-0">
                    <span className="truncate text-sm font-semibold text-gray-600">{record.name}</span>
                    <StatusBadge status={record.status} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-black text-[#111827]">Recent Platform Activity</h3>
          <ActivityTimeline items={overviewActivity} />
        </div>
      </section>
    </div>
  );
}

export function AdminUsers() {
  return <AdminResourcePage resourceKey="users" />;
}

export function AdminStudents() {
  return <AdminResourcePage resourceKey="students" />;
}

export function AdminHosts() {
  return <AdminResourcePage resourceKey="hosts" />;
}

export function AdminListings() {
  return <AdminResourcePage resourceKey="listings" />;
}

export function AdminBookings() {
  return <AdminResourcePage resourceKey="bookings" />;
}

export function AdminPayments() {
  return <AdminResourcePage resourceKey="payments" />;
}

export function AdminPayouts() {
  return <AdminResourcePage resourceKey="payouts" />;
}

export function AdminReviews() {
  return <AdminResourcePage resourceKey="reviews" />;
}

export function AdminDocuments() {
  return <AdminResourcePage resourceKey="documents" />;
}

export function AdminVerification() {
  return <AdminResourcePage resourceKey="verification" />;
}

export function AdminSupport() {
  return <AdminResourcePage resourceKey="support" />;
}

export function AdminReports() {
  return <AdminResourcePage resourceKey="reports" />;
}

export function AdminPromotions() {
  return <AdminResourcePage resourceKey="promotions" />;
}

export function AdminInstitutions() {
  return <AdminResourcePage resourceKey="institutions" />;
}

export function AdminNotifications() {
  const [message, setMessage] = useState('Move-in reminders are now active for all confirmed bookings.');
  const { addToast } = useAdminData();

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <h3 className="text-lg font-black text-[#111827]">Create Platform Notification</h3>
        <p className="mt-1 text-sm font-semibold text-gray-500">TODO: connect push notification, email, SMS, and WhatsApp providers.</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_220px_180px]">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={3}
            className="rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm font-semibold outline-none focus:border-[#E50914]"
          />
          <select className="h-12 rounded-xl border border-[#E5E7EB] px-3 text-sm font-bold">
            <option>All users</option>
            <option>Students only</option>
            <option>Hosts only</option>
            <option>Specific user</option>
          </select>
          <button
            onClick={() => addToast({ title: 'Notification scheduled', message: 'Mock notification added to the queue.', type: 'success' })}
            className="h-12 rounded-xl bg-[#E50914] px-4 text-sm font-black text-white">
            Schedule
          </button>
        </div>
      </div>
      <AdminResourcePage resourceKey="notifications" />
    </div>
  );
}

export function AdminContent() {
  const [activeTab, setActiveTab] = useState('Banners');

  return (
    <div className="space-y-5">
      <AdminTabs tabs={['Banners', 'Announcements', 'Help Articles', 'FAQs', 'Policies', 'Onboarding', 'Featured Listings']} active={activeTab} onChange={setActiveTab} />
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <h3 className="text-lg font-black text-[#111827]">{activeTab}</h3>
        <p className="mt-1 text-sm font-semibold text-gray-500">
          Manage {activeTab.toLowerCase()} from the table below. TODO: connect rich text editing and media uploads to the content API.
        </p>
      </div>
      <AdminResourcePage resourceKey="content" />
    </div>
  );
}

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Search Conversion" value="18.4%" icon={SearchIcon} trend="+2.1%" accent="blue" />
        <StatCard label="Payment Success" value="94.8%" icon={CreditCard} trend="+1.8%" accent="green" />
        <StatCard label="Most Saved Listings" value="146" icon={Home} trend="+12%" />
        <StatCard label="Popular Location" value="Braamfontein" icon={Building2} accent="orange" />
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Listing Growth">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="listings" stroke="#E50914" fill="#E5091433" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Conversion Funnel">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{ step: 'Search', value: 1200 }, { step: 'View', value: 820 }, { step: 'Save', value: 410 }, { step: 'Book', value: 190 }, { step: 'Paid', value: 162 }]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="step" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2F9BFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <h3 className="text-lg font-black text-[#111827]">Analytics Reports</h3>
        <p className="mt-1 text-sm font-semibold text-gray-500">TODO: export analytics reports from production warehouse data.</p>
      </div>
    </div>
  );
}

function SearchIcon(props: { size?: number; className?: string }) {
  return <Users {...props} />;
}

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState(settingsSections[0]);
  const [platformName, setPlatformName] = useState('Kagie Stay Housing');
  const [supportEmail, setSupportEmail] = useState('support@kagiestay.co.za');
  const [serviceFee, setServiceFee] = useState('8');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const { addToast } = useAdminData();

  return (
    <div className="space-y-5">
      <AdminTabs tabs={settingsSections} active={activeTab} onChange={setActiveTab} />
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-black text-[#111827]">{activeTab}</h3>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              TODO: persist settings through admin API, enforce permissions, and audit every change.
            </p>
          </div>
          <button
            onClick={() => addToast({ title: 'Settings saved', message: `${activeTab} updated in mock state.`, type: 'success' })}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E50914] px-4 text-sm font-black text-white">
            <Save size={17} />
            Save Settings
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label>
            <span className="mb-1 block text-sm font-black text-[#111827]">Platform name</span>
            <input value={platformName} onChange={(event) => setPlatformName(event.target.value)} className="h-12 w-full rounded-xl border border-[#E5E7EB] px-3 text-sm font-semibold outline-none focus:border-[#E50914]" />
          </label>
          <label>
            <span className="mb-1 block text-sm font-black text-[#111827]">Support email</span>
            <input value={supportEmail} onChange={(event) => setSupportEmail(event.target.value)} className="h-12 w-full rounded-xl border border-[#E5E7EB] px-3 text-sm font-semibold outline-none focus:border-[#E50914]" />
          </label>
          <label>
            <span className="mb-1 block text-sm font-black text-[#111827]">Service fee percentage</span>
            <input value={serviceFee} onChange={(event) => setServiceFee(event.target.value)} className="h-12 w-full rounded-xl border border-[#E5E7EB] px-3 text-sm font-semibold outline-none focus:border-[#E50914]" />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] p-4">
            <span>
              <span className="block text-sm font-black text-[#111827]">Maintenance mode</span>
              <span className="text-sm font-semibold text-gray-500">Temporarily pause user-facing workflows.</span>
            </span>
            <input type="checkbox" checked={maintenanceMode} onChange={(event) => setMaintenanceMode(event.target.checked)} className="h-5 w-5 rounded text-[#E50914] focus:ring-[#E50914]" />
          </label>
          <div className="rounded-2xl border border-[#E5E7EB] p-4">
            <p className="text-sm font-black text-[#111827]">Security placeholders</p>
            <p className="mt-1 text-sm leading-6 text-gray-500">Two-factor auth, session timeout, API authentication, and role permissions are marked for backend integration.</p>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] p-4">
            <p className="text-sm font-black text-[#111827]">Payment verification</p>
            <p className="mt-1 text-sm leading-6 text-gray-500">Manual EFT confirmation and refunds need provider-side controls before launch.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminAuditLogs() {
  return <AdminResourcePage resourceKey="auditLogs" />;
}

export function AdminFallback() {
  return (
    <EmptyState
      title="Admin page coming soon"
      message="This route is registered, but the page content has not loaded."
    />
  );
}

export function AdminMediaPlaceholders() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <UploadPlaceholder />
      <UserAvatar name="Kagie Admin" />
      <LoadingSkeleton />
    </div>
  );
}
