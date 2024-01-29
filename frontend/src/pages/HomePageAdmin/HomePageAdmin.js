import React, {useEffect} from "react";
import "./HomePageAdmin.css";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';



function HomePageAdmin() {
  const { user, loginUser } = useUser();
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
    if (user === null || user.role != "admin"){
      navigate('/');
    }
  }, [user])
  


  return (
    <div>
      <div>Home Page Admin</div>
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

export default HomePageAdmin;
