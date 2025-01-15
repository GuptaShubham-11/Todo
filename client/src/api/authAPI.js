import axios from "axios";

const registerUser = async (userData) => {
    try {
        const response = await axios.post("/api/v1/users/register", userData);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const loginUser = async (userData) => {
    try {
        const response = await axios.post("/api/v1/users/login", userData);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export {
    registerUser,
    loginUser
};