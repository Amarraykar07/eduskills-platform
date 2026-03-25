# EduSkills

A modern educational platform built with React, TypeScript, and Supabase for managing courses, videos, and user authentication.

## Features

- User authentication (Login/Signup)
- Course management and display
- Video player for course content
- Dashboard for users
- Responsive design with Tailwind CSS
- Component library with ShadCN UI

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **UI Components**: Radix UI (via ShadCN)
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: React Query
- **Forms**: React Hook Form
- **Testing**: Vitest

## Project Structure

```
eduskills/
├── components.json          # ShadCN UI configuration
├── index.html               # Main HTML entry point
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig*.json           # TypeScript configurations
├── vite.config.ts           # Vite build tool configuration
├── public/                  # Static assets
│   └── robots.txt
├── src/                     # Source code
│   ├── App.css              # Global app styles
│   ├── App.tsx              # Main app component
│   ├── index.css            # Global styles and Tailwind imports
│   ├── main.tsx             # App entry point
│   ├── vite-env.d.ts        # Vite environment types
│   ├── components/          # Reusable UI components
│   │   ├── CourseCard.tsx   # Course card component
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── NavLink.tsx      # Navigation link component
│   │   └── ui/              # ShadCN UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ... (other UI components)
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx   # Mobile detection hook
│   │   ├── use-toast.ts     # Toast notification hook
│   │   └── useCourses.ts    # Courses data hook
│   ├── integrations/        # Third-party integrations
│   │   └── supabase/        # Supabase client and types
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/                 # Utility libraries
│   │   ├── auth.tsx         # Authentication utilities
│   │   └── utils.ts         # General utilities
│   ├── pages/               # Page components
│   │   ├── CourseDetail.tsx # Course detail page
│   │   ├── Courses.tsx      # Courses listing page
│   │   ├── Dashboard.tsx    # User dashboard
│   │   ├── Home.tsx         # Home page
│   │   ├── Index.tsx        # Index page
│   │   ├── Login.tsx        # Login page
│   │   ├── NotFound.tsx     # 404 page
│   │   ├── Signup.tsx       # Signup page
│   │   └── VideoPlayer.tsx  # Video player page
│   └── test/                # Test files
│       ├── example.test.ts
│       └── setup.ts
└── supabase/                # Supabase configuration
    ├── config.toml          # Supabase project config
    └── migrations/          # Database migrations
        └── 20260325150404_0901cbbe-a636-4a1a-b389-904d42486d32.sql
```

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd eduskills
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Copy `.env.example` to `.env` (if exists) and fill in your Supabase credentials
   - Or configure Supabase client in `src/integrations/supabase/client.ts`

4. **Supabase Setup**:
   - Make sure your Supabase project is running
   - Run migrations if needed:
     ```bash
     npx supabase db push
     ```

### Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:8080`

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Preview production build**:
   ```bash
   npm run preview
   ```

### Testing

- **Run tests**:
  ```bash
  npm test
  ```

- **Run tests in watch mode**:
  ```bash
  npm run test:watch
  ```

### Linting

```bash
npm run lint
```

## Configuration

- **Tailwind CSS**: Customize in `tailwind.config.ts`
- **TypeScript**: Configure in `tsconfig.json` and `tsconfig.app.json`
- **Vite**: Build configuration in `vite.config.ts`
- **ShadCN UI**: Component configuration in `components.json`

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
