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

export const getSingleUser = async (userData, selectedUserId) => {
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/user/get-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        user_id : selectedUserId,
      },
    });

    // user profile image
    const profileImageResponse = await fetch(API_URL + "/user/user-profile-image", {
      method: "GET",
      headers: {
        Authorization: token,
        user_id : selectedUserId,
      },
    });
    const userProfileImage = await profileImageResponse.blob();
    // console.log(userProfileImage);
    const userProfilePath = URL.createObjectURL(userProfileImage);
    // console.log(userProfilePath);
    
    const data = await response.json();
    const setUser = data["user"][0];
    setUser["profile_image"] = userProfilePath;
    console.log(setUser);
    return setUser;
    
  } catch (error) {
    throw error;
  }
};