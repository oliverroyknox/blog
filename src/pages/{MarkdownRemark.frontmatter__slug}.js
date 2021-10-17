import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function ArticlePage({data}) {
    const { markdownRemark } = data;
    const { html } = markdownRemark;

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