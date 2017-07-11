import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import InputWithError from "../../../../components/inputError";
import styles from "./scrollingInput.css";
import {
  isValidDate,
  dateDelimeter,
  dateBlurOutput,
} from "../../../../libs/Dates";

class ScrollingInput extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    defaultError: PropTypes.bool,
    mapUpdateError: PropTypes.func,
    valueIsValid: PropTypes.func,
    mapValue: PropTypes.func,
    onSuccess: PropTypes.func.isRequired,
    checkSuccessOnKeyPress: PropTypes.bool,
    className: PropTypes.string,
    autoFocus: PropTypes.bool,
    type: PropTypes.string,
    generateErrorLabel: PropTypes.func.isRequired,
    generateLabel: PropTypes.func.isRequired,
    mapBlurError: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    date: PropTypes.bool,
    shouldError: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearError = this.clearError.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getError = this.getError.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.runOnSuccess = this.runOnSuccess.bind(this);
  }
  state = {
    value: this.props.defaultValue || "",
    error: this.props.defaultError || false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldError) {
      this.setState({
        error: this.props.mapUpdateError ?
          this.props.mapUpdateError(nextProps.shouldError) :
          true,
      });
    }
  }
  componentWillUnmount() {
    this.input.blur();
  }
  onBlur(e) {
    if (this.props.date) {
      const output = dateBlurOutput(e.target.value);
      if (isValidDate(output)) {
        this.runDateSuccess(output);
      } else {
        this.setState(
          {
            error: this.props.mapBlurError ?
              this.props.mapBlurError(this.state.value) :
              true,
          });
      }
    } else if (this.checkValidity()) {
      this.runOnSuccess();
    } else {
      this.setState(
        {
          error: this.props.mapBlurError ?
              this.props.mapBlurError(this.state.value) :
              true,
        }
          , () => {
        if (this.props.onError) {
          this.props.onError();
        }
      });
    }
  }
  onChange(e) {
    this.props.onChange(e.target.value);
    if (this.props.date) {
      const output = dateDelimeter(e.target.value);
      this.setState({ value: output, error: false }, () => {
        if (this.props.checkSuccessOnKeyPress) {
          if (this.checkValidity()) this.runDateSuccess();
        }
      });
    } else {
      this.setState({ value: e.target.value, error: false }, () => {
        if (this.props.checkSuccessOnKeyPress) {
          if (this.checkValidity()) this.runOnSuccess();
        }
      });
    }
  }
  getValue() {
    return this.state.value;
  }
  getError() {
    return this.state.error;
  }
  clearError() {
    this.setState({ error: false });
  }
  checkValidity() {
    return !this.props.valueIsValid ||
      this.props.valueIsValid(
        this.props.mapValue ?
          this.props.mapValue(this.state.value) :
          this.state.value
      );
  }
  runOnSuccess() {
    this.props.onSuccess(
      this.props.mapValue ?
        this.props.mapValue(this.state.value) :
        this.state.value
    );
  }
  runDateSuccess(dob) {
    this.props.onSuccess(this.props.mapValue(dob));
  }
  render() {
    return (
      <div className={classnames(styles.item, this.props.className)}>
        <InputWithError
          className={styles.input}
          autoFocus={this.props.autoFocus}
          type={this.props.type || "text"}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.clearError}
          inputRef={c => { this.input = c; }}
          isError={this.state.error}
          errorMessage={this.props.generateErrorLabel(this.state.error)}
          onErrorClick={this.clearError}
        />
        <span>
          {this.props.generateLabel(this.state.value)}
        </span>
      </div>
    );
  }
}

export default ScrollingInput;
