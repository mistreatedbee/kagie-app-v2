import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  CreditCard,
  MessageSquare,
  TrendingUp,
  Calendar,
  Star,
  ArrowUpRight,
  ArrowDownRight } from
'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar } from
'recharts';
const earningsData = [
{
  name: 'Jan',
  amount: 45000
},
{
  name: 'Feb',
  amount: 52000
},
{
  name: 'Mar',
  amount: 48000
},
{
  name: 'Apr',
  amount: 61000
},
{
  name: 'May',
  amount: 59000
},
{
  name: 'Jun',
  amount: 65000
}];

const occupancyData = [
{
  name: 'The Apex',
  rate: 95
},
{
  name: 'Varsity Studios',
  rate: 82
},
{
  name: 'Urban Loft',
  rate: 100
}];

export function HostOverview() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display font-bold text-2xl text-dark">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">
            Welcome back, Sarah. Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border px-4 py-2 rounded-xl text-sm font-semibold text-dark hover:bg-gray-50 transition-colors">
            Download Report
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2">
            <Building2 size={16} />
            Add Listing
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Earnings"
          value="R 65,000"
          trend="+12.5%"
          isPositive={true}
          icon={<CreditCard size={20} />}
          color="bg-primary/10 text-primary" />
        
        <StatCard
          title="Active Bookings"
          value="124"
          trend="+5.2%"
          isPositive={true}
          icon={<Users size={20} />}
          color="bg-accent-blue/10 text-accent-blue" />
        
        <StatCard
          title="Occupancy Rate"
          value="92%"
          trend="-2.1%"
          isPositive={false}
          icon={<Building2 size={20} />}
          color="bg-accent-yellow/20 text-accent-yellow" />
        
        <StatCard
          title="Pending Requests"
          value="8"
          trend="Action needed"
          isNeutral={true}
          icon={<Calendar size={20} />}
          color="bg-dark/5 text-dark" />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-dark text-lg">Revenue Overview</h2>
            <select className="bg-gray-50 border border-border rounded-lg px-3 py-1.5 text-sm font-medium outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={earningsData}
                margin={{
                  top: 5,
                  right: 20,
                  bottom: 5,
                  left: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB" />
                
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }}
                  dy={10} />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }}
                  tickFormatter={(val) => `R${val / 1000}k`} />
                
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value: number) => [
                  `R ${value.toLocaleString()}`,
                  'Revenue']
                  } />
                
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#E50914"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: '#E50914',
                    strokeWidth: 2,
                    stroke: '#fff'
                  }}
                  activeDot={{
                    r: 6
                  }} />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col">
          <h2 className="font-bold text-dark text-lg mb-6">
            Occupancy by Property
          </h2>
          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={occupancyData}
                layout="vertical"
                margin={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#E5E7EB" />
                
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#111827',
                    fontSize: 12,
                    fontWeight: 600
                  }}
                  width={100} />
                
                <Tooltip
                  cursor={{
                    fill: '#F5F6FA'
                  }}
                  contentStyle={{
                    borderRadius: '8px'
                  }}
                  formatter={(val) => [`${val}%`, 'Occupancy']} />
                
                <Bar
                  dataKey="rate"
                  fill="#2F9BFF"
                  radius={[0, 4, 4, 0]}
                  barSize={24} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="text-sm text-gray-500">Average Occupancy</span>
            <span className="font-bold text-dark text-lg">92.3%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-dark text-lg">
              Recent Booking Requests
            </h2>
            <button className="text-sm font-semibold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) =>
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 transition-colors">
              
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                    S{i}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm">
                      Student Name {i}
                    </h4>
                    <p className="text-xs text-gray-500">
                      The Apex • Standard Single
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-bold hover:bg-success/20 transition-colors">
                    Accept
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-dark text-lg">Unread Messages</h2>
            <button className="text-sm font-semibold text-primary hover:underline">
              Go to Inbox
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) =>
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
              
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-dark text-sm">
                      Applicant {i}
                    </h4>
                    <span className="text-[10px] text-gray-400">2h ago</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    Hi, I was wondering if the room comes with a desk and chair?
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}
function StatCard({
  title,
  value,
  trend,
  isPositive,
  isNeutral,
  icon,
  color
}: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
          
          {icon}
        </div>
        {!isNeutral &&
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
          
            {isPositive ?
          <ArrowUpRight size={14} /> :

          <ArrowDownRight size={14} />
          }
            {trend}
          </div>
        }
        {isNeutral &&
        <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
            {trend}
          </div>
        }
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="font-display font-bold text-2xl text-dark">{value}</h3>
      </div>
    </div>);

}