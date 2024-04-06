const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return true;
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

  return true;
};

export { validateEmail, validatePassword };
