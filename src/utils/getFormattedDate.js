export default function getFormattedDate(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
}
