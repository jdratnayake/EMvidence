import { API_URL, queryKeys } from "../constants";

export const loginUser = async (userData) => {
  try {
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
