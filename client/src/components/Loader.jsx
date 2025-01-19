import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="w-12 h-12 border-t-4 border-green-400 border-solid rounded-full animate-spin sm:w-12 sm:h-12">
                {/* Loader Circle */}
            </div>
        </div>
    );
};

export default Loader;
