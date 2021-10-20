import React from "react";
import { Link, navigate } from "gatsby";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import MenuToggle from "../MenuToggle/MenuToggle";
import "./Header.css";

export default function Header() {
    const toHome = () => navigate("/");

    return (
        <header>
            <div className="flex-container">
                <div className="flex-content">
                    <h2 className="title" onClick={toHome} aria-hidden={true}>Oliver Knox</h2>
                    <div id="navigation" className="navigation">
                        <Link to="/">Latest</Link>
                        <Link to="/posts">Posts</Link>
                        <Link to="/author">Author</Link>
                    </div>
                    <div className="actions" style={{width: "4rem"}}>
                        <ThemeToggle />
                    </div>
                    <div className="menu">
                        <MenuToggle ignore={["navigation", "menu"]} />
                    </div>
                </div>
            </div>
        </header>
    );
}