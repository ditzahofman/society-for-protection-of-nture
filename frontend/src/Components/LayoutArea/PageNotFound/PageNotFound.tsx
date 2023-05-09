import { NavLink } from "react-router-dom";
import "./PageNotFound.css";
import NotFound from '../../../Assets/Images/404.jpg';
import { Undo } from "@mui/icons-material";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<div>The page you are looking for does not exist</div>
      <div>404</div>
      <img src={NotFound} alt='not-found' />
      <div>
        <NavLink to="/home" className="Back">Back Home<Undo /></NavLink>
      </div>
        </div>
    );
}

export default PageNotFound;
