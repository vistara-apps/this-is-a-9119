import React from 'react'
import Header from './Header'
import StatsCard from './StatsCard'
import LineChart from './charts/LineChart'
import BarChart from './charts/BarChart'
import DonutChart from './charts/DonutChart'
import AreaChart from './charts/AreaChart'
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Target } from 'lucide-react'

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      title: 'Subscriptions',
      value: '2,425',
      change: '+180.1%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Sales',
      value: '12,234',
      change: '+19%',
      changeType: 'increase',
      icon: BarChart3,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Now',
      value: '573',
      change: '+201%',
      changeType: 'increase',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <LineChart />
          </div>
          
          {/* Donut Chart */}
          <div>
            <DonutChart />
          </div>
          
          {/* Bar Chart */}
          <div>
            <BarChart />
          </div>
          
          {/* Area Chart */}
          <div className="lg:col-span-2">
            <AreaChart />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard