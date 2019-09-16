export const formatDate = seconds => {
  const months = [
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
    "Dec"
  ];
  const date = new Date(seconds * 1000);
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};
