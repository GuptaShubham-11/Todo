import { Layout } from "./components";
import { Home, Login, Register, Dashboard, NotFound, Profile, Todos } from "./pages";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Apply the theme class to the <html> element
    const root = document.documentElement;
    root.classList.remove("light", "dark"); // Remove any existing theme classes
    root.classList.add(theme); // Add the current theme class
  }, [theme]); // Runs whenever the theme changes

  return (
    <Router>
      <Routes>
        {/* Layout wraps all routes */}
        <Route path="/" element={<Layout />}>
          {/* Home page accessible to unauthenticated users */}
          <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />} />

          {/* Login and Register routes for unauthenticated users */}
          <Route
            path="login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* Dashboard page accessible only to authenticated users */}
          <Route
            path="dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />

          <Route
            path="profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="tasks"
            element={isAuthenticated ? <Todos /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<NotFound />} /> {/* Fallback for undefined routes */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
