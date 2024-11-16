// Import necessary libraries and components
import { StrictMode } from 'react'; // A React wrapper to highlight potential issues in the app during development
import { createRoot } from 'react-dom/client'; // React 18+ method to create and render the app's root component into the DOM
import App from './App.tsx'; // The main App component that serves as the entry point for the entire application
import './index.css'; // Global CSS styles for the app, applied across all components

// Initialize i18n for internationalization and localization support
import './i18n'; // This file likely sets up translations for multiple languages, enabling the app to support different locales

/**
 * The `createRoot` function initializes the React application.
 * - It attaches the React app to the DOM element with the ID 'root'.
 * - This is the entry point of the app where the rendering process begins.
 */
createRoot(document.getElementById('root')!).render(
  // StrictMode is a development-only tool for detecting common issues
  // such as deprecated lifecycle methods or unsafe state handling
  <StrictMode>
    {/* The main App component wraps all app functionality and renders its contents */}
    <App />
  </StrictMode>
);
