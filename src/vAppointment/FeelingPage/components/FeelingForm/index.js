import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import Textarea from "react-textarea-autosize";
import { defer, debounce } from "lodash/fp";

import styles from "./feelingForm.css";

class FeelingForm extends Component {
  static propTypes = {
    addFeelings: PropTypes.func.isRequired,
    isBookingForSomeoneElse: PropTypes.bool,
    name: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.isTooLong = this.isTooLong.bind(this);
    this.addFeelings = debounce(500, this.addFeelings.bind(this));
  }
  state = {
    textLength: 0,
  }
  componentDidMount() {
    // eslint-disable-next-line no-underscore-dangle
    defer(() => this.textarea._resizeComponent());
  }
  onChange() {
    this.setState({ textLength: this.textarea.value.length });
    this.addFeelings(this.textarea.value);
  }
  addFeelings(feelings) {
    this.props.addFeelings(feelings);
  }
  isTooLong() {
    return this.state.textLength >= 120;
  }
  render() {
    const barLength = (this.state.textLength / 120) * 100;
    return (
      <div className={styles.container}>
        <form className={styles.feelingForm}>
          <Textarea
            placeholder={
              this.props.isBookingForSomeoneElse ?
                `${this.props.name} is visiting because...` :
                "I'm visiting because..."
            }
            onChange={this.onChange}
            ref={c => { this.textarea = c; }}
            className={styles.textarea}
            maxLength={120}
          />
          <div
            style={{ width: `${barLength}%` }}
            className={classnames(styles.countBar, { [styles.redBorder]: this.isTooLong() })}
          >&nbsp;</div>
        </form>
        <div className={styles.lengthCounter}>
          <span className={classnames(styles.length, { [styles.redColor]: this.isTooLong() })}>
            {120 - this.state.textLength}
          </span>
          {" / 120 characters remaining"}
        </div>
      </div>
    );
  }
}
export default FeelingForm;
export {
  styles,
};
