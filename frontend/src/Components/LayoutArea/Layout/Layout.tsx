import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <menu>
                <Routing />
            </menu>
            <footer>

            </footer>
        </div>
    );
}

export default Layout;
