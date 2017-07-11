import React from "react";
import PropTypes from "prop-types";

import LoginForm from "../../../SignInPage/components/SignInForm";
import Close from "../../../../svgs/close.svg";
import styles from "./loginPopUp.css";

const LoginPopUp = ({ login, goForgotPassword, isError, closePopUp }) => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <a
        className={styles.button}
        onClick={closePopUp}
      >
        <Close className={styles.icon} />
      </a>
      <LoginForm
        login={login}
        goToPatientDetails={closePopUp}
        goForgotPassword={goForgotPassword}
        isError={isError}
      />
    </div>
  </div>
);

LoginPopUp.propTypes = {
  login: PropTypes.func.isRequired,
  goForgotPassword: PropTypes.func.isRequired,
  closePopUp: PropTypes.func.isRequired,
  isError: PropTypes.bool,
};

export default LoginPopUp;
