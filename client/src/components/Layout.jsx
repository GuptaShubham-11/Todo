import { Header, Footer } from './index.js';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Header />
            <main className="flex-grow p-4">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
