import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet // Import Outlet
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import SavedMenusPage from './pages/SavedMenusPage';
import './index.css'; // Ensure Tailwind styles are globally available

// ProtectedRoute component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Here you might want to add token validation logic with the backend in a real app
      // For MVP, just checking existence is fine.
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Or a spinner component
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route 
          path="/" 
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
        >
          {/* Nested routes for HomePage and other protected pages can go here */}
          <Route index element={<HomePage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="saved-menus" element={<SavedMenusPage />} />
          {/* Example: <Route path="profile" element={<ProfilePage />} /> */}
        </Route>
        {/* Fallback route for any other path */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/auth"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
