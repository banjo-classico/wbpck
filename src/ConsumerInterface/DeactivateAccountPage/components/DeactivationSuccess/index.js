import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./deactivationSuccess.css";

class DeactivationSuccess extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,

  }
  componentWillUnmount() {
    this.props.logout();
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.heading}>You&#39;re welcome to come back anytime.</div>
          <div className={styles.text}>{`It's sad to see you going ${this.props.name}...`}</div>
          <div className={styles.text}>
            Thanks for sharing your experience and helping us grow with your feedback
          </div>
          <div className={styles.text}>
            Come back to see our improvements soon. You just need to log back into your account as
            <span className={styles.email}>{this.props.email}</span>
            and we will set you up again.
          </div>
          <div className={styles.text}>See you soon!</div>
          <div className={styles.vensa}>Team Vensa</div>
        </div>
        <button className={styles.button} onClick={this.props.logout}>OK</button>
      </div>
    );
  }
}

export default DeactivationSuccess;
