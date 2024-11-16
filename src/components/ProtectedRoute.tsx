// Import necessary libraries
import { Navigate } from 'react-router-dom'; 
// `Navigate` is used to programmatically redirect users to another route.
import { useAuth } from '../stores/auth'; 
// Custom hook to access authentication state (e.g., isAuthenticated, user info).

/**
 * `ProtectedRoute` ensures that only authenticated users can access certain routes.
 * 
 * @param {React.ReactNode} children - The component(s) to render if the user is authenticated.
 * @returns The child component(s) if authenticated, otherwise redirects to the `/auth` page.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Destructure `isAuthenticated` from the `useAuth` hook to check if the user is logged in
  const { isAuthenticated } = useAuth();

  // If the user is not authenticated, redirect them to the `/auth` page (e.g., login/signup page)
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
    // The `replace` prop ensures that the redirect does not leave a history entry,
    // so the user cannot "go back" to the protected page using the browser's back button.
  }

  // If the user is authenticated, render the child components (the protected content)
  return <>{children}</>;
}
