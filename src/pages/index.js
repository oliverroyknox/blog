import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import PostCard from "../components/PostCard/PostCard";

export default function IndexPage({ data }) {
  console.log({ data });

  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;

  return (
    <Layout>
      <div className="flex-container">
        <div className="flex-content">
          <div className="hero">
            <h1>Hey, I'm Oli. Welcome to my Blog!</h1>
          </div>
            {edges.map(({ node }) => <PostCard {...node} /> )}
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            slug
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
