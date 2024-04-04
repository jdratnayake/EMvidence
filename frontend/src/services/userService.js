import { API_URL } from "../constants";

export const getInvestigatorDeveloperDetails = async (userData) => {
  //   console.log(userData["userData"]);

  try {
    const response = await fetch(API_URL + "/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data["users"]);
    return data["users"];
  } catch (error) {
    throw error;
  }
};
