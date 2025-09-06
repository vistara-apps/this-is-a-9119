# Testing Guide

## Overview

This document outlines the testing strategy and implementation for the Dashboard Application. We use a comprehensive testing approach including unit tests, integration tests, and end-to-end tests.

## Testing Stack

- **Jest** - JavaScript testing framework
- **React Testing Library** - React component testing utilities
- **MSW (Mock Service Worker)** - API mocking for tests
- **Cypress** - End-to-end testing framework
- **Testing Library User Event** - User interaction simulation

## Test Structure

```
tests/
├── __mocks__/           # Mock implementations
├── fixtures/            # Test data fixtures
├── helpers/             # Test utility functions
├── integration/         # Integration tests
├── unit/               # Unit tests
│   ├── components/     # Component tests
│   ├── hooks/          # Custom hook tests
│   ├── services/       # Service layer tests
│   └── utils/          # Utility function tests
└── e2e/                # End-to-end tests
```

## Running Tests

### All Tests
```bash
npm test
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

### Watch Mode (Development)
```bash
npm run test:watch
```

## Unit Testing

### Component Testing Example

```javascript
// tests/unit/components/StatsCard.test.jsx
import { render, screen } from '@testing-library/react'
import { DollarSign } from 'lucide-react'
import StatsCard from '../../../src/components/StatsCard'

describe('StatsCard', () => {
  const defaultProps = {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    changeType: 'increase',
    icon: DollarSign,
    color: 'bg-blue-500'
  }

  it('renders stats card with correct data', () => {
    render(<StatsCard {...defaultProps} />)
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('$45,231')).toBeInTheDocument()
    expect(screen.getByText('+20.1%')).toBeInTheDocument()
  })

  it('shows increase trend correctly', () => {
    render(<StatsCard {...defaultProps} />)
    
    const changeElement = screen.getByText('+20.1%')
    expect(changeElement).toHaveClass('text-green-400')
  })

  it('shows decrease trend correctly', () => {
    const props = {
      ...defaultProps,
      change: '-5.2%',
      changeType: 'decrease'
    }
    
    render(<StatsCard {...props} />)
    
    const changeElement = screen.getByText('-5.2%')
    expect(changeElement).toHaveClass('text-red-400')
  })
})
```

### Hook Testing Example

```javascript
// tests/unit/hooks/useApi.test.js
import { renderHook, waitFor } from '@testing-library/react'
import { useApi } from '../../../src/hooks/useApi'

describe('useApi', () => {
  const mockApiFunction = jest.fn()

  beforeEach(() => {
    mockApiFunction.mockClear()
  })

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' }
    mockApiFunction.mockResolvedValue({
      success: true,
      data: mockData
    })

    const { result } = renderHook(() => 
      useApi(mockApiFunction, [], { immediate: true })
    )

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
  })

  it('should handle API errors', async () => {
    const errorMessage = 'API Error'
    mockApiFunction.mockResolvedValue({
      success: false,
      error: errorMessage
    })

    const { result } = renderHook(() => 
      useApi(mockApiFunction, [], { immediate: true })
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBe(errorMessage)
  })
})
```

### Service Testing Example

```javascript
// tests/unit/services/api.test.js
import { statsAPI } from '../../../src/services/api'

// Mock fetch globally
global.fetch = jest.fn()

describe('statsAPI', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('getStats', () => {
    it('should return stats data', async () => {
      const mockStats = [
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: '$45,231',
          change: '+20.1%',
          changeType: 'increase'
        }
      ]

      const result = await statsAPI.getStats()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          value: expect.any(String),
          change: expect.any(String),
          changeType: expect.any(String)
        })
      ]))
    })
  })
})
```

## Integration Testing

### Dashboard Integration Test

```javascript
// tests/integration/Dashboard.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Dashboard from '../../src/components/Dashboard'

// Mock API server
const server = setupServer(
  rest.get('/api/stats', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: [
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: '$45,231',
          change: '+20.1%',
          changeType: 'increase',
          color: 'bg-blue-500'
        }
      ]
    }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Dashboard Integration', () => {
  it('loads and displays dashboard data', async () => {
    render(<Dashboard />)

    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    })

    expect(screen.getByText('$45,231')).toBeInTheDocument()
    expect(screen.getByText('+20.1%')).toBeInTheDocument()
  })

  it('handles refresh functionality', async () => {
    const user = userEvent.setup()
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    })

    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    await user.click(refreshButton)

    // Verify refresh animation
    expect(refreshButton).toBeDisabled()
  })
})
```

## End-to-End Testing

### Cypress Configuration

```javascript
// cypress.config.js
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'tests/e2e/support/e2e.js',
    specPattern: 'tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
  },
})
```

### E2E Test Example

```javascript
// tests/e2e/dashboard.cy.js
describe('Dashboard E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays dashboard with all components', () => {
    // Check header
    cy.get('[data-testid="header"]').should('be.visible')
    cy.get('[data-testid="logo"]').should('contain', 'Dashboard')

    // Check stats cards
    cy.get('[data-testid="stats-grid"]').should('be.visible')
    cy.get('[data-testid="stats-card"]').should('have.length', 4)

    // Check charts
    cy.get('[data-testid="charts-grid"]').should('be.visible')
    cy.get('[data-testid="line-chart"]').should('be.visible')
    cy.get('[data-testid="bar-chart"]').should('be.visible')
    cy.get('[data-testid="donut-chart"]').should('be.visible')
    cy.get('[data-testid="area-chart"]').should('be.visible')
  })

  it('handles search functionality', () => {
    cy.get('[data-testid="search-input"]').type('revenue')
    cy.get('[data-testid="search-results"]').should('be.visible')
  })

  it('handles responsive design', () => {
    // Test mobile view
    cy.viewport('iphone-x')
    cy.get('[data-testid="mobile-menu"]').should('be.visible')
    
    // Test tablet view
    cy.viewport('ipad-2')
    cy.get('[data-testid="stats-grid"]').should('be.visible')
    
    // Test desktop view
    cy.viewport(1280, 720)
    cy.get('[data-testid="desktop-layout"]').should('be.visible')
  })

  it('handles error states gracefully', () => {
    // Mock API error
    cy.intercept('GET', '/api/stats', { statusCode: 500 }).as('getStatsError')
    
    cy.reload()
    cy.wait('@getStatsError')
    
    cy.get('[data-testid="error-message"]').should('be.visible')
    cy.get('[data-testid="retry-button"]').should('be.visible')
  })
})
```

## Test Data and Fixtures

### Mock Data

```javascript
// tests/fixtures/mockData.js
export const mockStats = [
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
  }
]

export const mockChartData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 }
]

export const mockNotifications = [
  {
    id: 1,
    title: 'New Sale',
    message: 'You have a new sale of $299',
    type: 'success',
    timestamp: '2025-09-06T04:47:56.000Z',
    read: false
  }
]
```

### MSW Handlers

```javascript
// tests/__mocks__/handlers.js
import { rest } from 'msw'
import { mockStats, mockChartData, mockNotifications } from '../fixtures/mockData'

export const handlers = [
  rest.get('/api/stats', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: mockStats,
        timestamp: new Date().toISOString()
      })
    )
  }),

  rest.get('/api/charts/revenue', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: mockChartData,
        timestamp: new Date().toISOString()
      })
    )
  }),

  rest.get('/api/notifications', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: mockNotifications,
        unreadCount: 1,
        timestamp: new Date().toISOString()
      })
    )
  })
]
```

## Test Utilities

### Custom Render Function

```javascript
// tests/helpers/test-utils.jsx
import React from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export function renderWithProviders(ui, options = {}) {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { renderWithProviders as render }
```

## Performance Testing

### Lighthouse CI Configuration

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

## Accessibility Testing

### Jest-Axe Configuration

```javascript
// tests/helpers/axe-config.js
import { configureAxe } from 'jest-axe'

export const axe = configureAxe({
  rules: {
    // Disable color contrast checking for now
    'color-contrast': { enabled: false },
  },
})
```

### Accessibility Test Example

```javascript
// tests/unit/components/Dashboard.a11y.test.jsx
import { render } from '@testing-library/react'
import { axe } from '../../helpers/axe-config'
import Dashboard from '../../../src/components/Dashboard'

describe('Dashboard Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Dashboard />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Test Coverage Goals

### Coverage Thresholds

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/components/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    './src/hooks/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './src/services/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
}
```

## Continuous Integration

### GitHub Actions Test Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:unit -- --coverage
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
    
    - name: Run E2E tests
      run: npm run test:e2e:ci
    
    - name: Run Lighthouse CI
      run: npm run lighthouse:ci
```

## Best Practices

### Testing Guidelines

1. **Write tests first** - Follow TDD when possible
2. **Test behavior, not implementation** - Focus on what the component does
3. **Use descriptive test names** - Make it clear what is being tested
4. **Keep tests isolated** - Each test should be independent
5. **Mock external dependencies** - Use MSW for API calls
6. **Test edge cases** - Include error states and boundary conditions
7. **Maintain test data** - Keep fixtures up to date
8. **Review test coverage** - Aim for high coverage but focus on quality

### Common Patterns

```javascript
// Good: Testing behavior
it('shows error message when API fails', async () => {
  server.use(
    rest.get('/api/stats', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )
  
  render(<Dashboard />)
  
  await waitFor(() => {
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
  })
})

// Bad: Testing implementation details
it('calls useState with initial state', () => {
  const spy = jest.spyOn(React, 'useState')
  render(<Dashboard />)
  expect(spy).toHaveBeenCalledWith(null)
})
```

---

**Last Updated:** September 2025  
**Testing Framework Version:** Jest 29.x, React Testing Library 13.x
