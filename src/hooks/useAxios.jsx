import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://smart-deals-server-bvmm.onrender.com",
});

const UseAxios = () => {
    return axiosInstance;
};

export default UseAxios;