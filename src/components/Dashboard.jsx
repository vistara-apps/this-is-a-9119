import React, { useState, useEffect } from 'react'
import Header from './Header'
import StatsCard from './StatsCard'
import LineChart from './charts/LineChart'
import BarChart from './charts/BarChart'
import DonutChart from './charts/DonutChart'
import AreaChart from './charts/AreaChart'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Target, RefreshCw } from 'lucide-react'
import { useStats, usePeriodicRefresh } from '../hooks/useApi'
import { statsAPI } from '../services/api'
import { REFRESH_INTERVALS } from '../constants'

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: statsData, loading: statsLoading, error: statsError, refetch: refetchStats } = useStats()

  // Icon mapping for stats
  const iconMap = {
    revenue: DollarSign,
    subscriptions: Users,
    sales: BarChart3,
    active: Activity,
    growth: TrendingUp,
    conversion: Target,
  }

  // Manual refresh handler
  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refetchStats()
    } finally {
      setRefreshing(false)
    }
  }

  // Auto-refresh setup
  usePeriodicRefresh(refetchStats, REFRESH_INTERVALS.stats, true)

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header with Refresh Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
            <p className="text-slate-400">Monitor your business performance in real-time</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing || statsLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Error State */}
        {statsError && (
          <div className="mb-6">
            <ErrorMessage 
              message={statsError} 
              onRetry={refetchStats}
              title="Failed to load dashboard data"
            />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {statsLoading ? (
            // Loading skeleton for stats
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg"></div>
                  <div className="w-16 h-4 bg-slate-700 rounded"></div>
                </div>
                <div className="w-20 h-8 bg-slate-700 rounded mb-2"></div>
                <div className="w-24 h-4 bg-slate-700 rounded"></div>
              </div>
            ))
          ) : statsData ? (
            statsData.map((stat, index) => {
              const IconComponent = iconMap[stat.id] || iconMap.revenue
              return (
                <StatsCard
                  key={stat.id || index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeType={stat.changeType}
                  icon={IconComponent}
                  color={stat.color}
                  trend={stat.trend}
                />
              )
            })
          ) : null}
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
