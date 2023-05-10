import axios from 'axios';
import appConfig from '../Utils/AppConfig';
import UserModel from "../Models/UserModel";
import CredentialsModel from '../Models/CredentialsModel';
import { useNavigate } from 'react-router-dom';

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        sessionStorage.setItem("myToken",token)
       
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        sessionStorage.setItem("myToken",token)
    }

    public logout(): void {
        sessionStorage.removeItem("myToken")
    }

   

    public async getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(appConfig.usersUrl + id);
        const user = response.data;
        return user;
    }

    public async updateUser(user: UserModel): Promise<void> {
        const response = await axios.patch<UserModel>(appConfig.usersUrl + user.id, user);
        const updatedUser = response.data;
       
    }

}

const authService = new AuthService();

export default authService;