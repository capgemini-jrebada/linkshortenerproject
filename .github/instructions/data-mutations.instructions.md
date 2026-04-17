---
description: Read this before implementing data mutations or server actions in the project.
---

# Data Mutations Guidelines

All data mutations in this app must be performed via server actions. Server actions must be called from client components.

## Server Action Requirements

- Server action files **MUST** be named `actions.ts` and co-located in the directory of the component that calls the server action.
- All data passed to server actions must use appropriate TypeScript types (do **NOT** use the `FormData` TypeScript type).
- All data **MUST** be validated in server actions using Zod.
- All server actions **MUST** first check for a logged-in user before proceeding with database operations.
- Server actions should **NOT** throw any errors; instead, return an object with an `error` or `success` property.

## Database Operations

Database operations **MUST** be performed via helper functions that wrap Drizzle queries. These helper functions are located in the `/data` directory. Server actions should **NOT** directly use Drizzle queries within them.