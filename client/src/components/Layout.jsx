import { Header, Footer } from './index.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Layout = ({ children }) => {

    const theme = useSelector((state) => state.theme.theme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            root.classList.remove("light");
        } else {
            root.classList.add("light");
            root.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Header />
            <main className="flex-grow p-4">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
