import React, { Component } from "react";
import PropTypes from "prop-types";

import CtaButton from "../../../../components/CtaButton";
import styles from "./reason.css";

class Reason extends Component {
  static propTypes = {
    deactivateAccount: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCtaClick = this.handleCtaClick.bind(this);
  }
  state = {
    reason: "",
  }
  handleChange(e) {
    this.setState({ reason: e.target.value });
  }
  handleCtaClick() {
    this.props.deactivateAccount(this.state.reason);
  }
  render() {
    const isActive = this.state.reason.length > 5;
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.text}>What went wrong?</div>
          <textarea
            className={styles.textarea}
            onChange={this.handleChange}
            maxLength={200}
            placeholder="Type the reason for deactivating your account"
          />
        </div>
        <div className={styles.ctaContainer}>
          <button className={styles.secondaryCta} onClick={this.props.goBack}>
        No, don&#39;t deactivate my account
      </button>
          <CtaButton
            className={styles.cta}
            active={isActive}
            onClick={isActive ? this.handleCtaClick : () => {}}
          />
        </div>
      </div>
    );
  }
}

export default Reason;
