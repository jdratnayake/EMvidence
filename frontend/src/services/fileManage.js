import { API_URL } from "../constants";

export const getEmRawDetails = async (userData) => {
  const userId = userData["userData"]["user_id"];
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/em_data_records", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        user_id: userId,
      },
    });

    const data = await response.json();

    return data["em_raw_files"];
  } catch (error) {
    throw error;
  }
};
