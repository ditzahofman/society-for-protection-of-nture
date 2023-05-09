
import Menu from "../Menu/Menu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<h1>Travel sites </h1>
            <h2 className="H2"> The company for the Nature and Parks Authority</h2>
            <hr/>
            <Menu/>
            <hr/>
        </div>
    );
}

export default Header;
