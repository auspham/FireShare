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
        let res;
        try {
            res = await axios.post(`${API_URL}/login`, {
                email,
                password
            });
        } catch (err) {
            console.error(err);
            return;
        }

        let { status, data } = res;

        if(status === 200) {
            this.setupAxiosConfigure(data.token);
        }

        return res;
    }

    setupAxiosConfigure(token) {
        axios.defaults.headers.common['auth-token'] = token;
        localStorage.setItem('USER_TOKEN', token);
    }

}

export default new AuthenticationService();