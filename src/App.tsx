// Import necessary libraries and components
import { BrowserRouter } from 'react-router-dom'; // Provides routing functionality to navigate between pages without refreshing the browser
import { useEffect } from 'react'; // React hook for handling side effects (e.g., initializing analytics or subscribing to events)
import { AppRoutes } from './routes'; // The main routing component that defines and renders pages based on the current URL
import { Navbar } from './components/Navbar'; // Global navigation bar displayed on all pages
import { Footer } from './components/Footer'; // Global footer displayed on all pages
import { useAuth } from './stores/auth'; // A custom hook to manage and access the user's authentication state
import { Toaster } from 'react-hot-toast'; // A library to display notifications (e.g., success/error messages) to the user
import { initGA, trackPageView } from './lib/analytics'; // Utility functions to initialize Google Analytics and track page views

/**
 * AppContent is the main functional component of the app.
 * It handles global layout (e.g., Navbar, Footer) and global side effects (e.g., Google Analytics).
 */
function AppContent() {
  // Extracts `isAuthenticated` from the authentication store
  // This variable can be used to conditionally render components based on user login state
  const { isAuthenticated } = useAuth();

  /**
   * First useEffect: Initializes Google Analytics.
   * This runs once when the component is mounted (on the first render).
   */
  useEffect(() => {
    initGA(); // Calls the function to set up Google Analytics
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * Second useEffect: Tracks page views and sets up a MutationObserver for route changes.
   * This runs once when the component is mounted.
   */
  useEffect(() => {
    /**
     * handleRouteChange: Helper function to send the current page's URL to Google Analytics.
     * @param url - The current URL path
     */
    const handleRouteChange = (url: string) => {
      trackPageView(url); // Sends the URL to Google Analytics for tracking
    };

    // Track the initial page view when the app first loads
    handleRouteChange(window.location.pathname);

    /**
     * MutationObserver: Watches for changes in the DOM structure within the #root element.
     * This detects route changes (since Next.js uses client-side routing and doesn't reload the page).
     */
    const observer = new MutationObserver(() => {
      // Triggered whenever there's a change in the DOM tree
      handleRouteChange(window.location.pathname); // Tracks the new URL path
    });

    // Start observing the root element for DOM changes (e.g., page navigation)
    observer.observe(document.querySelector('#root')!, {
      childList: true, // Observes when child elements are added or removed
      subtree: true, // Includes changes in all descendant nodes
    });

    // Cleanup function: Stops observing DOM changes when the component unmounts
    return () => observer.disconnect();
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * JSX returned by AppContent:
   * - A flexbox container with a vertical layout (Navbar at the top, Footer at the bottom).
   * - Dynamically renders page-specific content between the Navbar and Footer based on the current route.
   */
  return (
    <div className="min-h-screen bg-dark text-white font-source-code flex flex-col">
      {/* Global navigation bar */}
      <Navbar />
      {/* Main content area dynamically updated based on the current route */}
      <main className="flex-grow">
        <AppRoutes /> {/* Renders the appropriate page/component based on the URL */}
      </main>
      {/* Global footer */}
      <Footer />
      {/* Toaster for displaying notifications (e.g., success/error messages) */}
      <Toaster
        position="top-right" // Positions notifications at the top-right corner of the screen
        toastOptions={{
          duration: 3000, // Each notification lasts for 3 seconds
          style: {
            background: '#1e1e2d', // Dark background for consistency with the app's theme
            color: '#fff', // White text for readability
            border: '1px solid rgba(0, 243, 255, 0.1)', // Subtle border styling
          },
        }}
      />
    </div>
  );
}

/**
 * App Component: Wraps AppContent in the BrowserRouter.
 * - BrowserRouter provides routing capabilities to the entire app.
 * - This ensures that the app uses client-side navigation without full-page reloads.
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// Export the App component as the default export for use in main.tsx
export default App;
