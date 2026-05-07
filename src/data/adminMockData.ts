import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  ClipboardCheck,
  CreditCard,
  FileCheck,
  FileText,
  Gift,
  GraduationCap,
  Home,
  Landmark,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  PieChart,
  Receipt,
  Settings,
  ShieldCheck,
  Star,
  Ticket,
  Users
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AdminRecordValue = string | number | boolean | undefined;

export interface AdminRecord {
  id: string;
  name: string;
  status: string;
  date: string;
  description: string;
  [key: string]: AdminRecordValue;
}

export interface AdminColumn {
  key: string;
  label: string;
  type?: 'status' | 'currency' | 'rating' | 'image' | 'boolean';
}

export interface AdminFilter {
  key: string;
  label: string;
  options: string[];
}

export interface AdminResourceConfig {
  key: string;
  title: string;
  singular: string;
  description: string;
  route: string;
  icon: LucideIcon;
  columns: AdminColumn[];
  filters: AdminFilter[];
  initialRecords: AdminRecord[];
  formFields: string[];
}

export interface AdminNavItem {
  label: string;
  route: string;
  icon: LucideIcon;
}

const statuses = {
  users: ['Active', 'Suspended', 'Pending', 'Verified'],
  listings: ['Published', 'Pending', 'Rejected', 'Featured'],
  bookings: ['Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled', 'Refunded'],
  payments: ['Paid', 'Pending', 'Failed', 'Refunded'],
  payouts: ['Pending', 'Approved', 'Paid', 'Rejected'],
  reviews: ['Published', 'Pending', 'Hidden', 'Flagged'],
  documents: ['Approved', 'Pending', 'Rejected', 'Expired'],
  support: ['Open', 'In Progress', 'Waiting for User', 'Resolved', 'Closed'],
  reports: ['Open', 'Escalated', 'Resolved', 'Dismissed'],
  coupons: ['Active', 'Paused', 'Expired', 'Draft']
};

const people = [
  ['Amina Dlamini', 'amina@kagie.co.za', '071 444 1829', 'University of Cape Town'],
  ['Thabo Mokoena', 'thabo@kagie.co.za', '082 558 9911', 'Wits University'],
  ['Naledi Jacobs', 'naledi@kagie.co.za', '073 224 8870', 'University of Pretoria'],
  ['Lerato Nkosi', 'lerato@kagie.co.za', '084 931 5519', 'Stellenbosch University'],
  ['Michael Adams', 'michael@kagie.co.za', '079 112 3408', 'University of Johannesburg'],
  ['Zinhle Khumalo', 'zinhle@kagie.co.za', '076 778 4302', 'Durban University of Technology']
];

const listingImages = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=160&q=80'
];

const nextDate = (index: number) => `2026-0${(index % 5) + 1}-${String(10 + index).padStart(2, '0')}`;

const makeUserRecords = (role: string): AdminRecord[] =>
  people.map(([name, email, phone, institution], index) => ({
    id: `${role.toLowerCase()}-${index + 1}`,
    name,
    email,
    phone,
    role,
    status: statuses.users[index % statuses.users.length],
    verification: index % 2 === 0 ? 'Verified' : 'Pending',
    institution,
    date: nextDate(index),
    description: `${role} account connected to ${institution}.`,
    activity: `${8 + index} platform actions`,
    bookings: 1 + index,
    payments: `R${(2400 + index * 850).toLocaleString('en-ZA')}`
  }));

const makeListings = (): AdminRecord[] =>
  [
    'Rosebank Student Lofts',
    'Varsity Commons Braamfontein',
    'Campus Edge Hatfield',
    'Oak House Stellenbosch',
    'Harbour View Residence',
    'Kagie Central Rooms'
  ].map((name, index) => ({
    id: `listing-${index + 1}`,
    name,
    image: listingImages[index % listingImages.length],
    host: people[index % people.length][0],
    owner: people[index % people.length][0],
    location: ['Johannesburg', 'Pretoria', 'Cape Town', 'Stellenbosch'][index % 4],
    institution: people[index % people.length][3],
    price: 3900 + index * 650,
    status: statuses.listings[index % statuses.listings.length],
    rating: Number((4.1 + index * 0.13).toFixed(1)),
    availability: index % 2 === 0 ? 'Available' : 'Limited',
    date: nextDate(index),
    description: `${name} includes furnished rooms, secure access, and campus transport.`,
    capacity: 18 + index * 4
  }));

const makeBookings = (): AdminRecord[] =>
  people.map(([name], index) => ({
    id: `KG-${202600 + index}`,
    name: `Booking KG-${202600 + index}`,
    student: name,
    host: people[(index + 1) % people.length][0],
    listing: makeListings()[index % 6].name,
    roomType: index % 2 === 0 ? 'Private room' : 'Shared room',
    amount: 4200 + index * 700,
    status: statuses.bookings[index % statuses.bookings.length],
    paymentStatus: statuses.payments[index % statuses.payments.length],
    date: nextDate(index),
    description: `Move-in ${nextDate(index + 2)} with document review pending.`,
    timeline: 'Requested, reviewed, payment checked'
  }));

const makeMoneyRecords = (key: 'payments' | 'payouts'): AdminRecord[] =>
  people.map(([name], index) => ({
    id: `${key === 'payments' ? 'TX' : 'PO'}-${8800 + index}`,
    name: `${key === 'payments' ? 'Payment' : 'Payout'} ${8800 + index}`,
    booking: `KG-${202600 + index}`,
    owner: name,
    student: name,
    host: people[(index + 2) % people.length][0],
    amount: 3900 + index * 540,
    commission: 390 + index * 48,
    netPayout: 3510 + index * 492,
    method: index % 2 === 0 ? 'Card' : 'EFT',
    status: statuses[key][index % statuses[key].length],
    date: nextDate(index),
    description:
      key === 'payments'
        ? 'TODO: connect payment verification and receipt download to production provider.'
        : 'TODO: secure host bank detail access before production payout approval.'
  }));

const makeSimpleRecords = (
  prefix: string,
  names: string[],
  statusOptions: string[],
  extra: (index: number) => Partial<AdminRecord> = () => ({})
): AdminRecord[] =>
  names.map((name, index) => ({
    id: `${prefix}-${index + 1}`,
    name,
    owner: people[index % people.length][0],
    email: people[index % people.length][1],
    status: statusOptions[index % statusOptions.length],
    priority: ['Low', 'Medium', 'High', 'Urgent'][index % 4],
    category: ['Booking issue', 'Payment issue', 'Host issue', 'Listing issue'][index % 4],
    date: nextDate(index),
    description: `${name} requires admin review before production API integration.`,
    ...extra(index)
  }));

const resource = (
  config: Omit<AdminResourceConfig, 'formFields'> & { formFields?: string[] }
): AdminResourceConfig => ({
  formFields: ['name', 'status', 'owner', 'email', 'description'],
  ...config
});

const userColumns: AdminColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'verification', label: 'Verification', type: 'status' },
  { key: 'date', label: 'Date Joined' }
];

const listingColumns: AdminColumn[] = [
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'name', label: 'Listing Name' },
  { key: 'host', label: 'Host' },
  { key: 'location', label: 'Location' },
  { key: 'institution', label: 'Institution Nearby' },
  { key: 'price', label: 'Price', type: 'currency' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'rating', label: 'Rating', type: 'rating' },
  { key: 'availability', label: 'Availability' },
  { key: 'date', label: 'Created' }
];

const bookingColumns: AdminColumn[] = [
  { key: 'id', label: 'Reference' },
  { key: 'student', label: 'Student' },
  { key: 'host', label: 'Host' },
  { key: 'listing', label: 'Listing' },
  { key: 'amount', label: 'Amount', type: 'currency' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'paymentStatus', label: 'Payment', type: 'status' },
  { key: 'date', label: 'Date' }
];

const moneyColumns: AdminColumn[] = [
  { key: 'id', label: 'Transaction ID' },
  { key: 'booking', label: 'Booking' },
  { key: 'student', label: 'Student/Host' },
  { key: 'amount', label: 'Amount', type: 'currency' },
  { key: 'method', label: 'Method' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'date', label: 'Date' }
];

const basicColumns: AdminColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'owner', label: 'Owner' },
  { key: 'category', label: 'Category' },
  { key: 'priority', label: 'Priority', type: 'status' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'date', label: 'Date' }
];

export const adminResources: AdminResourceConfig[] = [
  resource({
    key: 'users',
    title: 'Users',
    singular: 'User',
    description: 'Manage every Kagie account, role, status, notification, and reset action.',
    route: '/admin/users',
    icon: Users,
    columns: userColumns,
    filters: [
      { key: 'role', label: 'Role', options: ['Student', 'Host', 'Admin', 'Support', 'Finance'] },
      { key: 'status', label: 'Status', options: statuses.users }
    ],
    initialRecords: [
      ...makeUserRecords('Student'),
      ...makeUserRecords('Host').slice(0, 3),
      {
        id: 'admin-1',
        name: 'Kagie Admin',
        email: 'admin@kagie.co.za',
        phone: '010 555 0110',
        role: 'Admin',
        status: 'Active',
        verification: 'Verified',
        date: '2026-01-08',
        description: 'Platform administrator. TODO: enforce granular role permissions.',
        institution: 'Kagie HQ'
      }
    ]
  }),
  resource({
    key: 'students',
    title: 'Students',
    singular: 'Student',
    description: 'Review student identities, institutions, documents, bookings, and messages.',
    route: '/admin/students',
    icon: GraduationCap,
    columns: userColumns,
    filters: [
      { key: 'institution', label: 'Institution', options: people.map((item) => item[3]) },
      { key: 'verification', label: 'Verification', options: ['Verified', 'Pending', 'Rejected'] }
    ],
    initialRecords: makeUserRecords('Student')
  }),
  resource({
    key: 'hosts',
    title: 'Hosts / Landlords',
    singular: 'Host',
    description: 'Approve hosts, inspect listings, earnings, payout details, and reviews.',
    route: '/admin/hosts',
    icon: Building2,
    columns: userColumns,
    filters: [{ key: 'status', label: 'Status', options: statuses.users }],
    initialRecords: makeUserRecords('Host')
  }),
  resource({
    key: 'listings',
    title: 'Listings',
    singular: 'Listing',
    description: 'Approve, edit, feature, publish, and manage accommodation inventory.',
    route: '/admin/listings',
    icon: Home,
    columns: listingColumns,
    filters: [
      { key: 'status', label: 'Status', options: statuses.listings },
      { key: 'location', label: 'City', options: ['Johannesburg', 'Pretoria', 'Cape Town', 'Stellenbosch'] },
      { key: 'availability', label: 'Availability', options: ['Available', 'Limited'] }
    ],
    initialRecords: makeListings(),
    formFields: ['name', 'host', 'location', 'institution', 'price', 'capacity', 'status', 'description']
  }),
  resource({
    key: 'bookings',
    title: 'Bookings',
    singular: 'Booking',
    description: 'Manage booking approvals, payment state, check-ins, documents, and timelines.',
    route: '/admin/bookings',
    icon: ClipboardCheck,
    columns: bookingColumns,
    filters: [{ key: 'status', label: 'Status', options: statuses.bookings }],
    initialRecords: makeBookings()
  }),
  resource({
    key: 'payments',
    title: 'Payments',
    singular: 'Payment',
    description: 'Track transactions, failed reasons, manual EFT checks, refunds, and receipts.',
    route: '/admin/payments',
    icon: CreditCard,
    columns: moneyColumns,
    filters: [{ key: 'status', label: 'Status', options: statuses.payments }],
    initialRecords: makeMoneyRecords('payments')
  }),
  resource({
    key: 'payouts',
    title: 'Payouts',
    singular: 'Payout',
    description: 'Approve host payout requests with commission, net payout, and bank placeholders.',
    route: '/admin/payouts',
    icon: Receipt,
    columns: moneyColumns,
    filters: [{ key: 'status', label: 'Status', options: statuses.payouts }],
    initialRecords: makeMoneyRecords('payouts')
  }),
  resource({
    key: 'reviews',
    title: 'Reviews',
    singular: 'Review',
    description: 'Moderate ratings, flagged reviews, admin replies, and publishing status.',
    route: '/admin/reviews',
    icon: Star,
    columns: [
      { key: 'owner', label: 'Student' },
      { key: 'listing', label: 'Listing' },
      { key: 'rating', label: 'Rating', type: 'rating' },
      { key: 'description', label: 'Preview' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'date', label: 'Date' }
    ],
    filters: [
      { key: 'status', label: 'Status', options: statuses.reviews },
      { key: 'rating', label: 'Rating', options: ['1', '2', '3', '4', '5'] }
    ],
    initialRecords: makeSimpleRecords('review', ['Clean rooms', 'Helpful host', 'Noisy street', 'Great value', 'Needs repairs'], statuses.reviews, (index) => ({
      listing: makeListings()[index % 6].name,
      rating: 5 - (index % 4)
    }))
  }),
  resource({
    key: 'documents',
    title: 'Documents',
    singular: 'Document',
    description: 'Approve, reject, request re-upload, track expiry, and secure previews.',
    route: '/admin/documents',
    icon: FileText,
    columns: basicColumns,
    filters: [
      {
        key: 'category',
        label: 'Document Type',
        options: ['ID document', 'Proof of registration', 'Proof of payment', 'Lease agreement', 'Host verification', 'Property ownership proof']
      },
      { key: 'status', label: 'Status', options: statuses.documents }
    ],
    initialRecords: makeSimpleRecords(
      'document',
      ['Student ID upload', 'Registration proof', 'Lease agreement', 'Host ownership proof', 'Payment receipt'],
      statuses.documents,
      (index) => ({
        category: ['ID document', 'Proof of registration', 'Lease agreement', 'Property ownership proof', 'Proof of payment'][index % 5],
        description: 'TODO: replace placeholder preview with secure document access and signed download URLs.'
      })
    )
  }),
  resource({
    key: 'verification',
    title: 'Verification Center',
    singular: 'Verification Item',
    description: 'Central queue for student, host, listing, photo, and document approvals.',
    route: '/admin/verification',
    icon: ShieldCheck,
    columns: basicColumns,
    filters: [
      { key: 'category', label: 'Queue', options: ['Student', 'Host', 'Listing', 'Photo', 'Document'] },
      { key: 'status', label: 'Status', options: ['Pending', 'Approved', 'Rejected', 'More Info Requested'] }
    ],
    initialRecords: makeSimpleRecords(
      'verification',
      ['Student verification', 'Host identity check', 'Listing approval', 'Photo verification', 'Document approval'],
      ['Pending', 'Approved', 'Rejected', 'More Info Requested'],
      (index) => ({ category: ['Student', 'Host', 'Listing', 'Photo', 'Document'][index % 5] })
    )
  }),
  resource({
    key: 'support',
    title: 'Support Tickets',
    singular: 'Support Ticket',
    description: 'Assign, reply, escalate, and close account, booking, listing, and payment issues.',
    route: '/admin/support',
    icon: Ticket,
    columns: basicColumns,
    filters: [
      { key: 'category', label: 'Category', options: ['Booking issue', 'Payment issue', 'Host issue', 'Listing issue', 'Account issue', 'Technical issue'] },
      { key: 'priority', label: 'Priority', options: ['Low', 'Medium', 'High', 'Urgent'] },
      { key: 'status', label: 'Status', options: statuses.support }
    ],
    initialRecords: makeSimpleRecords('ticket', ['Move-in issue', 'Failed payment', 'Host not responding', 'Wrong listing photos', 'Account locked'], statuses.support)
  }),
  resource({
    key: 'reports',
    title: 'Reports',
    singular: 'Report',
    description: 'Investigate reported listings, users, reviews, fraud, and safety concerns.',
    route: '/admin/reports',
    icon: FileCheck,
    columns: basicColumns,
    filters: [
      { key: 'category', label: 'Report Type', options: ['Reported listings', 'Reported users', 'Reported reviews', 'Fraud/safety'] },
      { key: 'status', label: 'Status', options: statuses.reports }
    ],
    initialRecords: makeSimpleRecords('report', ['Suspicious listing', 'Unsafe property report', 'Review abuse', 'Payment fraud warning'], statuses.reports)
  }),
  resource({
    key: 'promotions',
    title: 'Promotions',
    singular: 'Coupon',
    description: 'Create coupons, usage limits, expiry, first-booking rules, and discounts.',
    route: '/admin/promotions',
    icon: Gift,
    columns: [
      { key: 'name', label: 'Code' },
      { key: 'discount', label: 'Discount' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'usage', label: 'Usage' },
      { key: 'date', label: 'Expiry Date' }
    ],
    filters: [{ key: 'status', label: 'Status', options: statuses.coupons }],
    initialRecords: makeSimpleRecords('coupon', ['WELCOME10', 'STUDENT500', 'FIRSTSTAY', 'HOSTBOOST'], statuses.coupons, (index) => ({
      discount: index % 2 === 0 ? '10%' : 'R500',
      usage: `${22 + index * 7}/100`
    })),
    formFields: ['name', 'discount', 'usage', 'status', 'description']
  }),
  resource({
    key: 'institutions',
    title: 'Institutions',
    singular: 'Institution',
    description: 'Manage campuses, cities, logos, coordinates, and linked nearby listings.',
    route: '/admin/institutions',
    icon: Landmark,
    columns: [
      { key: 'name', label: 'Institution' },
      { key: 'campus', label: 'Campus' },
      { key: 'location', label: 'City' },
      { key: 'province', label: 'Province' },
      { key: 'website', label: 'Website' },
      { key: 'status', label: 'Status', type: 'status' }
    ],
    filters: [
      { key: 'location', label: 'City', options: ['Johannesburg', 'Pretoria', 'Cape Town', 'Durban', 'Stellenbosch'] },
      { key: 'status', label: 'Status', options: ['Active', 'Draft'] }
    ],
    initialRecords: people.map((item, index) => ({
      id: `institution-${index + 1}`,
      name: item[3],
      campus: ['Main Campus', 'North Campus', 'City Campus'][index % 3],
      location: ['Cape Town', 'Johannesburg', 'Pretoria', 'Stellenbosch', 'Durban'][index % 5],
      province: ['Western Cape', 'Gauteng', 'KwaZulu-Natal'][index % 3],
      website: 'https://example.edu',
      status: index % 2 === 0 ? 'Active' : 'Draft',
      date: nextDate(index),
      description: 'TODO: connect coordinates and institution logo upload to backend storage.'
    })),
    formFields: ['name', 'campus', 'location', 'province', 'website', 'status', 'description']
  }),
  resource({
    key: 'notifications',
    title: 'Notifications',
    singular: 'Notification',
    description: 'Create platform messages for all users, students, hosts, or specific accounts.',
    route: '/admin/notifications',
    icon: Bell,
    columns: [
      { key: 'name', label: 'Title' },
      { key: 'audience', label: 'Audience' },
      { key: 'category', label: 'Type' },
      { key: 'priority', label: 'Priority', type: 'status' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'date', label: 'Schedule Date' }
    ],
    filters: [
      { key: 'audience', label: 'Audience', options: ['All users', 'Students', 'Hosts', 'Specific user'] },
      { key: 'priority', label: 'Priority', options: ['Low', 'Medium', 'High', 'Urgent'] }
    ],
    initialRecords: makeSimpleRecords('notification', ['Move-in reminder', 'Payment notice', 'New listing alert', 'Maintenance update'], ['Scheduled', 'Sent', 'Draft'], (index) => ({
      audience: ['All users', 'Students', 'Hosts', 'Specific user'][index % 4],
      category: ['Push', 'Email', 'SMS/WhatsApp'][index % 3],
      description: 'TODO: wire push, email, SMS, and WhatsApp providers before production sends.'
    })),
    formFields: ['name', 'audience', 'category', 'priority', 'status', 'description']
  }),
  resource({
    key: 'content',
    title: 'Content Management',
    singular: 'Content Item',
    description: 'Manage banners, announcements, help articles, FAQs, policies, and onboarding copy.',
    route: '/admin/content',
    icon: BookOpen,
    columns: basicColumns,
    filters: [{ key: 'category', label: 'Content Type', options: ['Banner', 'Announcement', 'Help article', 'FAQ', 'Terms', 'Privacy', 'Onboarding'] }],
    initialRecords: makeSimpleRecords('content', ['Homepage banner', 'Exam season announcement', 'FAQ: bookings', 'Privacy policy', 'Featured listings rail'], ['Published', 'Draft', 'Archived'])
  }),
  resource({
    key: 'auditLogs',
    title: 'Audit Logs',
    singular: 'Audit Log',
    description: 'Track admin actions, role changes, approvals, refunds, settings, and security events.',
    route: '/admin/audit-logs',
    icon: Activity,
    columns: [
      { key: 'name', label: 'Action' },
      { key: 'owner', label: 'Admin' },
      { key: 'category', label: 'Action Type' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'date', label: 'Date' },
      { key: 'description', label: 'Details' }
    ],
    filters: [
      { key: 'owner', label: 'Admin', options: ['Kagie Admin', 'Finance Admin', 'Support Lead'] },
      { key: 'category', label: 'Action Type', options: ['User', 'Listing', 'Booking', 'Payment', 'Settings'] }
    ],
    initialRecords: makeSimpleRecords('audit', ['User suspended', 'Listing approved', 'Booking cancelled', 'Payment refunded', 'Coupon created', 'Settings updated'], ['Complete', 'Warning'], (index) => ({
      owner: ['Kagie Admin', 'Finance Admin', 'Support Lead'][index % 3],
      category: ['User', 'Listing', 'Booking', 'Payment', 'Settings'][index % 5]
    }))
  })
];

export const adminNavItems: AdminNavItem[] = [
  { label: 'Overview', route: '/admin', icon: LayoutDashboard },
  ...adminResources
    .filter((item) => item.key !== 'auditLogs')
    .map(({ title, route, icon }) => ({ label: title, route, icon })),
  { label: 'Analytics', route: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', route: '/admin/settings', icon: Settings },
  { label: 'Audit Logs', route: '/admin/audit-logs', icon: Activity }
];

export const analyticsSeries = [
  { month: 'Jan', bookings: 120, revenue: 288000, users: 340, listings: 82 },
  { month: 'Feb', bookings: 158, revenue: 361000, users: 420, listings: 96 },
  { month: 'Mar', bookings: 201, revenue: 471000, users: 510, listings: 112 },
  { month: 'Apr', bookings: 245, revenue: 566000, users: 615, listings: 128 },
  { month: 'May', bookings: 276, revenue: 639000, users: 730, listings: 146 },
  { month: 'Jun', bookings: 324, revenue: 746000, users: 860, listings: 168 }
];

export const bookingStatusSeries = [
  { name: 'Confirmed', value: 42 },
  { name: 'Pending', value: 22 },
  { name: 'Active', value: 18 },
  { name: 'Cancelled', value: 8 },
  { name: 'Refunded', value: 4 }
];

export const settingsSections = [
  'General',
  'Platform Branding',
  'Payment Settings',
  'Commission Settings',
  'Booking Settings',
  'Notification Settings',
  'Security Settings',
  'Role Permissions',
  'Maintenance Mode',
  'Currency Settings',
  'Language Settings'
];

export const overviewActivity = [
  'Host account approved for Varsity Commons Braamfontein',
  'Manual EFT payment marked as paid for KG-202602',
  'Listing photos requested for Campus Edge Hatfield',
  'Support ticket escalated to finance team',
  'WELCOME10 coupon usage limit updated'
];

export const overviewIconMap = {
  users: Users,
  students: GraduationCap,
  hosts: Building2,
  listings: Home,
  bookings: ClipboardCheck,
  payments: CreditCard,
  payouts: Receipt,
  reviews: Star,
  documents: FileText,
  support: MessageSquare,
  reports: Megaphone,
  analytics: PieChart
};
