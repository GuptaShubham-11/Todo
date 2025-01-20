import { ThemeToggle } from './index.js';
import NewTodoLogo from '../assets/NewTodoLogo.png';

const Header = () => {
    return (
        <header className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md flex justify-between items-center flex-wrap">
            <img src={NewTodoLogo} alt="Logo" className="h-14 w-auto sm:h-12" />
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                {/* Theme Toggle */}
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
