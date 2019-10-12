import axios from 'axios'
import { API_URL } from "../Constants";

class AuthenticationService {

    async registerNewAccount(email, password) {
        let res = await axios.post(`${API_URL}/register`, {
            email,
            password
        });

        return res;
    }

    async authenticateAccount(email, password) {

        let res = await axios.post(`${API_URL}/login`, {
                email,
                password
            });

        let { status, data } = res;

        if(status === 200) {
            this.setupAxiosConfigure(data);
        }

        return res;
    }

    setupAxiosConfigure(data) {
        const { token, id } = data;
        if (token && id) {
            sessionStorage.setItem('USER_TOKEN', token);
            sessionStorage.setItem('USER_ID', id);
            axios.defaults.headers.common['auth-token'] = sessionStorage.getItem('USER_TOKEN');
            // axios.interceptors.request.use(
            //     (config) => {
            //         if (this.isUserLoggedIn()) {
            //             config.headers['auth-token'] = token
            //         }
            //         return config
            //     }
            // )
        }
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('USER_TOKEN');
        return user !== null;
    }

}

export default new AuthenticationService();