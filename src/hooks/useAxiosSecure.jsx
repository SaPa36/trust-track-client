import axios from "axios";

const axiosSecure = axios.create({
    baseURL: `http://localhost:5005`, 
    // You can add any default headers or configurations here
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;