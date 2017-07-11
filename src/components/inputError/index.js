import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import styles from "./inputError.css";
import ErrorTab from "../../svgs/errorTab.svg";
import WarningIcon from "../../svgs/warning.svg";

const InputError = ({ onClick, parserFn, error, className }) => (
  <ReactCSSTransitionGroup
    component="div"
    className={classnames(styles.errorContainer, className)}
    transitionName={{
      enter: styles.enter,
      enterActive: styles.enterActive,
      leave: styles.leave,
      leaveActive: styles.leaveActive,
    }}
    transitionEnterTimeout={700}
    transitionLeaveTimeout={700}
  >
    {error ?
      <div
        className={classnames(styles.container, { [styles.clickable]: onClick })}
        onClick={onClick}
      >
        <ErrorTab className={styles.tab} />
        <div className={styles.content}>
          <WarningIcon className={styles.warningIcon} />
          <div className={styles.message}>{parserFn()}</div>
        </div>
      </div>
    : null}
  </ReactCSSTransitionGroup>
);
InputError.propTypes = {
  parserFn: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  error: PropTypes.any,
};

class InputWithError extends Component {
  static propTypes = {
    onErrorClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    containerClassName: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.string,
    isError: PropTypes.any,
    errorMessage: PropTypes.string,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    inputRef: PropTypes.func,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
  }
  render() {
    return (
      <div className={classnames(styles.inputContainer, this.props.containerClassName)}>
        <input
          autoFocus={this.props.autoFocus}
          required={this.props.required}
          readOnly={this.props.readOnly}
          className={this.props.className}
          type={this.props.type}
          onChange={this.props.onChange}
          value={this.props.value}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          ref={this.props.inputRef}
          placeholder={this.props.placeholder}
        />
        <InputError
          onClick={this.props.onErrorClick}
          error={this.props.isError}
          parserFn={() => this.props.errorMessage}
        />
      </div>
    );
  }
}
export default InputWithError;
export {
  InputError,
};
