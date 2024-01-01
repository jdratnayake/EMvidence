import React from "react";
import "./HomePage.css";
import { useUser } from "../../contexts/UserContext";

function HomePage() {
  const { user, loginUser } = useUser();

  const checkStatus = () => {
    console.log(user);
  };
  const updateStatus = () => {
    loginUser({ name: "Dave" });
  };

  const clearStatus = () => {
    loginUser(null);
  };

  return (
    <div>
      <div>Home Page</div>
      <div>
        <button onClick={checkStatus}>Check Status</button>
      </div>
      <div>
        <button onClick={updateStatus}>Update Status</button>
      </div>
      <div>
        <button onClick={clearStatus}>Clear Status</button>
      </div>
    </div>
  );
}

export default HomePage;
