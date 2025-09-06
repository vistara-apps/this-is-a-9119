import React from 'react'
import { AlertTriangle, RefreshCw, X, Info, AlertCircle, XCircle } from 'lucide-react'

/**
 * Error message component with retry functionality
 * @param {object} props - Component props
 * @param {string} props.message - Error message
 * @param {string} props.title - Error title
 * @param {Function} props.onRetry - Retry callback function
 * @param {Function} props.onDismiss - Dismiss callback function
 * @param {string} props.type - Error type (error, warning, info)
 * @param {boolean} props.showIcon - Whether to show icon
 * @param {string} props.className - Additional CSS classes
 */
const ErrorMessage = ({
  message,
  title = 'Error',
  onRetry,
  onDismiss,
  type = 'error',
  showIcon = true,
  className = ''
}) => {
  const typeConfig = {
    error: {
      icon: XCircle,
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      textColor: 'text-red-400',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      textColor: 'text-yellow-400',
      iconColor: 'text-yellow-500'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      textColor: 'text-blue-400',
      iconColor: 'text-blue-500'
    }
  }

  const config = typeConfig[type] || typeConfig.error
  const IconComponent = config.icon

  return (
    <div className={`
      ${config.bgColor} 
      ${config.borderColor} 
      border rounded-lg p-4 
      ${className}
    `}>
      <div className="flex items-start space-x-3">
        {showIcon && (
          <IconComponent className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-medium ${config.textColor} mb-1`}>
            {title}
          </h3>
          <p className="text-sm text-slate-300">
            {message}
          </p>
          
          {onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className={`
                  inline-flex items-center space-x-2 px-3 py-1.5 
                  text-sm font-medium rounded-md
                  ${config.textColor} hover:bg-white/5
                  transition-colors duration-200
                `}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Inline error message for forms and inputs
 */
export const InlineError = ({ message, className = '' }) => {
  if (!message) return null
  
  return (
    <div className={`flex items-center space-x-1 text-red-400 text-sm mt-1 ${className}`}>
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}

/**
 * Error boundary fallback component
 */
export const ErrorFallback = ({ error, resetError }) => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <ErrorMessage
        title="Something went wrong"
        message={error?.message || 'An unexpected error occurred'}
        onRetry={resetError}
        type="error"
        className="mb-4"
      />
      
      <div className="text-center">
        <p className="text-slate-400 text-sm mb-4">
          If this problem persists, please contact support.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  </div>
)

/**
 * Network error component with specific messaging
 */
export const NetworkError = ({ onRetry, className = '' }) => (
  <ErrorMessage
    title="Connection Problem"
    message="Unable to connect to the server. Please check your internet connection and try again."
    onRetry={onRetry}
    type="warning"
    className={className}
  />
)

/**
 * Not found error component
 */
export const NotFoundError = ({ resource = 'page', className = '' }) => (
  <ErrorMessage
    title="Not Found"
    message={`The ${resource} you're looking for doesn't exist or has been moved.`}
    type="info"
    className={className}
  />
)

/**
 * Permission error component
 */
export const PermissionError = ({ className = '' }) => (
  <ErrorMessage
    title="Access Denied"
    message="You don't have permission to view this content. Please contact your administrator if you believe this is an error."
    type="warning"
    className={className}
  />
)

export default ErrorMessage
