import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="border-t-4 border-green-400 border-solid w-12 h-12 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
