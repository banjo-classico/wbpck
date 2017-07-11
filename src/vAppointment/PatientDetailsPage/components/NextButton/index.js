import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./nextButton.css";
import RightArrow from "../../../../svgs/rightarrow.svg";
// import LoadingSpinner from "../../../components/loadingSpinner";

// refs do not work with stateless functions.
// eslint-disable-next-line react/prefer-stateless-function
class NextButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isFormValid: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    isLoggedIn: PropTypes.string,
  }
  render() {
    return (
      <div>
        <div
          className={classnames(
          styles.navContainer,
          { [styles.loggedIn]: this.props.isLoggedIn },
          { [styles.reduceMargin]: this.props.isError },
        )}
        >
          <a
            className={classnames(styles.navLinkLarge, { [styles.faded]: !this.props.isFormValid })}
            onClick={this.props.onClick}
          >
            <span>Next</span>
            <RightArrow className={styles.forwardArrow} />
          </a>
        </div>
      </div>
    );
  }
}
// <LoadingSpinner
//   containerClassName={styles.spinnerContainer}
//   iconClassName={styles.spinnerIcon}
//   isFetching={this.props.isChecking}
// >
//   {!this.props.isChecking ? <span>Next</span> : null}
//   {!this.props.isChecking ? <RightArrow className={styles.forwardArrow} /> : null}
// </LoadingSpinner>

export default NextButton;
