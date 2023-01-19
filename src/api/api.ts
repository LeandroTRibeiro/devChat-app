import axios from "axios";

const BASEAPI = 'https://devchat.onrender.com';
// const BASEAPI = 'http://localhost:2000';

export const Api = {
    doLogin: async (email: string, password: string) => {
        const response = await axios.post(`${BASEAPI}/login`, {
            email,
            password
        });
        return response.data;
    },
    recoverPassword: async (email: string) => {
        const response = await axios.post(`${BASEAPI}/recover`, {
            email
        });
        return response.data;
    },
    updatePassword: async (token: string, newPassword: string) => {
        const response = await axios.post(`${BASEAPI}/updatepassword`, {
            token,
            newPassword
        });
        return response.data;
    },
    createUser: async (fData: FormData) => {
        const response = await axios({
            method: 'post',
            url: `${BASEAPI}/register`,
            data: fData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    },
    sendConfirmEmail: async (email: string) => {
        const response = await axios.post(`${BASEAPI}/confirm`, {
            email
        });
        return response.data;
    },
    authenticateUser: async (token: string) => {
        const response = await axios.post(`${BASEAPI}/authenticateacount`, {
            token
        });
        return response.data;
    },
    getUser: async (token: string) => {
        const response = await axios.post(`${BASEAPI}/getuser`, {
            token
        });
        return response.data;
    },
};