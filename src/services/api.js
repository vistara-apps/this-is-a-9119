/**
 * API Service Layer
 * Handles all data fetching and API communication
 */

// Mock API base URL - replace with actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.dashboard.example.com';

/**
 * Generic API request handler
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object>} API response
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('API Request failed:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Dashboard Statistics API
 */
export const statsAPI = {
  /**
   * Get dashboard statistics
   * @returns {Promise<object>} Statistics data
   */
  getStats: async () => {
    // Mock data for development - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 'revenue',
              title: 'Total Revenue',
              value: '$45,231',
              change: '+20.1%',
              changeType: 'increase',
              trend: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
              color: 'bg-blue-500'
            },
            {
              id: 'subscriptions',
              title: 'Subscriptions',
              value: '2,425',
              change: '+180.1%',
              changeType: 'increase',
              trend: [400, 300, 600, 800, 500, 700, 900],
              color: 'bg-green-500'
            },
            {
              id: 'sales',
              title: 'Sales',
              value: '12,234',
              change: '+19%',
              changeType: 'increase',
              trend: [200, 400, 300, 500, 400, 600, 700],
              color: 'bg-purple-500'
            },
            {
              id: 'active',
              title: 'Active Now',
              value: '573',
              change: '+201%',
              changeType: 'increase',
              trend: [100, 200, 150, 300, 250, 400, 573],
              color: 'bg-orange-500'
            }
          ],
          timestamp: new Date().toISOString(),
        });
      }, 500);
    });
  },

  /**
   * Get real-time statistics updates
   * @returns {Promise<object>} Updated statistics
   */
  getRealtimeStats: async () => {
    return apiRequest('/api/stats/realtime');
  },
};

/**
 * Charts Data API
 */
export const chartsAPI = {
  /**
   * Get revenue chart data
   * @param {string} period - Time period (day, week, month, year)
   * @returns {Promise<object>} Revenue chart data
   */
  getRevenueData: async (period = 'month') => {
    // Mock data for development
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          { name: 'Jan', revenue: 4000, profit: 2400, expenses: 1600 },
          { name: 'Feb', revenue: 3000, profit: 1398, expenses: 1602 },
          { name: 'Mar', revenue: 2000, profit: 9800, expenses: -7800 },
          { name: 'Apr', revenue: 2780, profit: 3908, expenses: -1128 },
          { name: 'May', revenue: 1890, profit: 4800, expenses: -2910 },
          { name: 'Jun', revenue: 2390, profit: 3800, expenses: -1410 },
          { name: 'Jul', revenue: 3490, profit: 4300, expenses: -810 },
          { name: 'Aug', revenue: 4000, profit: 2400, expenses: 1600 },
          { name: 'Sep', revenue: 3000, profit: 1398, expenses: 1602 },
          { name: 'Oct', revenue: 2000, profit: 9800, expenses: -7800 },
          { name: 'Nov', revenue: 2780, profit: 3908, expenses: -1128 },
          { name: 'Dec', revenue: 1890, profit: 4800, expenses: -2910 },
        ];
        
        resolve({
          success: true,
          data,
          period,
          timestamp: new Date().toISOString(),
        });
      }, 300);
    });
  },

  /**
   * Get sales chart data
   * @param {string} period - Time period
   * @returns {Promise<object>} Sales chart data
   */
  getSalesData: async (period = 'week') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          { name: 'Mon', sales: 400, target: 500 },
          { name: 'Tue', sales: 300, target: 450 },
          { name: 'Wed', sales: 600, target: 550 },
          { name: 'Thu', sales: 800, target: 600 },
          { name: 'Fri', sales: 500, target: 520 },
          { name: 'Sat', sales: 700, target: 650 },
          { name: 'Sun', sales: 400, target: 400 },
        ];
        
        resolve({
          success: true,
          data,
          period,
          timestamp: new Date().toISOString(),
        });
      }, 200);
    });
  },

  /**
   * Get distribution chart data (donut/pie chart)
   * @returns {Promise<object>} Distribution data
   */
  getDistributionData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          { name: 'Desktop', value: 45, color: '#3b82f6' },
          { name: 'Mobile', value: 35, color: '#10b981' },
          { name: 'Tablet', value: 15, color: '#8b5cf6' },
          { name: 'Other', value: 5, color: '#f59e0b' },
        ];
        
        resolve({
          success: true,
          data,
          timestamp: new Date().toISOString(),
        });
      }, 250);
    });
  },

  /**
   * Get area chart data
   * @returns {Promise<object>} Area chart data
   */
  getAreaData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          { name: 'Jan', users: 4000, sessions: 2400, pageViews: 8000 },
          { name: 'Feb', users: 3000, sessions: 1398, pageViews: 6000 },
          { name: 'Mar', users: 2000, sessions: 9800, pageViews: 12000 },
          { name: 'Apr', users: 2780, sessions: 3908, pageViews: 9500 },
          { name: 'May', users: 1890, sessions: 4800, pageViews: 7800 },
          { name: 'Jun', users: 2390, sessions: 3800, pageViews: 8900 },
          { name: 'Jul', users: 3490, sessions: 4300, pageViews: 11200 },
        ];
        
        resolve({
          success: true,
          data,
          timestamp: new Date().toISOString(),
        });
      }, 350);
    });
  },
};

/**
 * Notifications API
 */
export const notificationsAPI = {
  /**
   * Get user notifications
   * @returns {Promise<object>} Notifications data
   */
  getNotifications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          {
            id: 1,
            title: 'New Sale',
            message: 'You have a new sale of $299',
            type: 'success',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            read: false,
          },
          {
            id: 2,
            title: 'System Update',
            message: 'Dashboard updated to version 2.1.0',
            type: 'info',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            read: false,
          },
          {
            id: 3,
            title: 'Low Stock Alert',
            message: 'Product inventory is running low',
            type: 'warning',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            read: true,
          },
        ];
        
        resolve({
          success: true,
          data,
          unreadCount: data.filter(n => !n.read).length,
          timestamp: new Date().toISOString(),
        });
      }, 400);
    });
  },

  /**
   * Mark notification as read
   * @param {number} notificationId - Notification ID
   * @returns {Promise<object>} Success response
   */
  markAsRead: async (notificationId) => {
    return apiRequest(`/api/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  },
};

/**
 * User API
 */
export const userAPI = {
  /**
   * Get user profile
   * @returns {Promise<object>} User profile data
   */
  getProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: null,
            role: 'Admin',
            preferences: {
              theme: 'dark',
              notifications: true,
              autoRefresh: true,
            },
          },
          timestamp: new Date().toISOString(),
        });
      }, 200);
    });
  },

  /**
   * Update user preferences
   * @param {object} preferences - User preferences
   * @returns {Promise<object>} Success response
   */
  updatePreferences: async (preferences) => {
    return apiRequest('/api/user/preferences', {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
  },
};

export default {
  statsAPI,
  chartsAPI,
  notificationsAPI,
  userAPI,
};
