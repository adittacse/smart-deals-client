import React, {useContext} from 'react';
import axios from "axios";
import AuthContext from "../contexts/AuthContext.jsx";

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    // set token in the header for all the api call using axiosSecure hook
    instance.interceptors.request.use((config) => {
        if (user) {
            config.headers.authorization = `Bearer ${user.accessToken}`;
            console.log(config);
            return config;
        }
    });
    return instance;
};

export default useAxiosSecure;