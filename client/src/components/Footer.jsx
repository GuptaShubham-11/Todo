const Footer = () => {
    return (
        <footer className="p-4 bg-gray-800 dark:bg-gray-900 text-white text-center">
            <div className="flex justify-around item-center space-x-4">
                <a
                    href="https://github.com/GuptaShubham-11/Todo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                    GitHub
                </a>
                <p className="mt-2">© 2025 Todo Created By Shubham 💖</p>
                <a
                    href="https://discord.gg/d2dPhDHN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded"
                >
                    Discord
                </a>
            </div>
        </footer>
    );
};

export default Footer;
