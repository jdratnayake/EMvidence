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

export const getDate = (datetimeString) => {
  const datetime = new Date(datetimeString);

  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1; // Months are zero-based (0 = January)
  const day = datetime.getDate();

  // Create the date string in the desired format (YYYY-MM-DD)
  const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return dateString;
};

export const bytesToMB = (bytes) => {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2); // Limiting the result to 2 decimal places
};
