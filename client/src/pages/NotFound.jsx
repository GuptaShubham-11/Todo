const NotFound = () => {
    return (
        <div className="mt-24 flex flex-col items-center justify-center bg-transparent text-center">
            <h1 className="text-6xl font-extrabold text-primary dark:text-primary-dark mb-4">
                404
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Page Not Found
            </h2>
            <p className="text-lg mb-6 max-w-md text-gray-600 dark:text-gray-400">
                Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
            </p>
            <a
                href="/"
                className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-opacity-90 dark:bg-primary-dark"
            >
                Back to Home
            </a>
        </div>
    );
};

export default NotFound;
