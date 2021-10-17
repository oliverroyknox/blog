import React, { useState } from "react";
import "./normalize.css";
import "./typography.css";
import "../components/prism-one-light.scss";
import "../components/prism-one-dark.scss";
import "./layout.css";

export default function Layout({children}) {
    const prefersColorScheme = window?.matchMedia("(prefers-color-scheme: dark)");
    const [ theme, setTheme ] = useState(prefersColorScheme?.matches ? "dark" : "light");

    prefersColorScheme?.addEventListener("change", e => setTheme(e.matches ? "dark" : "light"));

    return <div className={theme}>{children}</div>;
}