import React from "react";
import "./normalize.css";
import "./typography.css";
import "./theme.css";
import "../components/prism-one-light.scss";
import "../components/prism-one-dark.scss";
import "./layout.css";
import Header from "./Header";

export default function Layout({children}) {
    return [
        <Header key="header"/>,
        <main key="main">{children}</main>
    ];
}