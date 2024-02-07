export const formatDate = (inputDate) => {
  const dateObj = new Date(inputDate);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDateTime = `${String(dateObj.getDate()).padStart(2, "0")}-${
    monthNames[dateObj.getMonth()]
  }-${dateObj.getFullYear()} ${String(dateObj.getHours()).padStart(
    2,
    "0"
  )}:${String(dateObj.getMinutes()).padStart(2, "0")}:${String(
    dateObj.getSeconds()
  ).padStart(2, "0")}`;

  return formattedDateTime;
};
