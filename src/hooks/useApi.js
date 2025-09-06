/**
 * Custom hooks for API data management
 * Provides loading states, error handling, and data caching
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic API hook for data fetching
 * @param {Function} apiFunction - API function to call
 * @param {Array} dependencies - Dependencies for re-fetching
 * @param {object} options - Hook options
 * @returns {object} { data, loading, error, refetch }
 */
export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const {
    immediate = true,
    onSuccess,
    onError,
    transform,
  } = options;

  const fetchData = useCallback(async (...args) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    try {
      setLoading(true);
      setError(null);

      const response = await apiFunction(...args);
      
      if (response.success) {
        const processedData = transform ? transform(response.data) : response.data;
        setData(processedData);
        onSuccess?.(processedData);
      } else {
        throw new Error(response.error || 'API request failed');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        onError?.(err);
      }
    } finally {
      setLoading(false);
    }
  }, [apiFunction, transform, onSuccess, onError]);

  const refetch = useCallback((...args) => {
    return fetchData(...args);
  }, [fetchData]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for dashboard statistics
 * @returns {object} Statistics data and controls
 */
export const useStats = () => {
  const { statsAPI } = require('../services/api');
  
  return useApi(statsAPI.getStats, [], {
    transform: (data) => {
      // Add computed properties or transformations
      return data.map(stat => ({
        ...stat,
        numericValue: parseFloat(stat.value.replace(/[^0-9.-]+/g, '')),
        changeValue: parseFloat(stat.change.replace(/[^0-9.-]+/g, '')),
      }));
    },
  });
};

/**
 * Hook for chart data with period support
 * @param {Function} chartApiFunction - Chart API function
 * @param {string} period - Time period
 * @returns {object} Chart data and controls
 */
export const useChartData = (chartApiFunction, period = 'month') => {
  return useApi(chartApiFunction, [period], {
    immediate: true,
  });
};

/**
 * Hook for notifications with real-time updates
 * @returns {object} Notifications data and controls
 */
export const useNotifications = () => {
  const { notificationsAPI } = require('../services/api');
  const [unreadCount, setUnreadCount] = useState(0);

  const result = useApi(notificationsAPI.getNotifications, [], {
    onSuccess: (data) => {
      setUnreadCount(data.filter(n => !n.read).length);
    },
  });

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationsAPI.markAsRead(notificationId);
      // Update local state
      if (result.data) {
        const updatedData = result.data.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        );
        setUnreadCount(updatedData.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, [result.data]);

  return {
    ...result,
    unreadCount,
    markAsRead,
  };
};

/**
 * Hook for user profile management
 * @returns {object} User data and controls
 */
export const useUser = () => {
  const { userAPI } = require('../services/api');
  
  const result = useApi(userAPI.getProfile, []);

  const updatePreferences = useCallback(async (preferences) => {
    try {
      await userAPI.updatePreferences(preferences);
      // Refetch user data to get updated preferences
      result.refetch();
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  }, [result]);

  return {
    ...result,
    updatePreferences,
  };
};

/**
 * Hook for periodic data refresh
 * @param {Function} refreshFunction - Function to call for refresh
 * @param {number} interval - Refresh interval in milliseconds
 * @param {boolean} enabled - Whether refresh is enabled
 */
export const usePeriodicRefresh = (refreshFunction, interval = 30000, enabled = true) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (enabled && refreshFunction) {
      intervalRef.current = setInterval(refreshFunction, interval);
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refreshFunction, interval, enabled]);

  const startRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(refreshFunction, interval);
  }, [refreshFunction, interval]);

  const stopRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return {
    startRefresh,
    stopRefresh,
  };
};

/**
 * Hook for local storage state management
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value
 * @returns {Array} [value, setValue]
 */
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [value, setStoredValue];
};

/**
 * Hook for debounced values
 * @param {any} value - Value to debounce
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {any} Debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
