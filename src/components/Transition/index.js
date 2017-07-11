import React from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import styles from "./transition.css";

const Transition = (props) => <ReactCSSTransitionGroup {...props} />;
Transition.propTypes = {
  component: PropTypes.string,
  transitionAppearTimeout: PropTypes.number,
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number,
  transitionAppear: PropTypes.bool,
  transitionName: PropTypes.shape({
    enter: PropTypes.string.isRequired,
    enterActive: PropTypes.string.isRequired,
    leave: PropTypes.string.isRequired,
    leaveActive: PropTypes.string.isRequired,
    appearActive: PropTypes.string,
    appear: PropTypes.string,
  }),
  className: PropTypes.string,
};
Transition.defaultProps = {
  component: "div",
  transitionAppearTimeout: 1500,
  transitionEnterTimeout: 2000,
  transitionLeaveTimeout: 1500,
  transitionAppear: true,
  transitionName: {
    enter: styles.enter,
    enterActive: styles.enterActive,
    appear: styles.enter,
    appearActive: styles.enterActive,
    leave: styles.leave,
    leaveActive: styles.leaveActive,
  },
};
export default Transition;
