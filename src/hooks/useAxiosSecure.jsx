import { useContext, useEffect } from 'react';
import axios from "axios";
import AuthContext from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const instance = axios.create({
    baseURL: "https://smart-deals-server-bvmm.onrender.com",
});

const useAxiosSecure = () => {
    const { user, userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // set token in the header for all the api call using axiosSecure hook
    useEffect(() => {
        // request interceptor
        const requestInterceptor = instance.interceptors.request.use((config) => {
            const token = user.accessToken;
            if (token) {
                // firebase access token
                config.headers.authorization = `Bearer ${user.accessToken}`;
                // jwt access token
                // config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
                return config;
            }
        });

        // response interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, err => {
            const status = err.status;
            if (status === 401 || status === 403) {
                // log out the user for bad intention request
                userSignOut()
                    .then(() => {
                        navigate("/login");
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `${error.message}`,
                        });
                    });
            }
        });

        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        }
    }, [user, userSignOut, navigate]);

    return instance;
};

export default useAxiosSecure;