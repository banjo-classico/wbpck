import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash/fp";
import classnames from "classnames";

import styles from "./reason.css";

class Reason extends Component {
  constructor(props) {
    super(props);
    this.onReasonChange = this.onReasonChange.bind(this);
    this.setReason = debounce(500, this.setReason.bind(this));
  }
  state = {
    reason: "",
  }
  onReasonChange(e) {
    this.setState({ reason: e.target.value });
    this.setReason(e.target.value);
    this.props.setRed(false);
  }
  setReason(reason) {
    this.props.setReason(reason);
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={classnames(styles.label, { [styles.redText]: this.props.red })}>
          Reason for cancelation:
        </div>
        <form className={classnames(styles.form, { [styles.redBorder]: this.props.red })}>
          <textarea
            placeholder="Type the reason for this cancelation"
            onChange={this.onReasonChange}
            onFocus={() => this.props.setRed(false)}
            className={styles.textarea}
            maxLength={120}
          />
        </form>
      </div>
    );
  }
}

Reason.propTypes = {
  setReason: PropTypes.func.isRequired,
  setRed: PropTypes.func.isRequired,
  red: PropTypes.bool.isRequired,
};

export default Reason;
