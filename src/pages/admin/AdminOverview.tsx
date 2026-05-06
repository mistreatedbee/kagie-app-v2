import React from 'react';
import {
  Users,
  Building2,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell } from
'recharts';
const growthData = [
{
  name: 'Jan',
  students: 1200,
  hosts: 45
},
{
  name: 'Feb',
  students: 1900,
  hosts: 62
},
{
  name: 'Mar',
  students: 2400,
  hosts: 85
},
{
  name: 'Apr',
  students: 3100,
  hosts: 110
},
{
  name: 'May',
  students: 4500,
  hosts: 145
},
{
  name: 'Jun',
  students: 5800,
  hosts: 190
}];

const userDistribution = [
{
  name: 'Students',
  value: 5800,
  color: '#E50914'
},
{
  name: 'Hosts',
  value: 190,
  color: '#2F9BFF'
},
{
  name: 'Admins',
  value: 12,
  color: '#111827'
}];

export function AdminOverview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display font-bold text-2xl text-dark">
            Platform Overview
          </h1>
          <p className="text-gray-500">System metrics and platform health.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border border-border px-4 py-2 rounded-xl text-sm font-semibold text-dark outline-none shadow-sm">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="bg-dark text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-dark/90 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="6,002"
          trend="+18.2%"
          isPositive={true}
          icon={<Users size={20} />}
          color="bg-primary/10 text-primary" />
        
        <StatCard
          title="Total Listings"
          value="845"
          trend="+12.5%"
          isPositive={true}
          icon={<Building2 size={20} />}
          color="bg-accent-blue/10 text-accent-blue" />
        
        <StatCard
          title="Platform Revenue"
          value="R 1.2M"
          trend="+24.8%"
          isPositive={true}
          icon={<CreditCard size={20} />}
          color="bg-success/10 text-success" />
        
        <StatCard
          title="Pending Verifications"
          value="34"
          trend="Needs review"
          isNeutral={true}
          icon={<ShieldCheck size={20} />}
          color="bg-accent-yellow/20 text-accent-yellow" />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-dark text-lg">User Growth</h2>
              <p className="text-sm text-gray-500">
                Students vs Hosts over time
              </p>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <MoreVertical size={20} className="text-gray-400" />
            </button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={growthData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>
                
                <defs>
                  <linearGradient
                    id="colorStudents"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1">
                    
                    <stop offset="5%" stopColor="#E50914" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F9BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2F9BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  }} />
                
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }} />
                
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#E50914"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorStudents)" />
                
                <Area
                  type="monotone"
                  dataKey="hosts"
                  stroke="#2F9BFF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorHosts)" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col">
          <h2 className="font-bold text-dark text-lg mb-2">
            User Distribution
          </h2>
          <div className="flex-1 w-full relative min-h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value">
                  
                  {userDistribution.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={entry.color} />
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} />
                
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-display font-bold text-dark">
                6k+
              </span>
              <span className="text-xs text-gray-500">Total Users</span>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            {userDistribution.map((item) =>
            <div
              key={item.name}
              className="flex items-center justify-between">
              
                <div className="flex items-center gap-2">
                  <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color
                  }}>
                </div>
                  <span className="text-sm font-medium text-dark">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-dark">
                  {item.value.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Action Required */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-primary" />
              <h2 className="font-bold text-dark text-lg">Action Required</h2>
            </div>
          </div>
          <div className="space-y-3">
            <ActionItem
              title="Host Verification Pending"
              desc="5 new hosts waiting for document approval."
              action="Review"
              type="warning" />
            
            <ActionItem
              title="Reported Listing"
              desc="Listing #842 has received 3 user reports."
              action="Investigate"
              type="danger" />
            
            <ActionItem
              title="Payout Failed"
              desc="Automated payout to Host ID 492 failed."
              action="Resolve"
              type="danger" />
            
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
          <h2 className="font-bold text-dark text-lg mb-6">
            Recent Platform Activity
          </h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            <ActivityItem
              title="New Booking Completed"
              time="10 mins ago"
              desc="R9,500 processed for The Apex Living."
              icon={<CreditCard size={14} />}
              color="bg-success text-white" />
            
            <ActivityItem
              title="New Host Registered"
              time="1 hour ago"
              desc="CampusKey Properties joined the platform."
              icon={<Building2 size={14} />}
              color="bg-accent-blue text-white" />
            
            <ActivityItem
              title="System Update"
              time="3 hours ago"
              desc="Automated database backup completed successfully."
              icon={<ShieldCheck size={14} />}
              color="bg-dark text-white" />
            
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
function ActionItem({ title, desc, action, type }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-gray-50">
      <div>
        <h4 className="font-bold text-dark text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <button
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${type === 'danger' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-accent-yellow/20 text-accent-yellow hover:bg-accent-yellow/30'}`}>
        
        {action}
      </button>
    </div>);

}
function ActivityItem({ title, time, desc, icon, color }: any) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${color}`}>
        
        {icon}
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-border bg-white shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-dark text-sm">{title}</h4>
          <span className="text-[10px] text-gray-400 font-medium">{time}</span>
        </div>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </div>);

}