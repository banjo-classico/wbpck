import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Arrow from "../../svgs/rightarrow2.svg";
import styles from "./ctaButton.css";

const CtaButton = ({ onClick, className, type, white, active }) => (
  <button
    className={classnames(
    styles.container,
    className,
    { [styles.white]: white },
    { [styles.inactive]: !active && !white },
  )}
    type={type}
    onClick={onClick}
  >
    <Arrow className={styles.arrow} />
  </button>
);

CtaButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  white: PropTypes.bool,
  active: PropTypes.bool,
};
export default CtaButton;
