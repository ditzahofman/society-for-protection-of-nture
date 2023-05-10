import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import ReCAPTCHA from "react-google-recaptcha"
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Login } from "@mui/icons-material";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();
    const [isBot, setIsBot] = useState<boolean>(true);

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
           alert("Welcome!");
            navigate("/addTravelSite");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    function reCaptchaChecked(value: string): void {
        setIsBot(value?.length === 0);
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(submit)}>
                <h3>Register</h3>
                <TextField className="textFiled" id="outlined-basic" label="firstName" variant="outlined"  {...register("firstName")} />
                <TextField className="textFiled" id="outlined-basic" label="lastName" variant="outlined"  {...register("lastName")} />

                <TextField className="textFiled" type="email" id="outlined-basic" label="email" variant="outlined"  {...register("email")} />
                <TextField className="textFiled" id="outlined-basic" label="password" variant="outlined"  {...register("password")} />

                <div className="ReCaptchaContainer">
                    <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={reCaptchaChecked} />
                </div>

                <Button className="button" disabled={isBot}>Register</Button>


            </form>

        </div>
    );
}

export default Register;