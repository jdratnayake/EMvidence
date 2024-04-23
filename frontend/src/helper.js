export const getFullName = (firstName, lastName) => {
  const fullName = firstName + " " + lastName;

  return fullName;
};

export const capitalizeWords = (str) => {
  const words = str.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};
