import React from "react";
import Layout from "../components/Layout/Layout";
import profile from "../images/profile.jpeg";

export default function AuthorPage() {
  return (
    <Layout>
      <div className="flex-container">
        <div className="flex-content">
          <div className="grid">
            <div className="hero">
              <h2>
                I'm Oliver Knox, a software engineer who loves web technology
              </h2>
            </div>
            <div className="avatar-wrapper">
              <div className="avatar">
                <img src={profile} alt="Profile Picture" />
              </div>
            </div>
            <br/>
            <table>
              <thead>
                <tr>
                  <th data-label="Github">Github</th>
                  <th data-label="Website">Website</th>
                  <th data-label="Twitter">Twitter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Github"><a href="https://www.github.com/oliverroyknox">@oliverroyknox</a></td>
                  <td data-label="Website"><a href="https://www.oliverroyknox.com">www.oliverroyknox.com</a></td>
                  <td data-label="Twitter"><a href="https://www.twitter.com/oliverroyknox">@oliverroyknox</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
