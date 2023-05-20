export const getDate = () => {
  let timeRanger = "";
  let hours = new Date().getHours();
  if (hours <= 9) {
    timeRanger = "早上";
  } else if (hours <= 12) {
    timeRanger = "上午";
  } else if (hours <= 18) {
    timeRanger = "下午";
  } else {
    timeRanger = "晚上";
  }
  return timeRanger;
};
