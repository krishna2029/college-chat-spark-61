# 🎓 EduBot - Educational Chatbot Platform

A modern, responsive educational chatbot platform built with React, TypeScript, and AI integration. Designed for colleges and universities to provide intelligent student support and administrative management.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Authentication System](#-authentication-system)
- [Code Organization](#-code-organization)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Chatbot** - Intelligent conversational interface for student queries
- **Role-Based Authentication** - Student and Admin login systems
- **Real-time Notifications** - College news and announcements for students
- **Responsive Design** - Modern UI that works on all devices
- **Dark/Light Theme** - Seamless theme switching with system preference detection

### 👨‍🎓 Student Features
- Interactive chatbot for academic queries
- Real-time college news and notifications
- Profile management
- Achievement tracking
- Course information access

### 👨‍💼 Admin Features
- Administrative dashboard
- System management tools
- User management
- Content moderation
- Analytics and reporting

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### UI Components
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Primitive components for complex interactions
- **Lucide React** - Beautiful icon library

### State Management
- **React Query** - Server state management and caching
- **Context API** - Authentication and theme state

### Routing & Navigation
- **React Router v6** - Client-side routing
- **Dynamic navigation** - Role-based menu rendering

## 📁 Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── ui/                    # shadcn/ui components
│   ├── Navbar.tsx             # Main navigation component
│   ├── ProfileDropdown.tsx    # User profile menu
│   ├── NotificationModal.tsx  # Notification system
│   └── ThemeToggle.tsx        # Theme switcher
├── contexts/                  # React contexts
│   ├── AuthContext.tsx        # Authentication state
│   └── ThemeContext.tsx       # Theme management
├── hooks/                     # Custom React hooks
│   ├── use-mobile.tsx         # Mobile detection
│   └── use-toast.ts           # Toast notifications
├── pages/                     # Page components
│   ├── Home.tsx               # Landing page
│   ├── Chatbot.tsx            # Main chatbot interface
│   ├── Login.tsx              # Authentication
│   ├── Register.tsx           # User registration
│   ├── Admin.tsx              # Admin dashboard
│   └── NotFound.tsx           # 404 error page
├── lib/                       # Utility functions
│   └── utils.ts               # Helper functions
├── App.tsx                    # Root application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and design tokens
```

### Design System Structure
```
src/index.css                 # Design system tokens
├── CSS Variables              # Color palette, gradients, shadows
├── Component Classes          # Reusable component styles
├── Animation Keyframes        # Custom animations
└── Utility Classes            # Helper classes

tailwind.config.ts            # Tailwind configuration
├── Color System              # HSL-based semantic colors
├── Typography               # Font configuration
├── Spacing & Layout         # Consistent spacing scale
└── Component Variants       # Extended component styles
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 16.0.0 (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 💻 Development

### Development Workflow

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Make your changes**
   - Components are hot-reloaded automatically
   - TypeScript errors are shown in real-time
   - Tailwind classes are processed on-the-fly

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_URL=your_api_endpoint
VITE_APP_NAME=EduBot

# Authentication (if using external auth)
VITE_AUTH_DOMAIN=your_auth_domain
VITE_AUTH_CLIENT_ID=your_client_id
```

## 🔐 Authentication System

### How It Works
The authentication system uses React Context for state management:

```typescript
// User object structure
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}
```

### Authentication Flow
1. **Login/Register** - User selects role (student/admin)
2. **State Management** - User data stored in Context + localStorage
3. **Route Protection** - Components check authentication status
4. **Role-based Features** - UI adapts based on user role

### Adding New User Roles
1. Update the `User` interface in `src/contexts/AuthContext.tsx`
2. Add role-specific navigation in `src/components/Navbar.tsx`
3. Create role-specific pages and add routes in `src/App.tsx`

## 🎨 Code Organization

### Component Patterns

1. **Functional Components with Hooks**
   ```typescript
   export const MyComponent = () => {
     const [state, setState] = useState(initial);
     // Component logic here
     return <div>...</div>;
   };
   ```

2. **Custom Hooks for Logic**
   ```typescript
   export const useCustomLogic = () => {
     // Reusable logic here
     return { data, loading, error };
   };
   ```

3. **TypeScript Interfaces**
   ```typescript
   interface Props {
     title: string;
     onClick: () => void;
   }
   ```

### Styling Guidelines

1. **Use Design System Tokens**
   ```css
   /* ✅ Good */
   background: hsl(var(--primary));
   color: hsl(var(--primary-foreground));
   
   /* ❌ Avoid */
   background: #3b82f6;
   color: white;
   ```

2. **Component Variants**
   ```typescript
   // Use shadcn/ui variants
   <Button variant="primary" size="lg">
   
   // Create custom variants when needed
   const buttonVariants = cva("base-styles", {
     variants: { ... }
   });
   ```

3. **Responsive Design**
   ```typescript
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   ```

### State Management Patterns

1. **Local State** - `useState` for component-specific state
2. **Context** - Authentication, theme, global app state
3. **React Query** - Server state, caching, and synchronization

## 🚀 Deployment

### Option 1: Lovable Platform (Recommended)
1. Open [Lovable Project](https://lovable.dev/projects/581e6387-6818-489b-a91e-355dbc06f13b)
2. Click **Share** → **Publish**
3. Your app is live instantly with SSL and CDN

### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# Or connect your GitHub repo to Netlify
```

### Option 4: Traditional Hosting
```bash
# Build for production
npm run build

# Upload dist/ folder to your web server
```

### Custom Domain Setup
For Lovable projects:
1. Go to **Project** → **Settings** → **Domains**
2. Click **Connect Domain**
3. Follow the DNS configuration steps

Read more: [Custom Domain Guide](https://docs.lovable.dev/tips-tricks/custom-domain)

## 🧩 Adding New Features

### Adding a New Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navbar.tsx` (if needed)

### Adding Authentication-Protected Routes
```typescript
// In App.tsx
<Route path="/protected" element={
  <ProtectedRoute>
    <ProtectedPage />
  </ProtectedRoute>
} />
```

### Adding New UI Components
1. Check if shadcn/ui has the component: `npx shadcn-ui@latest add [component]`
2. Create custom component in `src/components/`
3. Export from `src/components/index.ts` if creating a library

### Adding Animations
```typescript
// Use Framer Motion for complex animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Use CSS classes for simple animations
<div className="hover:scale-105 transition-transform">
```

## 🤝 Contributing

### Code Style
- Use **TypeScript** for all new files
- Follow **ESLint** configuration
- Use **Prettier** for consistent formatting
- Write **meaningful commit messages**

### Pull Request Process
1. Create a feature branch: `git checkout -b feature/new-feature`
2. Make your changes following the code style
3. Test thoroughly in development
4. Update documentation if needed
5. Submit pull request with clear description

### Development Best Practices
- **Component Naming**: Use PascalCase (`MyComponent`)
- **File Naming**: Match component name (`MyComponent.tsx`)
- **Props Interface**: Define clear TypeScript interfaces
- **Error Handling**: Use try-catch and error boundaries
- **Performance**: Use React.memo, useMemo, useCallback when needed

## 📚 Additional Resources

- **Lovable Documentation**: [docs.lovable.dev](https://docs.lovable.dev)
- **React Documentation**: [react.dev](https://react.dev)
- **TypeScript Handbook**: [typescriptlang.org](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/docs)
- **shadcn/ui Components**: [ui.shadcn.com](https://ui.shadcn.com)

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Check for type issues
npm run type-check
```

**Styling Issues**
- Ensure Tailwind classes are properly configured
- Check if custom CSS is conflicting
- Verify design system tokens are being used

**Authentication Issues**
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors
- Verify AuthContext is properly wrapped around components

## 📄 License

This project is part of the Lovable platform. Please refer to Lovable's terms of service for usage rights and restrictions.

---

**Project URL**: https://lovable.dev/projects/581e6387-6818-489b-a91e-355dbc06f13b

Made with ❤️ using [Lovable](https://lovable.dev)