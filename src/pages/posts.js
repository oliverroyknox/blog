import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import PostCard from "../components/PostCard/PostCard";

export default function PostsPage({ data }) {
    const { allMarkdownRemark } = data;
    const { edges } = allMarkdownRemark;

    return (
        <Layout>
            <div className="content">
                <h2>Here's What I've Got!</h2>
                {edges.map(({ node }) => (
                    <PostCard key={node.id} {...node} />
                ))}
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
