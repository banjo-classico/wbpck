import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./tnC.css";
import TermsandConditions from "../../vAppointment/TermsandConditions";
import PrivacyPolicy from "../../vAppointment/PrivacyPolicy";

class TnC extends Component {
  static propTypes = {
    isWhite: PropTypes.bool,
    className: PropTypes.string,
  }
  state = {
    showTnC: false,
    showPrivacyPolicy: false,
  }
  handleTnC = () => {
    this.setState({ ...this.state, showTnC: !this.state.showTnC });
  }
  handlePrivacyPolicy = () => {
    this.setState({ ...this.state, showPrivacyPolicy: !this.state.showPrivacyPolicy });
  }
  render() {
    return (
      <div className={classnames(styles.container, this.props.className)}>
        <span className={styles.text}>
          By proceeding you agree to the <a
            className={styles.underline}
            onClick={this.handleTnC}
          >
          terms and conditions</a> and the <a
            className={styles.underline}
            onClick={this.handlePrivacyPolicy}
          >
          privacy policy</a>
        </span>
        {this.state.showTnC ? <TermsandConditions handleClick={this.handleTnC} /> : null}
        {this.state.showPrivacyPolicy ?
          <PrivacyPolicy handleClick={this.handlePrivacyPolicy} />
          : null}
      </div>
    );
  }
}

export default TnC;
