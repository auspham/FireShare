import axios from 'axios'
import { API_URL } from '../Constants'

class AccountService {
    async retrieveInfo() {
        let res = await axios.get(`${API_URL}/user`);
        return res;
    }
}

export default new AccountService();