import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useUser } from "../../contexts/UserContext";
import "./HomePage.css";

function HomePage() {
  const { user, loginUser } = useUser();
  const client = useQueryClient();
  const navigate = useNavigate();

  const checkStatus = () => {
    console.log(user);
  };

  const updateStatus = () => {
    loginUser({ name: "Dave" });
  };

  const clearStatus = () => {
    loginUser(null);
  };

  useEffect(() => {
    if (user == null) {
      navigate("/");
    } else if (user.role == "admin") {
      navigate("/home_admin");
    }
  }, [user]);

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
