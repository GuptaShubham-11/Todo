const handleResponse = (response) => {
    return {
        success: true,
        data: response.data
    };
}

export default handleResponse;