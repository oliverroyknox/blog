import React from "react";
import "./theme-toggle.css";

export default function ThemeToggle() {
    const toggle = (e) => { 
        e.stopPropagation();

        document.getElementById("satellite").classList.toggle("on");

        const rootClassList = document.documentElement.classList;

        rootClassList.toggle("light");
        rootClassList.toggle("dark");

        rootClassList.add("transition");
        setTimeout(() => rootClassList.remove("transition"), 301);
    }

    return (
        <span id="satellite" className="satellite" onClick={toggle} onKeyDown={toggle} role="button" tabIndex={0}>
            <span className="ray" />
            <span className="ray" />
            <span className="ray" />
            <span className="ray" />
            <span className="ray" />
            <span className="ray" />
            <span className="cutout" />            
        </span>
    )
}