import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import "../components/prism-one-light.scss";
import "../components/prism-one-dark.scss";

export default function ArticlePage({data}) {
    const { markdownRemark } = data;
    const { html } = markdownRemark;

    return (
      <Layout>
        <div className="article">
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
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