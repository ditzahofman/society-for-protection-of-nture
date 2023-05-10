import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./AuthMenu.css";
import { Login } from "@mui/icons-material";

function AuthMenu(): JSX.Element {

    const [token, setToken] = useState<string>();

    useEffect(() => {
       const token=sessionStorage.getItem("myToken")
       setToken(token)
    }, []);

    return (
        <div className="AuthMenu">
            {
                !token &&
                <>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </>
            }
            {
               token &&
                <>
                    <span>wellcome</span>               
                    <span> | </span>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
