import { Header, Footer } from './index.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const theme = useSelector((state) => state.theme.theme);

    useEffect(() => {
        // Apply the theme class to the <html> element
        const root = document.documentElement;
        root.classList.remove("light", "dark"); // Remove any existing theme classes
        root.classList.add(theme); // Add the current theme class
    }, [theme]); // Runs whenever the theme changes

    return (
        <div className="flex flex-col min-h-screen bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Header />
            <main className="flex-grow p-4">
                <Outlet /> {/* Dynamically renders child routes */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

