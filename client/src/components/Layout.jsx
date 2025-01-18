import { Header, Footer, Sidebar } from './index.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const theme = useSelector((state) => state.theme.theme);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Apply theme dynamically
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            {/* Header Section */}
            <Header />

            {/* Main Section */}
            <div className="flex flex-grow">

                {/* Main Content */}
                <main className="flex-grow p-6">
                    <Outlet />
                </main>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Layout;
