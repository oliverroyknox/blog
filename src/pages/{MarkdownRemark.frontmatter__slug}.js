import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";

export default function ArticlePage({ data }) {
    const { markdownRemark } = data;
    const { html } = markdownRemark;

    useEffect(() => {
        const { frontmatter, timeToRead } = markdownRemark;
        const { date } = frontmatter;

        injectTableMetadata();
        injectTagline(date, timeToRead);

        /**
         * Injects dynamic tagline from markdown metadata.
         * @param {string} date
         * @param {number} timeToRead
         */
        function injectTagline(date, timeToRead) {
            const header = document.querySelector("h1");
            const tagline = document.getElementById("tagline");

            if (tagline) {
                tagline.remove();
            }

            header.insertAdjacentHTML("afterend", `<p id="tagline"><strong>${date} - ${timeToRead} ${timeToRead > 1 ? "minutes" : "minute"} read</strong></p>`);
        }

        /**
         * Injects dynamic attributes to table for use in responsive layout.
         */
        function injectTableMetadata() {
            const tables = document.querySelectorAll(".content table");

            tables.forEach(table => {
                const headers = table.getElementsByTagName("th");
                const bodyRows = table.getElementsByTagName("tr");

                for (let i = 0; i < headers.length; i++) {
                    const header = headers.item(i);
                    if (!header) continue;

                    for (let j = 0; j < bodyRows.length; j++) {
                        const bodyRow = bodyRows.item(j);
                        const data = bodyRow.children.item(i);
                        if (!bodyRow || !data) continue;

                        data.setAttribute("data-label", header.textContent);
                    }
                }
            });
        }
    }, [markdownRemark]);

    return (
        <Layout>
            <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </Layout>
    );
}

export const pageQuery = graphql`
    query ($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            timeToRead
            frontmatter {
                slug
                date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`;
