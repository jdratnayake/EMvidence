import { API_URL } from "../../constants";

const validateFirstName = (firstName) => {
  if (!firstName) {
    return "First name is required";
  }

  return null;
};

const validateLastName = (lastName) => {
  if (!lastName) {
    return "Last name is required";
  }

  return null;
};

const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return null;
};

const validateEmailExistence = async (email) => {
  try {
    const response = await fetch(API_URL + "/auth/check-email", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
    });
    const data = await response.json();

    if (!data.unique) {
      return "Email already exists";
    }

    return null;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return "An error occurred while checking email existence";
  }
};

const validateRole = (role) => {
  if (!role) {
    return "Role is required";
  }

  const validRoles = ["developer", "investigator"];

  if (!validRoles.includes(role)) {
    return "Invalid role selected";
  }
  return null;
};

const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password should be at least 6 characters long";
  }

  if (!/[a-z]/.test(password)) {
    return "Password should contain at least one lowercase letter";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password should contain at least one uppercase letter";
  }

  if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
    return "Password should contain at least one special character";
  }

  return null;
};

const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }

  if (confirmPassword !== password) {
    return "Passwords do not match";
  }

  return null;
};

export {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateEmailExistence,
  validateRole,
  validatePassword,
  validateConfirmPassword,
};
