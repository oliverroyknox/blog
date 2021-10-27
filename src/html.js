import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes} lang="en-GB">
            <head>
                <title>Oli's Blog</title>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Oli's blog about web technology and development. Take a look at some of my posts to see if you can find any inspiration for your own projects!"
                />
                <meta name="keywords" content="HTML, CSS, Javascript, Typescript, Node, Web, Develop, Tutorials" />
                <meta name="author" content="Oliver Roy Knox" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                {props.headComponents}
            </head>
            <body {...props.bodyAttributes}>
                <script
                    key="theme"
                    dangerouslySetInnerHTML={{
                        __html: `(function() { 
                try { 
                    const prefersDarkModeQuery = window?.matchMedia("(prefers-color-scheme: dark)");

                    if (prefersDarkModeQuery?.matches) {
                        document.documentElement.classList.add("dark"); 
                    } else {
                        document.documentElement.classList.add("light");
                    }

                    prefersDarkModeQuery.addEventListener("change", e => setTheme(e.matches))

                    function setTheme(prefersDarkMode) {
                        document.documentElement.style.transition = "all 300ms ease";
                        setTimeout(() => {
                            document.documentElement.style.transition = "";
                        }, 500);

                        document.documentElement.classList.remove(prefersDarkMode ? "light" : "dark");
                        document.documentElement.classList.add(prefersDarkMode ? "dark" : "light");
                    }
                } catch (e) {} 
            })();`,
                    }}
                />
                {props.preBodyComponents}
                <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
                {props.postBodyComponents}
            </body>
        </html>
    );
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
};
