import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar(){

    return (

        <nav className="navbar">


            <h2>
                Biblioteca
            </h2>


            <div>


                <Link to="/">
                    Home
                </Link>


                <Link to="/livros">
                    Livros
                </Link>


            </div>


        </nav>

    );

}


export default Navbar;