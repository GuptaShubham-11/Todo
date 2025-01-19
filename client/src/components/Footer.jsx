const Footer = () => {
    return (
        <footer className="p-4 bg-gray-800 dark:bg-gray-900 text-white text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {/* GitHub Link */}
                <a
                    href="https://github.com/GuptaShubham-11/Todo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                    GitHub
                </a>

                {/* Copyright Text */}
                <p className="text-sm sm:text-base mt-2 sm:mt-0">
                    © 2025 Todo Created By Shubham 💖
                </p>

                {/* Discord Link */}
                <a
                    href="https://discord.gg/d2dPhDHN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Discord
                </a>
            </div>
        </footer>
    );
};

export default Footer;
