import { API_URL } from "../constants";

export const getDeviceDetails = async (userData) => {
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/device", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    return data["devices"];
  } catch (error) {
    throw error;
  }
};
