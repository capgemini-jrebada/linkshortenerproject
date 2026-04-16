<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Instructions for Link Shortener Project

This document provides comprehensive guidelines for AI agents working on the Link Shortener project. The project is built with modern Next.js 16, TypeScript, and follows specific coding standards and architectural patterns.

## Project Overview

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with shadcn/ui
- **Database**: PostgreSQL with Drizzle ORM (Neon)
- **Authentication**: Clerk
- **Icons**: Lucide React

## Core Principles

1. **Type Safety**: Strict TypeScript usage throughout
2. **Modern React**: Server and client components appropriately
3. **Accessibility**: WCAG compliant components
4. **Performance**: Optimized for speed and bundle size
5. **Maintainability**: Clean, consistent code structure

## Key Technologies

- **Next.js 16**: Latest features with app directory
- **TypeScript**: Strict configuration
- **Tailwind CSS v4**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **Drizzle ORM**: Type-safe database operations
- **Clerk**: Authentication and user management

## File Structure

Follow the established project structure:
- `app/` - Next.js pages and layouts
- `components/` - Reusable React components
- `db/` - Database schemas and connections
- `lib/` - Utility functions
- `docs/` - Project documentation

## Detailed Guidelines

For comprehensive coding standards and best practices, refer to the modular documentation in the `/docs` directory. It is **INCREDIBLY IMPORTANT** to ALWAYS read the relevant individual instructions files within the `/docs` directory BEFORE generating ANY code:

- [Authentication Guidelines](docs/authentication.md)
- [UI Components Guidelines](docs/ui-components.md) 


## Development Workflow

1. **Planning**: Understand requirements and identify affected files
2. **Implementation**: Follow coding standards and project structure
3. **Testing**: Ensure type safety and functionality
4. **Review**: Validate against guidelines before committing

## Important Reminders

- Always use TypeScript with strict mode
- Follow Next.js 16 conventions and breaking changes
- Use shadcn/ui components for consistent UI
- Implement proper error handling and loading states
- Maintain accessibility standards
- Keep code DRY and well-documented

## Getting Started

1. Review this document and linked guidelines
2. Examine existing code for patterns
3. Use the established tools and configurations
4. Follow the development workflow for all changes

For any questions about project standards, refer to the detailed documentation in the `docs/` directory.
