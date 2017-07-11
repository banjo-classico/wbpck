const actionTypes = {
  setFirstName: "REGISTER_SET_FIRST_NAME",
  setSurname: "REGISTER_SET_SURNAME",
  setDateOfBirth: "REGISTER_SET_DATE_OF_BIRTH",
  setMobile: "REGISTER_SET_MOBILE",
  setEmail: "REGISTER_SET_EMAIL",
  setPassword: "REGISTER_SET_PASSWORD",
  register: "REGISTER_USER",
  registerSuccess: "REGISTER_USER_SUCCESS",
  registerFailure: "REGISTER_USER_FAILURE",
  clearRegisterData: "REGISTER_USER_CLEAR_DATA",
  setAcceptTnC: "REGISTER_SET_ACCEPT_T_N_C",
};

const setFirstName = (firstName) => ({
  type: actionTypes.setFirstName,
  payload: {
    firstName,
  },
});

const setSurname = (surname) => ({
  type: actionTypes.setSurname,
  payload: {
    surname,
  },
});

const setDateOfBirth = (dateOfBirth) => ({
  type: actionTypes.setDateOfBirth,
  payload: {
    // moment to date
    dateOfBirth: dateOfBirth.toDate(),
  },
});

const setMobile = (mobile) => ({
  type: actionTypes.setMobile,
  payload: {
    mobile,
  },
});

const setEmail = (email) => ({
  type: actionTypes.setEmail,
  payload: {
    email,
  },
});

const setPassword = (password) => ({
  type: actionTypes.setPassword,
  payload: {
    password,
  },
});

const setAcceptTnC = (value) => ({
  type: actionTypes.setAcceptTnC,
  payload: {
    value,
  },
});

const register = ({
  firstName,
  lastName,
  dateOfBirth,
  email,
  mobile,
  password,
}) => ({
  type: actionTypes.register,
  payload: {
    FirstName: firstName,
    LastName: lastName,
    DateOfBirth: dateOfBirth,
    Username: email,
    Mobile: mobile,
    Password: password,
  },
});

const registerSuccess = ({
  Id,
  Username,
  Password,
  FirstName,
  LastName,
  Mobile,
  DateOfBirth,
}, shouldVerify) => ({
  type: actionTypes.registerSuccess,
  meta: { shouldVerify },
  payload: {
    id: Id,
    email: Username,
    password: Password,
    firstName: FirstName,
    surname: LastName,
    dateOfBirth: DateOfBirth,
    mobile: Mobile,
  },
});

const registerFailure = (err) => ({
  type: actionTypes.registerFailure,
  payload: { err },
  error: true,
});

const clearRegisterData = () => ({
  type: actionTypes.clearRegisterData,
});

const actions = {
  setFirstName,
  setSurname,
  setDateOfBirth,
  setMobile,
  setEmail,
  setPassword,
  setAcceptTnC,
  register,
  registerSuccess,
  registerFailure,
  clearRegisterData,
};

export {
  actions,
  actionTypes,
};
