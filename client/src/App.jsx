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
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  )
}

export default App
