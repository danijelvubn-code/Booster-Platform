# Routes Directory

This directory contains all application routes using TanStack Router's file-based routing system. The folder structure directly maps to URL paths.

## Directory Structure

### `/app` - Authenticated Application Routes
**URL Pattern**: `/app/*`

All routes under the `app/` folder are wrapped in the main application layout (`AppLayout`) via `app/route.tsx`. These pages include:
- Full navigation header with user menu
- Sidebar navigation
- Authentication requirements
- Consistent app chrome and styling

**Examples:**
- `app/overview.tsx` → `/app/overview` - Dashboard overview and inference endpoints
- `app/cosmos.tsx` → `/app/cosmos` - Browse AI models
- `app/account.tsx` → `/app/account` - User account settings

### `/auth` - Authentication & Public Routes
**URL Pattern**: `/auth/*`

Routes under the `auth/` folder are standalone pages without the main app layout. These pages have their own custom layouts and are designed for unauthenticated users or specific authentication flows. (auth for non auth sounds a little bit counterintuitive, but it is a common practise)

**Key Differences:**
- No app navigation or header
- Custom full-page designs (e.g., video backgrounds, centered cards)
- Accessible before user authentication
- Independent layouts per page

**Examples:**
- `auth/set-password.tsx` → `/auth/set-password` - Password creation flow

## Why This Separation?

This architecture separates authenticated app experiences from authentication flows:

1. **Different User Contexts**: `/app` routes assume an authenticated user; `/auth` routes are for users logging in or setting up accounts
2. **Different UX Needs**: App pages need consistent navigation; auth pages need focused, minimal interfaces
3. **Layout Control**: Each folder can have its own layout wrapper (or none) via a `route.tsx` file
4. **Clear Boundaries**: Makes it obvious which routes require authentication vs. which are public