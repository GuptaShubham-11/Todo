import { ThemeToggle } from './index.js';

const Header = () => {
    return (
        <header className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md flex justify-between items-center flex-wrap">
            <h1 className="text-2xl mt-2 sm:text-3xl">Todo</h1>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                {/* Theme Toggle */}
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
