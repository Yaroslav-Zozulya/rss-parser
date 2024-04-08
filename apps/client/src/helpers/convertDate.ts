export const convertDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = `${("0" + newDate.getDate()).slice(-2)}.${(
    "0" +
    (newDate.getMonth() + 1)
  ).slice(-2)}.${newDate.getFullYear()}`;
  return formattedDate;
};
