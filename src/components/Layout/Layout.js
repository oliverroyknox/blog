import React from "react";
import Header from "../Header/Header";
import "./utilities/typography.css";
import "./utilities/prism-one-light.scss";
import "./utilities/prism-one-dark.scss";
import "./Layout.css";

export default function Layout({children}) {
    return [
        <Header key="header"/>,
        <main key="main">{children}</main>
    ];
}