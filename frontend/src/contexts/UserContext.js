// UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Create a BroadcastChannel with a specific channel name
    const broadcastChannel = new BroadcastChannel("userChannel");

    // Event listener to handle incoming messages from other tabs
    const handleMessage = (event) => {
      if (event.data.type === "userUpdate") {
        setUser(event.data.payload);
      }
    };

    // Subscribe to messages from other tabs
    broadcastChannel.addEventListener("message", handleMessage);

    return () => {
      // Clean up the event listener when the component unmounts
      broadcastChannel.removeEventListener("message", handleMessage);
    };
  }, []);

  const addUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Broadcast user update to other tabs
    const broadcastChannel = new BroadcastChannel("userChannel");
    broadcastChannel.postMessage({ type: "userUpdate", payload: userData });
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("user");

    // Broadcast user logout to other tabs
    const broadcastChannel = new BroadcastChannel("userChannel");
    broadcastChannel.postMessage({ type: "userUpdate", payload: null });
  };

  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
