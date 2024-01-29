import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useUser } from "../../contexts/UserContext";
import "./HomePage.css";

function HomePage() {
  const { user, loginUser } = useUser();
  const client = useQueryClient();

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
