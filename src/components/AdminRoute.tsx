// Import necessary libraries
import { Navigate } from 'react-router-dom'; 
// `Navigate` is used to programmatically redirect users to another route.
import { useAuth } from '../stores/auth'; 
// Custom hook to access authentication state (e.g., isAuthenticated, user info).

/**
 * `AdminRoute` ensures that only authenticated users with admin privileges can access certain routes.
 * 
 * @param {React.ReactNode} children - The component(s) to render if the user has admin privileges.
 * @returns The child component(s) if authenticated and an admin, otherwise redirects.
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
  // Destructure `isAuthenticated` and `user` from the `useAuth` hook
  const { isAuthenticated, user } = useAuth();

  // If the user is not authenticated, redirect them to the `/auth` page (e.g., login/signup page)
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If the user is authenticated but does not have the admin role, redirect to the user dashboard
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
    // This ensures that users without admin privileges are redirected to their main dashboard.
  }

  // If the user is authenticated and has the admin role, render the child components
  return <>{children}</>;
}
