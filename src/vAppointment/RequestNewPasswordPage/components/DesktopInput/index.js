import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import WarningIcon from "../../../../svgs/warning.svg";
import styles from "./desktopInput.css";

const DesktopInput = ({ value, isError, onChange, onFocus }) => (
  <div className={styles.outerContainer}>
    <div className={classnames(styles.container, { [styles.error]: isError })}>
      <input
        className={styles.input}
        value={value}
        type="email"
        onChange={onChange}
        onFocus={onFocus}
      />
      {isError ? <WarningIcon className={styles.icon} /> : null}
    </div>
    {
      isError ?
        <div className={styles.errorMessage}>This email is not registered with Vensa</div> :
        null
    }
  </div>
);

DesktopInput.propTypes = {
  value: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default DesktopInput;
