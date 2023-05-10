import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import { Button, TextField } from "@mui/material";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            alert("Welcome Back!");
            navigate("/addTravelSite");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(submit)}>
                <h3>Loggin</h3>
                <TextField className="textFiled" type="email" id="outlined-basic" label="email" variant="outlined"  {...register("email")} />
                <TextField className="textFiled" id="outlined-basic" label="password" variant="outlined"  {...register("password")} />
                <Button className="button" type="submit">login</Button>
            </form>
        </div>
    );
}

export default Login;
