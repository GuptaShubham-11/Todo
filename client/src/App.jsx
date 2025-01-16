import { Layout } from "./components";
import { Home, Login, Register, NotFound } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.theme);

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
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback for undefined routes */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
