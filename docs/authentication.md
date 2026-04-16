# Authentication Guidelines

## Overview

All authentication in the Link Shortener project is managed exclusively through Clerk. No other authentication methods or libraries should be implemented or used.

## Key Requirements

- **Protected Routes**: The `/dashboard` page must require user authentication. Unauthenticated users should be redirected to sign in.
- **Redirections**: If a logged-in user attempts to access the homepage (`/`), they should be automatically redirected to `/dashboard`.
- **Modal Authentication**: Sign-in and sign-up processes via Clerk must always launch as modals, not as separate pages.

## Implementation Notes

- Use Clerk's React hooks and components for authentication state management.
- Ensure server-side protection for routes where necessary using Clerk's middleware or server-side checks.
- Maintain consistency with the project's TypeScript and Next.js 16 standards.