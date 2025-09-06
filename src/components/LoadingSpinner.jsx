import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * Loading spinner component with customizable size and message
 * @param {object} props - Component props
 * @param {string} props.size - Size variant (sm, md, lg)
 * @param {string} props.message - Loading message
 * @param {boolean} props.overlay - Whether to show as overlay
 * @param {string} props.className - Additional CSS classes
 */
const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Loading...', 
  overlay = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const spinnerContent = (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} text-blue-500 animate-spin`} />
      {message && (
        <p className={`${textSizeClasses[size]} text-slate-400 font-medium`}>
          {message}
        </p>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          {spinnerContent}
        </div>
      </div>
    )
  }

  return spinnerContent
}

/**
 * Inline loading spinner for buttons and small spaces
 */
export const InlineSpinner = ({ size = 'sm', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin ${className}`} />
  )
}

/**
 * Loading skeleton for cards and content blocks
 */
export const LoadingSkeleton = ({ 
  lines = 3, 
  className = '',
  showAvatar = false,
  showButton = false 
}) => (
  <div className={`animate-pulse ${className}`}>
    {showAvatar && (
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-slate-700 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-slate-700 rounded w-1/3"></div>
        </div>
      </div>
    )}
    
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-slate-700 rounded ${
            index === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
    
    {showButton && (
      <div className="mt-4">
        <div className="h-10 bg-slate-700 rounded w-24"></div>
      </div>
    )}
  </div>
)

/**
 * Loading state for charts
 */
export const ChartLoadingSkeleton = ({ height = 300, className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 bg-slate-700 rounded w-32"></div>
      <div className="h-4 bg-slate-700 rounded w-16"></div>
    </div>
    <div 
      className="bg-slate-700 rounded"
      style={{ height: `${height}px` }}
    ></div>
  </div>
)

export default LoadingSpinner
