import axios from 'axios'
import { API_URL } from '../Constants'

class AccountService {

    async retrieveInfo() {
        let res = await axios.get(`${API_URL}/user`);
        return res;
    }

    async uploadFile(file) {
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('owner', sessionStorage.getItem('USER_ID'));

        let res = await axios.post(`${API_URL}/user/upload`, formData, {
            'content-type': 'multipart/form-data'
        });
        return res;
    }

}

export default new AccountService();