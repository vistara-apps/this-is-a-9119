# Dashboard API Documentation

## Overview

This document provides comprehensive API documentation for the Dashboard Application. The API follows RESTful principles and returns JSON responses.

**Base URL:** `https://api.dashboard.example.com`  
**Version:** v1  
**Authentication:** Bearer Token (when implemented)

## Table of Contents

1. [Authentication](#authentication)
2. [Statistics API](#statistics-api)
3. [Charts API](#charts-api)
4. [Notifications API](#notifications-api)
5. [User API](#user-api)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Webhooks](#webhooks)

## Authentication

### Bearer Token Authentication
```http
Authorization: Bearer <your-token-here>
```

### API Key Authentication (Alternative)
```http
X-API-Key: <your-api-key-here>
```

## Statistics API

### Get Dashboard Statistics

Retrieve key performance indicators and metrics for the dashboard.

**Endpoint:** `GET /api/stats`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "revenue",
      "title": "Total Revenue",
      "value": "$45,231",
      "change": "+20.1%",
      "changeType": "increase",
      "trend": [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      "color": "bg-blue-500"
    },
    {
      "id": "subscriptions",
      "title": "Subscriptions",
      "value": "2,425",
      "change": "+180.1%",
      "changeType": "increase",
      "trend": [400, 300, 600, 800, 500, 700, 900],
      "color": "bg-green-500"
    }
  ],
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

### Get Real-time Statistics

Get live updates for dashboard statistics.

**Endpoint:** `GET /api/stats/realtime`

**Query Parameters:**
- `interval` (optional): Update interval in seconds (default: 30)
- `metrics` (optional): Comma-separated list of metric IDs to include

**Response:**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "current": 45231,
      "previous": 37692,
      "change": 20.1
    },
    "subscriptions": {
      "current": 2425,
      "previous": 865,
      "change": 180.1
    }
  },
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

## Charts API

### Get Revenue Chart Data

Retrieve revenue and profit data for chart visualization.

**Endpoint:** `GET /api/charts/revenue`

**Query Parameters:**
- `period` (optional): Time period (`day`, `week`, `month`, `quarter`, `year`) - default: `month`
- `start_date` (optional): Start date in ISO format
- `end_date` (optional): End date in ISO format

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Jan",
      "revenue": 4000,
      "profit": 2400,
      "expenses": 1600
    },
    {
      "name": "Feb",
      "revenue": 3000,
      "profit": 1398,
      "expenses": 1602
    }
  ],
  "period": "month",
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

### Get Sales Chart Data

Retrieve sales performance data.

**Endpoint:** `GET /api/charts/sales`

**Query Parameters:**
- `period` (optional): Time period - default: `week`
- `compare` (optional): Include comparison data (`true`/`false`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Mon",
      "sales": 400,
      "target": 500
    },
    {
      "name": "Tue",
      "sales": 300,
      "target": 450
    }
  ],
  "period": "week",
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

### Get Distribution Data

Retrieve data for donut/pie charts showing distribution metrics.

**Endpoint:** `GET /api/charts/distribution`

**Query Parameters:**
- `type` (optional): Distribution type (`device`, `location`, `source`) - default: `device`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Desktop",
      "value": 45,
      "color": "#3b82f6"
    },
    {
      "name": "Mobile",
      "value": 35,
      "color": "#10b981"
    }
  ],
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

### Get Area Chart Data

Retrieve data for area charts showing trends over time.

**Endpoint:** `GET /api/charts/area`

**Query Parameters:**
- `metrics` (optional): Comma-separated metrics (`users`, `sessions`, `pageViews`)
- `period` (optional): Time period - default: `month`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Jan",
      "users": 4000,
      "sessions": 2400,
      "pageViews": 8000
    }
  ],
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

## Notifications API

### Get User Notifications

Retrieve notifications for the authenticated user.

**Endpoint:** `GET /api/notifications`

**Query Parameters:**
- `limit` (optional): Number of notifications to return (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `unread_only` (optional): Return only unread notifications (`true`/`false`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "New Sale",
      "message": "You have a new sale of $299",
      "type": "success",
      "timestamp": "2025-09-06T04:47:56.000Z",
      "read": false
    }
  ],
  "unreadCount": 2,
  "total": 15,
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

### Mark Notification as Read

Mark a specific notification as read.

**Endpoint:** `PATCH /api/notifications/{id}/read`

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read",
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

### Mark All Notifications as Read

Mark all notifications as read for the authenticated user.

**Endpoint:** `PATCH /api/notifications/read-all`

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read",
  "count": 5,
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

## User API

### Get User Profile

Retrieve the authenticated user's profile information.

**Endpoint:** `GET /api/user/profile`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "role": "admin",
    "preferences": {
      "theme": "dark",
      "notifications": true,
      "autoRefresh": true,
      "refreshInterval": 30
    },
    "lastLogin": "2025-09-06T04:52:56.000Z"
  },
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

### Update User Preferences

Update user preferences and settings.

**Endpoint:** `PATCH /api/user/preferences`

**Request Body:**
```json
{
  "theme": "dark",
  "notifications": true,
  "autoRefresh": false,
  "refreshInterval": 60
}
```

**Response:**
```json
{
  "success": true,
  "message": "Preferences updated successfully",
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

## Error Handling

### Error Response Format

All API errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "period",
      "reason": "Invalid time period specified"
    }
  },
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

### Common Error Codes

| Error Code | Description |
|------------|-------------|
| `INVALID_TOKEN` | Authentication token is invalid or expired |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions |
| `VALIDATION_ERROR` | Request validation failed |
| `RESOURCE_NOT_FOUND` | Requested resource doesn't exist |
| `RATE_LIMIT_EXCEEDED` | API rate limit exceeded |
| `INTERNAL_ERROR` | Internal server error |

## Rate Limiting

### Limits

- **Authenticated requests:** 1000 requests per hour
- **Unauthenticated requests:** 100 requests per hour
- **Real-time endpoints:** 60 requests per minute

### Headers

Rate limit information is included in response headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1641024000
```

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "API rate limit exceeded",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "resetTime": "2025-09-06T05:52:56.000Z"
    }
  },
  "timestamp": "2025-09-06T04:52:56.000Z"
}
```

## Webhooks

### Webhook Events

The API supports webhooks for real-time notifications:

| Event | Description |
|-------|-------------|
| `stats.updated` | Dashboard statistics have been updated |
| `notification.created` | New notification created |
| `user.preferences.updated` | User preferences changed |
| `data.export.completed` | Data export process completed |

### Webhook Payload

```json
{
  "event": "stats.updated",
  "data": {
    "userId": 1,
    "changes": ["revenue", "subscriptions"],
    "timestamp": "2025-09-06T04:52:56.000Z"
  },
  "webhook": {
    "id": "wh_123456",
    "timestamp": "2025-09-06T04:52:56.000Z"
  }
}
```

### Webhook Configuration

**Endpoint:** `POST /api/webhooks`

**Request Body:**
```json
{
  "url": "https://your-app.com/webhook",
  "events": ["stats.updated", "notification.created"],
  "secret": "your-webhook-secret"
}
```

## SDK Examples

### JavaScript/Node.js

```javascript
const DashboardAPI = require('@dashboard/api-client');

const client = new DashboardAPI({
  baseURL: 'https://api.dashboard.example.com',
  apiKey: 'your-api-key'
});

// Get statistics
const stats = await client.stats.get();

// Get chart data
const revenueData = await client.charts.getRevenue({
  period: 'month'
});

// Get notifications
const notifications = await client.notifications.get({
  unread_only: true
});
```

### Python

```python
from dashboard_api import DashboardClient

client = DashboardClient(
    base_url='https://api.dashboard.example.com',
    api_key='your-api-key'
)

# Get statistics
stats = client.stats.get()

# Get chart data
revenue_data = client.charts.get_revenue(period='month')

# Get notifications
notifications = client.notifications.get(unread_only=True)
```

### cURL Examples

```bash
# Get statistics
curl -H "X-API-Key: your-api-key" \
     https://api.dashboard.example.com/api/stats

# Get revenue chart data
curl -H "X-API-Key: your-api-key" \
     "https://api.dashboard.example.com/api/charts/revenue?period=month"

# Mark notification as read
curl -X PATCH \
     -H "X-API-Key: your-api-key" \
     https://api.dashboard.example.com/api/notifications/1/read
```

## Support

For API support and questions:
- **Documentation:** [https://docs.dashboard.example.com](https://docs.dashboard.example.com)
- **Support Email:** api-support@dashboard.example.com
- **Status Page:** [https://status.dashboard.example.com](https://status.dashboard.example.com)

---

**Last Updated:** September 2025  
**API Version:** v1.0.0
