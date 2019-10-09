import axios from 'axios'
import API_URL from '../Constants'

export default class AccountService {
    retrieveInfo() {
        return axios.get(`${API_URL}/user`);
    }
}