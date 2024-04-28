import { API_URL } from "../constants";

export const getAdminStatDetails = async (userData) => {
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/user/admin-stat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getInvestigatorDeveloperDetails = async (userData) => {
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    return data["users"];
  } catch (error) {
    throw error;
  }
};
