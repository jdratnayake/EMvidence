import React from "react";
import { Link } from "react-router-dom";
import img from "../../resources/error.svg";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="errorPage">
      <div>
        <img src={img} className="errorImg" alt="not found" />
        <h3 className="errorTopic">Oh! Page not found</h3>
        <p className="errorDescription">
          {" "}
          We can't seem to find page you're looking for
        </p>
        <Link to="/" className="errorTag">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
