---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Guidelines
In this project, data fetching is a critical aspect that must be handled with care to ensure performance, security, and maintainability. Below are the guidelines for fetching data in the Link Shortener project.

## 1. Use Server Components for Data Fetching
ALWAYS use Next.js Server Components to fetch data. NEVER use Client Components to fetch data. This ensures that data fetching is done on the server side, improving performance and security.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data from the database. These functions are designed to be type-safe and optimized for performance. NEVER write raw SQL queries or use third-party libraries for data fetching without consulting the existing helper functions. NEVER fetch data directly in the components. ALWAYS fetch data in the server components and pass it down to client components as props.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions. NEVER use raw SQL queries or other ORMs. ALWAYS ensure that the helper functions are type-safe and follow the established patterns in the project.