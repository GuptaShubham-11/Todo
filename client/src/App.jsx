import { Layout } from "./components";
import { Home, Login, Register, Dashboard, NotFound, Todos, FocusMode } from "./pages";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/authSlice.js";

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    // Apply the theme class to the <html> element
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // Restore authentication state from localStorage
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (accessToken && user) {
      dispatch(login({ accessToken, user, refreshToken: null }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="focus-mode" element={isAuthenticated ? <FocusMode /> : <Navigate to="/" />} />
          <Route path="tasks" element={isAuthenticated ? <Todos /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
