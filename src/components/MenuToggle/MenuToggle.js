import React from "react";
import "./MenuToggle.css";

export default function MenuToggle({ ignore }) {
    if (!ignore) ignore = [];
    ignore.push("hamburger", "line");

    const toggle = () => {
        const navigation = document.getElementById("navigation");
        const hamburger = document.getElementById("hamburger");

        const isOn = navigation.classList.toggle("menu");
        hamburger.classList.toggle("menu", isOn);

        if (isOn) addHandles();
        else removeHandles();

        function closeHandle(e) {
            const classArray = Array.from(e.target.classList ?? []);
            if (ignore.includes(e.target.id) || classArray?.some(s => ignore.includes(s))) return;

            navigation.classList.remove("menu");
            hamburger.classList.remove("menu");

            removeHandles();
        }

        function addHandles() {
            document.addEventListener("click", closeHandle);
            document.addEventListener("scroll", closeHandle);
            window.addEventListener("resize", closeHandle);
        }

        function removeHandles() {
            document.removeEventListener("click", closeHandle);
            document.removeEventListener("scroll", closeHandle);
            window.removeEventListener("resize", closeHandle);
        }
    };

    return (
        <span id="hamburger" className="hamburger" onClick={toggle} onKeyDown={toggle} role="button" tabIndex={-1}>
            <span className="line" />
            <span className="line" />
            <span className="line" />
            <span className="line" />
        </span>
    );
}
