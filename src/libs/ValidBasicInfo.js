import isMobilePhone from "validator/lib/isMobilePhone";
import { isValidDate } from "./Dates";

const isValidMobile = (mobile, required = true) =>
  isMobilePhone(mobile, "en-NZ") || (!required && !mobile);

const isValidName = (name, required = true) => name.length > 0 || !required;

const isValidBasicInfo = (
  firstName,
  surname,
  dob,
  mobile,
  allowUnderage,
  onlyUnderAge,
  firstNameRequired = true,
  surnameRequired = true,
  dobRequired = true,
  mobileRequired = true,
) => isValidName(firstName, firstNameRequired) &&
    isValidName(surname, surnameRequired) &&
    isValidMobile(mobile, mobileRequired) &&
    isValidDate(dob, allowUnderage, onlyUnderAge, dobRequired);

export {
  isValidMobile,
  isValidName,
  isValidBasicInfo,
};
