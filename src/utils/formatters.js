/**
 * Utility functions for data formatting and display
 */

/**
 * Format currency values
 * @param {number} value - Numeric value
 * @param {string} currency - Currency code (default: USD)
 * @param {string} locale - Locale for formatting (default: en-US)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '$0';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format large numbers with abbreviations (K, M, B)
 * @param {number} value - Numeric value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export const formatNumber = (value, decimals = 1) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1e9) {
    return sign + (absValue / 1e9).toFixed(decimals) + 'B';
  }
  if (absValue >= 1e6) {
    return sign + (absValue / 1e6).toFixed(decimals) + 'M';
  }
  if (absValue >= 1e3) {
    return sign + (absValue / 1e3).toFixed(decimals) + 'K';
  }

  return sign + absValue.toLocaleString();
};

/**
 * Format percentage values
 * @param {number} value - Numeric value (0-100)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%';
  }

  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date and time
 * @param {Date|string} date - Date object or ISO string
 * @param {object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  return dateObj.toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

/**
 * Format file sizes
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format duration in seconds to human readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
export const formatDuration = (seconds) => {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return '0s';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const parts = [];
  
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || typeof text !== 'string') return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeWords = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @param {number} maxInitials - Maximum number of initials
 * @returns {string} Initials
 */
export const getInitials = (name, maxInitials = 2) => {
  if (!name || typeof name !== 'string') return '';
  
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

/**
 * Format phone numbers
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Return original if not a standard format
  return phone;
};

/**
 * Generate color from string (for avatars, etc.)
 * @param {string} str - Input string
 * @returns {string} Hex color code
 */
export const stringToColor = (str) => {
  if (!str || typeof str !== 'string') return '#6b7280';
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 65%, 50%)`;
};

/**
 * Format API response errors
 * @param {Error|string} error - Error object or message
 * @returns {string} User-friendly error message
 */
export const formatError = (error) => {
  if (!error) return 'An unknown error occurred';
  
  if (typeof error === 'string') return error;
  
  if (error.message) {
    // Handle common API error patterns
    if (error.message.includes('fetch')) {
      return 'Network error. Please check your connection.';
    }
    if (error.message.includes('401')) {
      return 'Authentication required. Please log in.';
    }
    if (error.message.includes('403')) {
      return 'Access denied. You don\'t have permission.';
    }
    if (error.message.includes('404')) {
      return 'Resource not found.';
    }
    if (error.message.includes('500')) {
      return 'Server error. Please try again later.';
    }
    
    return error.message;
  }
  
  return 'An unexpected error occurred';
};
