import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import DataList from "../../DataArea/DataList/DataList";
import AddData from "../../DataArea/AddData/AddData";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
            <Route path="/" element={<Navigate to="/home" />}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/travelSite" element={<DataList/>}/>
            <Route path="/addTravelSite" element={<AddData/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
