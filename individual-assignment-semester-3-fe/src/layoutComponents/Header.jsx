import React from "react";
import { Link } from "react-router-dom";
import './style/Header.css'

function Header() {
    return (
        <div className="Header">
            <h2>Gamehub</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/forum">Forum</Link>
                    </li>
                    <li>
                        <Link to="/games">Games</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;