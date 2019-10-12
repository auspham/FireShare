import axios from 'axios'
import { API_URL } from '../Constants'

let config;

class AccountService {

    async retrieveInfo() {
        config = { headers: {'auth-token': sessionStorage.getItem('USER_TOKEN')}};
        console.log(config, sessionStorage);
        let res = await axios.get(`${API_URL}/user`, config);
        return res;
    }

    async getAllUser() {
        let res = await axios.get(`${API_URL}/user/all`, config);
        return res;
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('owner', sessionStorage.getItem('USER_ID'));

        let res = await axios.post(`${API_URL}/user/upload`, formData, {
            'auth-token': sessionStorage.getItem('USER_TOKEN'),
            'content-type': 'multipart/form-data',
        });
        return res;
    }

    async shareFile(fileId, userList) {
        let res = await axios.patch(`${API_URL}/user/share/${fileId}`, userList, config);
        return res;
    }

    async updateFile(fileId, fileName) {
        console.log('fileName', fileName);
        let res = await axios.patch(`${API_URL}/user/update/${fileId}`, {name: fileName}, config);
        return res;
    }

    async retrieveSharedUser(fileId) {
        let res = await axios.get(`${API_URL}/user/share/${fileId}`, config);
        return res;
    }

    async deleteFile(fileId) {
        let res = await axios.delete(`${API_URL}/user/delete/${fileId}`, config);
        return res;
    }
}

export default new AccountService();