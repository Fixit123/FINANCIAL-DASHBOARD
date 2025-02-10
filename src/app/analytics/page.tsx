'use client'

import PageLayout from '@/components/layout/PageLayout'
import { 
  BarChart, Bar, 
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer,
  Legend
} from 'recharts'

const monthlyData = [
  { name: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { name: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
  { name: 'Mar', revenue: 48000, expenses: 31000, profit: 17000 },
  { name: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
  { name: 'May', revenue: 55000, expenses: 35000, profit: 20000 },
  { name: 'Jun', revenue: 67000, expenses: 41000, profit: 26000 }
]

const customerData = [
  { name: 'New', value: 30 },
  { name: 'Returning', value: 45 },
  { name: 'Inactive', value: 25 }
]

const COLORS = ['#2D7FF9', '#00B574', '#FF4D4D']

export default function Analytics() {
  return (
    <PageLayout title="Analytics">
      <div className="grid gap-6">
        {/* Revenue vs Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-text-light dark:text-text-dark">Revenue vs Expenses</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#808080"
                    tick={{ fill: '#808080' }}
                  />
                  <YAxis 
                    stroke="#808080"
                    tick={{ fill: '#808080' }}
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#2D7FF9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#FF4D4D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Profit Trend */}
          <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-text-light dark:text-text-dark">Profit Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#808080"
                    tick={{ fill: '#808080' }}
                  />
                  <YAxis 
                    stroke="#808080"
                    tick={{ fill: '#808080' }}
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    name="Profit"
                    stroke="#00B574" 
                    strokeWidth={3}
                    dot={{ fill: '#00B574', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Distribution */}
          <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6 text-text-light dark:text-text-dark">Customer Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 