import axios from "axios";
import iziToast from "izitoast";

const api = axios


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            if(!error?.response.data?.disable) {
                iziToast.show({
                    title: 'Gagal',
                    message: error?.response?.data?.message,
                    color: 'red',
                    titleColor: 'black',
                    messageColor: 'gray',
                    icon: 'fa fa-ban',
                    iconColor: 'black',
                })
            }
        } catch (error) {
            
        }
        return Promise.resolve(error?.response)
    }
)

api.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json';
        config.headers.Authorization = localStorage.getItem('Token') ? 'Bearer ' + localStorage.getItem('Token') : '';
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api