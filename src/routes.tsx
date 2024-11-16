// Import routing components from `react-router-dom`
import { Routes, Route } from 'react-router-dom'; 
// `Routes` is a container for all route definitions.
// `Route` defines individual paths and the components that should render for them.

// Import individual page components (linked to specific routes in the app)
import { Home } from './pages/Home'; // Home page component (e.g., landing page)
import { About } from './pages/About'; // About page component (e.g., company or app information)
import { Contact } from './pages/Contact'; // Contact page component (e.g., contact form or information)
import { Auth } from './pages/Auth'; // Authentication page component (e.g., login or signup)
import { AdminLogin } from './pages/AdminLogin'; // Admin login page component
import { Dashboard } from './pages/Dashboard'; // User dashboard component (e.g., main area after login)
import { Quiz } from './pages/Quiz'; // Quiz component (dynamic quiz content for specific courses)
import { Support } from './pages/Support'; // Support page component (e.g., help center or FAQs)
import { Onboarding } from './pages/Onboarding'; // Onboarding page component (guides or setup steps for new users)
import { AdminDashboard } from './pages/AdminDashboard'; // Admin dashboard component (restricted to admins)

// Import components for protecting routes
import { ProtectedRoute } from './components/ProtectedRoute'; 
// `ProtectedRoute` ensures only authenticated users can access certain routes.
import { AdminRoute } from './components/AdminRoute'; 
// `AdminRoute` ensures only admin users can access certain admin-only routes.

/**
 * `AppRoutes` defines all the routes in the application and maps them to the appropriate components.
 * - Public Routes: Accessible by anyone (e.g., Home, About, Contact, etc.).
 * - Protected Routes: Restricted to authenticated users (e.g., Dashboard, Quiz).
 * - Admin Routes: Restricted to admin users (e.g., AdminDashboard).
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} /> {/* Home page (default route at `/`) */}
      <Route path="/about" element={<About />} /> {/* About page */}
      <Route path="/contact" element={<Contact />} /> {/* Contact page */}
      <Route path="/auth" element={<Auth />} /> {/* Authentication page (e.g., login/signup) */}
      <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin login page */}
      <Route path="/support" element={<Support />} /> {/* Support/help center page */}
      <Route path="/onboarding" element={<Onboarding />} /> {/* Onboarding/setup guide page */}

      {/* Protected User Routes */}
      {/* 
        The `ProtectedRoute` component ensures that only logged-in users can access the enclosed route.
        If the user is not authenticated, `ProtectedRoute` might redirect them to the `/auth` page.
      */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard /> {/* User dashboard, visible only to authenticated users */}
          </ProtectedRoute>
        }
      />
      {/* 
        The `quiz/:courseId` route is dynamic. 
        - The `:courseId` part is a parameter that represents the ID of a specific course.
        - The `ProtectedRoute` ensures only logged-in users can access quizzes.
      */}
      <Route
        path="/quiz/:courseId"
        element={
          <ProtectedRoute>
            <Quiz /> {/* Quiz page, restricted to authenticated users */}
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Routes */}
      {/* 
        The `AdminRoute` ensures only users with admin privileges can access this route.
        It might redirect unauthorized users to the `/admin/login` page.
      */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard /> {/* Admin dashboard, restricted to admin users */}
          </AdminRoute>
        }
      />
    </Routes>
  );
}
