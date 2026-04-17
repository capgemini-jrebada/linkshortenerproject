# 🔗 Link Shortener

A modern, full-stack URL shortener built with Next.js 16, TypeScript, and PostgreSQL. Create short, memorable links and track their performance with detailed analytics.

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-cyan)
![Clerk](https://img.shields.io/badge/Clerk-Auth-orange)

## ✨ Features

- **🔐 Secure Authentication**: User authentication powered by Clerk
- **🎨 Modern UI**: Beautiful, responsive design with shadcn/ui components
- **📊 Analytics**: Track click counts and link performance
- **🎯 Custom Slugs**: Create branded short links with custom aliases
- **⚡ Fast Redirects**: Optimized URL redirection with click tracking
- **📱 Responsive Design**: Works seamlessly on all devices
- **🌙 Dark Mode**: Built-in dark theme support
- **🛡️ Type Safety**: Full TypeScript coverage with strict mode
- **🚀 Server-Side Rendering**: Optimized performance with Next.js App Router

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe database operations
- **Neon** - Serverless PostgreSQL platform

### Authentication
- **Clerk** - User authentication and management

### Development Tools
- **ESLint** - Code linting
- **Drizzle Kit** - Database migrations
- **TypeScript** - Type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL** database (or Neon account for cloud database)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkshortenerproject
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/linkshortener

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # Clerk URLs (optional - for production)
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. **Set up the database**

   - **Option A: Local PostgreSQL**
     ```bash
     # Create database
     createdb linkshortener

     # Run migrations
     npx drizzle-kit generate
     npx drizzle-kit migrate
     ```

   - **Option B: Neon (Recommended)**
     1. Create a [Neon](https://neon.tech) account
     2. Create a new project
     3. Copy the connection string to your `.env.local`
     4. Run migrations:
        ```bash
        npx drizzle-kit generate
        npx drizzle-kit migrate
        ```

5. **Configure Clerk**

   1. Create a [Clerk](https://clerk.com) account
   2. Create a new application
   3. Copy the publishable key and secret key to your `.env.local`
   4. Configure sign-in/sign-up URLs in Clerk dashboard

## 🏃 Running the Application

### Development
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

## 📡 API Endpoints

### Links API (`/api/links`)

#### Create Link
```http
POST /api/links
Content-Type: application/json

{
  "targetUrl": "https://example.com",
  "userId": "user_123",
  "customSlug": "my-link" // optional
}
```

#### Update Link
```http
PUT /api/links
Content-Type: application/json

{
  "id": 1,
  "targetUrl": "https://new-example.com",
  "customSlug": "new-slug"
}
```

#### Delete Link
```http
DELETE /api/links
Content-Type: application/json

{
  "id": 1
}
```

### Redirect API (`/[slug]`)

#### Redirect to Target URL
```http
GET /my-custom-slug
```
Automatically redirects to the target URL and increments click count.

## 🏗️ Project Structure

```
linkshortenerproject/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── links/
│   │       └── route.ts         # Links API endpoints
│   ├── [slug]/
│   │   └── route.ts             # URL redirection handler
│   ├── dashboard/
│   │   └── page.tsx             # User dashboard
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── CreateLinkModal.tsx      # Link creation modal
│   ├── EditLinkModal.tsx        # Link editing modal
│   ├── DeleteConfirmationDialog.tsx # Delete confirmation
│   └── LinksList.tsx            # Links display component
├── data/                        # Data access layer
│   └── links.ts                 # Link operations
├── db/                          # Database configuration
│   ├── index.ts                 # Database connection
│   └── schema.ts                # Database schema
├── lib/                         # Utility functions
│   └── utils.ts                 # Helper functions
└── public/                      # Static assets
```

## 🗄️ Database Schema

### Links Table
```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  target_url TEXT NOT NULL,
  user_id TEXT,
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Development Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database operations
npx drizzle-kit generate  # Generate migrations
npx drizzle-kit migrate   # Run migrations
npx drizzle-kit push      # Push schema changes
```

## 🎨 Styling Guidelines

This project follows strict UI component guidelines:

- **All UI elements must use shadcn/ui components**
- **No custom component creation** - use existing shadcn/ui components
- **Consistent theming** with Tailwind CSS v4
- **Dark mode support** built-in
- **Accessibility-first** design with WCAG compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript with strict mode enabled
- Follow ESLint configuration
- Use meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Clerk](https://clerk.com/) - Authentication made easy
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe database operations

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
