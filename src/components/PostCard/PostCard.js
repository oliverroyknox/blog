import React from "react";
import { Link } from "gatsby";
import "./PostCard.css";

export default function PostCard(props) {
  return (
    <div className="card" key={props.id}>
      <Link to={props.frontmatter.slug}>
        <h1>{props.frontmatter.title}</h1>
        <p>
          <strong>
            {props.frontmatter.date} - {props.timeToRead}{" "}
            {props.timeToRead > 1 ? "minutes" : "minute"} read
          </strong>
        </p>
      </Link>
    </div>
  );
}
