import React, { Component, PropTypes } from "react";
import { compose, keys, times, sortBy, map, reduce } from "lodash/fp";
import classnames from "classnames";

import styles from "./nDigitInput.css";
import { InputError } from "../inputError";

class NDigitInput extends Component {
  static propTypes = {
    digits: PropTypes.number.isRequired,
    clearError: PropTypes.func.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    isError: PropTypes.bool,
    autoFocus: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.getDigits = this.getDigits.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  state = {
    focusIndex: 0,
  }
  onKeyPress(i) {
    return (e) => {
      if (!/^[0-9]$/g.test(e.key)) e.preventDefault();
      this.input[i].value = "";
    };
  }
  onChange(i) {
    return () => {
      if (this.props.onChange) this.props.onChange(this.getDigits());
      this.changeFocus(this.input[i].value.length >= 1);
    };
  }
  onKeyDown(i) {
    return (e) => {
      if (e.key === "Backspace" && this.input[i].value.length < 1) {
        this.changeFocus(false);
        e.preventDefault();
      }
    };
  }
  onFocus(i) {
    return () => {
      if (this.props.clearError) this.props.clearError();
      if (i < this.props.digits) this.setState({ focusIndex: i });
    };
  }
  getDigits() {
    return compose(
      reduce((sum, next) => `${sum}${next}`, ""),
      map(i => this.input[i].value),
      sortBy(i => i),
      keys
    )(this.input);
  }
  changeFocus(increment = true) {
    const newIndex = increment ? this.state.focusIndex + 1 : this.state.focusIndex - 1;
    // if at last index we want to blur only if incrementing index
    if (this.props.digits - 1 !== this.state.focusIndex || !increment) {
      this.setState({
        focusIndex: newIndex > -1 && newIndex < this.props.digits ?
          newIndex : this.state.focusIndex,
      }, () => {
        this.input[this.state.focusIndex].focus();
        if (this.input[this.state.focusIndex].value) {
          this.input[this.state.focusIndex].setSelectionRange(0, 1);
        }
      });
    } else if (newIndex === this.props.digits) {
      this.input[this.state.focusIndex].blur();
    }
  }
  input = {};
  render() {
    return (
      <div className={classnames(styles.container, this.props.className)}>
        {
          times((i) =>
            <input
              className={styles.input}
              key={i}
              type="tel"
              onKeyPress={this.onKeyPress(i)}
              onKeyDown={this.onKeyDown(i)}
              ref={c => { this.input[i] = c; }}
              size="1"
              autoFocus={i === 0 && this.props.autoFocus}
              onChange={this.onChange(i)}
              onFocus={this.onFocus(i)}
            />, this.props.digits)
        }
        <InputError
          parserFn={() => "Incorrect code, try again."}
          error={this.props.isError}
          className={styles.error}
          onClick={this.props.clearError}
        />
      </div>
    );
  }
}

export default NDigitInput;
