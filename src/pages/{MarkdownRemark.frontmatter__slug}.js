import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function ArticlePage({data}) {
    const { markdownRemark } = data;
    const { html } = markdownRemark;

    useEffect(() => { injectTableMetadata() }, []);

    /**
     * Injects metadata to markdown generated tables for use in responsive layout.
     */
    function injectTableMetadata() {
      const tables = document.querySelectorAll(".flex-content table");

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

    return (
      <Layout>
        <div className="flex-container">
          <div className="flex-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Layout>
    )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
      }
    }
  }
`