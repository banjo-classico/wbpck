import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import InputWithError from "../../../../components/inputError";
import DateLabel from "../../../../components/DateLabel";
import styles from "./dobInput.css";
import Warning from "../../../../svgs/warning.svg";
import { isDesktop } from "../../../../config";

const DobInput = ({
  onLabelClick,
  onClick,
  inputRef,
  value,
  onChange,
  onBlur,
  clearError,
  error,
  inputClassName,
  labelClassName,
  containerClassName,
}) => (
  <div className={classnames(containerClassName)}>
    <DateLabel
      className={labelClassName}
      onClick={onLabelClick}
    />
    <div className={styles.inputContainer}>
      <InputWithError
        containerClassName={classnames(
          { [styles.inputWithError]: error.isUnderAge && !isDesktop() }
        )}
        className={classnames(inputClassName, styles.input)}
        type="text"
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={clearError}
        onErrorClick={clearError}
        isError={error.message && !error.isUnderAge}
        errorMessage={error.message}
      />
      { error.isUnderAge && <Warning className={styles.icon} /> }
    </div>
    {error.isUnderAge &&
      <div className={styles.info}>
        {isDesktop() ?
          <div className={styles.text}>
            You must be 18+ to proceed.
            If you&#39;re a guardian booking an appointment for a minor, please add your details.
          </div> :
          <div>
            <div className={styles.text}>
              You must be 18+ to proceed. If you&#39;re the guardian
              booking an appointment for a minor, please add your details.
            </div>
          </div>
        }
        <div className={styles.center}>
          <button
            className={styles.button}
            type="button"
            onClick={onClick}
          >Add guardian details</button>
        </div>
      </div>
    }
  </div>
);

DobInput.propTypes = {
  onLabelClick: PropTypes.func,
  onClick: PropTypes.func,
  inputRef: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  clearError: PropTypes.func,
  error: PropTypes.object,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default DobInput;
