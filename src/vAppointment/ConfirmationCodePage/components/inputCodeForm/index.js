import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import NDigitInput from "../../../../components/nDigitInput";
import smartPhoneIcon from "../../../../images/smartPhone.png";
import WarningIcon from "../../../../svgs/warning.svg";
import LoadingSpinner from "../../../../components/loadingSpinner";
import { isDesktop } from "../../../../config";
import styles from "./inputCodeForm.css";

const onChange = (sendCode, sessionId) => (digits) => (
  (digits.length === 4) && sendCode(sessionId, digits)
);

const InputCodeForm = ({ sendCode, sessionId, isFetching, isError, clearError }) => (
  <div
    className={classnames(
    styles.container,
    { [styles.lessMargin]: isError },
  )}
  >
    <LoadingSpinner
      isFetching={isFetching}
      iconClassName={styles.loadingIcon}
      containerClassName={styles.loadingContainer}
    >
      {isDesktop() ?
        <img
          src={smartPhoneIcon}
          className={styles.icon}
          key="icon"
          alt="SMS code"
        /> : null
      }
      <NDigitInput
        className={classnames(styles.input, { [styles.error]: isError })}
        digits={4}
        onChange={onChange(sendCode, sessionId)}
        key="input"
        isError={null}
        clearError={clearError}
        autoFocus={isDesktop()}
      />
      {isError ?
        <div className={styles.errorText}>
          <WarningIcon className={styles.warning} />This code is not valid
        </div> : null
      }
    </LoadingSpinner>
  </div>
);
InputCodeForm.propTypes = {
  sendCode: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  sessionId: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
};

export default InputCodeForm;
