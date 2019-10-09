import axios from 'axios'
import { API_URL } from "../Constants";

class AuthenticationService {

    async registerNewAccount(username, password) {
        let res = await axios.post(`${API_URL}/register`, {
            username,
            password
        });

        return res;
    }

    async authenticateAccount(username, password) {
        let res = await axios.post(`${API_URL}/login`, {
            username,
            password
        });

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