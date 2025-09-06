/**
 * Application constants and configuration
 */

// Application metadata
export const APP_CONFIG = {
  name: 'Dashboard App',
  version: '1.0.0',
  description: 'Modern business intelligence dashboard',
  author: 'Vistara Apps',
  projectId: '29a94b6b-640f-4a9e-a652-a64e1cf56791',
};

// API configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.dashboard.example.com',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// Chart colors and themes
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  gradient: {
    blue: ['#3b82f6', '#1d4ed8'],
    purple: ['#8b5cf6', '#7c3aed'],
    green: ['#10b981', '#059669'],
    orange: ['#f59e0b', '#d97706'],
  },
};

// Dashboard layout configuration
export const LAYOUT_CONFIG = {
  sidebar: {
    width: 280,
    collapsedWidth: 80,
  },
  header: {
    height: 72,
  },
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
    large: 1536,
  },
};

// Data refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  stats: 30000,      // 30 seconds
  charts: 60000,     // 1 minute
  notifications: 15000, // 15 seconds
  realtime: 5000,    // 5 seconds
};

// Chart configuration defaults
export const CHART_DEFAULTS = {
  height: 300,
  margin: { top: 20, right: 30, left: 20, bottom: 5 },
  animation: {
    duration: 750,
    easing: 'ease-in-out',
  },
  grid: {
    stroke: '#374151',
    strokeDasharray: '3 3',
  },
  tooltip: {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    color: '#fff',
  },
};

// Notification types and configurations
export const NOTIFICATION_TYPES = {
  success: {
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    icon: 'CheckCircle',
  },
  error: {
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    icon: 'XCircle',
  },
  warning: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    icon: 'AlertTriangle',
  },
  info: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    icon: 'Info',
  },
};

// Statistics card configurations
export const STATS_CONFIG = {
  icons: {
    revenue: 'DollarSign',
    subscriptions: 'Users',
    sales: 'BarChart3',
    active: 'Activity',
    growth: 'TrendingUp',
    conversion: 'Target',
  },
  colors: {
    revenue: 'bg-blue-500',
    subscriptions: 'bg-green-500',
    sales: 'bg-purple-500',
    active: 'bg-orange-500',
    growth: 'bg-indigo-500',
    conversion: 'bg-pink-500',
  },
};

// Time period options for charts
export const TIME_PERIODS = [
  { value: 'day', label: 'Today', shortLabel: '1D' },
  { value: 'week', label: 'This Week', shortLabel: '7D' },
  { value: 'month', label: 'This Month', shortLabel: '1M' },
  { value: 'quarter', label: 'This Quarter', shortLabel: '3M' },
  { value: 'year', label: 'This Year', shortLabel: '1Y' },
  { value: 'all', label: 'All Time', shortLabel: 'ALL' },
];

// Export options for charts and data
export const EXPORT_OPTIONS = [
  { value: 'png', label: 'PNG Image', icon: 'Image' },
  { value: 'jpg', label: 'JPEG Image', icon: 'Image' },
  { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
  { value: 'csv', label: 'CSV Data', icon: 'Download' },
  { value: 'xlsx', label: 'Excel File', icon: 'FileSpreadsheet' },
];

// User roles and permissions
export const USER_ROLES = {
  admin: {
    label: 'Administrator',
    permissions: ['read', 'write', 'delete', 'manage_users', 'export_data'],
    color: 'text-red-400',
  },
  manager: {
    label: 'Manager',
    permissions: ['read', 'write', 'export_data'],
    color: 'text-blue-400',
  },
  analyst: {
    label: 'Analyst',
    permissions: ['read', 'export_data'],
    color: 'text-green-400',
  },
  viewer: {
    label: 'Viewer',
    permissions: ['read'],
    color: 'text-gray-400',
  },
};

// Theme configuration
export const THEME_CONFIG = {
  dark: {
    name: 'Dark',
    colors: {
      background: '#0f172a',
      surface: '#1e293b',
      surfaceHover: '#334155',
      text: '#f8fafc',
      textSecondary: '#94a3b8',
      border: '#334155',
      accent: '#3b82f6',
    },
  },
  light: {
    name: 'Light',
    colors: {
      background: '#ffffff',
      surface: '#f8fafc',
      surfaceHover: '#f1f5f9',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      accent: '#3b82f6',
    },
  },
};

// Animation configurations
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'dashboard_theme',
  userPreferences: 'dashboard_user_preferences',
  chartSettings: 'dashboard_chart_settings',
  sidebarCollapsed: 'dashboard_sidebar_collapsed',
  lastVisited: 'dashboard_last_visited',
};

// Error messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection and try again.',
  unauthorized: 'You are not authorized to perform this action.',
  forbidden: 'Access denied. You don\'t have permission to view this resource.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  validation: 'Please check your input and try again.',
  timeout: 'Request timed out. Please try again.',
  unknown: 'An unexpected error occurred. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  dataSaved: 'Data saved successfully!',
  settingsUpdated: 'Settings updated successfully!',
  exportCompleted: 'Export completed successfully!',
  notificationRead: 'Notification marked as read.',
  preferencesUpdated: 'Preferences updated successfully!',
};

// Feature flags for development
export const FEATURE_FLAGS = {
  enableRealTimeUpdates: import.meta.env.VITE_ENABLE_REALTIME === 'true',
  enableExport: import.meta.env.VITE_ENABLE_EXPORT !== 'false',
  enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableDarkMode: import.meta.env.VITE_ENABLE_DARK_MODE !== 'false',
  debugMode: import.meta.env.NODE_ENV === 'development',
};

// Performance monitoring thresholds
export const PERFORMANCE_THRESHOLDS = {
  apiResponseTime: 2000, // 2 seconds
  chartRenderTime: 1000, // 1 second
  pageLoadTime: 3000,    // 3 seconds
  memoryUsage: 100,      // 100MB
};

// Default pagination settings
export const PAGINATION_DEFAULTS = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 20, 50, 100],
  showSizeChanger: true,
  showQuickJumper: true,
};

export default {
  APP_CONFIG,
  API_CONFIG,
  CHART_COLORS,
  LAYOUT_CONFIG,
  REFRESH_INTERVALS,
  CHART_DEFAULTS,
  NOTIFICATION_TYPES,
  STATS_CONFIG,
  TIME_PERIODS,
  EXPORT_OPTIONS,
  USER_ROLES,
  THEME_CONFIG,
  ANIMATIONS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
  PERFORMANCE_THRESHOLDS,
  PAGINATION_DEFAULTS,
};
