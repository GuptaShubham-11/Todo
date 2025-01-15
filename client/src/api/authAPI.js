import axios from "axios";

const registerUser = async (userData) => {
    try {
        const response = await axios.post("/api/v1/users/register", userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export {
    registerUser
};