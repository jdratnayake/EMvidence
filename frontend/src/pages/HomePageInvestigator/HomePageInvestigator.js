import React from "react";
import "./HomePageInvestigator.css";
import { useUser } from "../../contexts/UserContext";

function HomePageInvestigator() {
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
      <div>Home Page Investigator</div>
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

export default HomePageInvestigator;
