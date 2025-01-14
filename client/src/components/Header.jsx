import { ThemeToggle } from './index.js';

const Header = () => {
    return (
        <header className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md flex justify-between items-center">
            <h1 className='text-2xl mt-2'>Todo</h1>
            <ThemeToggle />
        </header>
    );
};

export default Header;
