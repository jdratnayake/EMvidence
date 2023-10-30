const validateEmail = (email) => {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
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
