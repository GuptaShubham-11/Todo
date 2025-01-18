const handleError = (error) => {
    return {
        success: false,
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Something went wrong",
    };
};

export default handleError;