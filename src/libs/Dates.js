import moment from "moment";

// const inputFormat = Modernizr.inputtypes.date ? "YYYY-MM-DD" : "DD-MM-YYYY";
const inputFormat = ["DD-MM-YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];

const getMoment = date => moment.utc(date, inputFormat, true);

const isValidFormat = (date) => getMoment(date).isValid();

const getDateString = date => isValidFormat(date) && getMoment(date);

// const toCorrectFormat = date => moment.utc(date).format(inputFormat);

const toServerFormat = date => moment.utc(date, inputFormat).format("YYYY-MM-DD");

const isUnderAge = (date) => getMoment(date).isAfter(moment().subtract(18, "years"));

const isTooOld = date => getMoment(date).isBefore(moment().subtract(110, "years"));

const isInFuture = date => getMoment(date).isAfter(moment());

const isValidDate = (date, allowUnderage = false, onlyUnderAge = false, required = true) => {
  if (!required) return (isValidFormat(date) && !isInFuture(date)) || !date;
  if (onlyUnderAge) return isValidFormat(date) && isUnderAge(date) && !isInFuture(date);
  return isValidFormat(date) &&
    !isInFuture(date) &&
    !isTooOld(date) &&
    (allowUnderage || !isUnderAge(date));
};


const getErrorMessage = (date, onlyUnderAge) => {
  if (!isValidFormat(date) || isTooOld(date) || isInFuture(date)) {
    return "Invalid Date of Birth";
  }
  if (onlyUnderAge) {
    if (!isUnderAge(date)) {
      return "Too old to be a minor";
    }
    return "";
  }
  if (isUnderAge(date)) {
    return "You must be at least 18 years old";
  }
  return "";
};

/* eslint-disable no-param-reassign */
function checkValue(str, max) {
  if (str.charAt(0) !== "0" || str === "00") {
    let num = parseInt(str, 10);
    if (isNaN(num) || num <= 0 || num > max) num = 1;
    str = num > parseInt(max.toString().charAt(0), 10) && num.toString().length === 1 ?
      `0${num}` :
      num.toString();
  }
  return str;
}

const dateDelimeter = (input) => {
  if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
  const values = input.split("-").map((v) => v.replace(/\D/g, ""));
  if (values[0]) values[0] = checkValue(values[0], 31);
  if (values[1]) values[1] = checkValue(values[1], 12);
  const arr = values.map((v, i) => (v.length === 2 && i < 2 ? `${v}-` : v));
  const output = arr.join("");
  return (output);
};

const dateBlurOutput = (input) => {
  const values = input.split("-").map((v) => v.replace(/\D/g, ""));
  let output = "";
  if (values.length === 3) {
    const year = values[2].length !== 4 ? parseInt("", 10) : parseInt(values[2], 10);
    const month = parseInt(values[1], 10) - 1;
    const day = parseInt(values[0], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d)) {
      d.toString();
      const dates = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
      output = dates.map((v) => {
        v = v.toString();
        return v.length === 1 ? `0${v}` : v;
      }).join("-");
    }
  }
  return output;
};
/* eslint-enable no-param-reassign */

export {
  isValidFormat,
  isValidDate,
  isInFuture,
  isUnderAge,
  getErrorMessage,
  getDateString,
  getMoment,
  // toCorrectFormat,
  toServerFormat,
  dateDelimeter,
  dateBlurOutput,
};
