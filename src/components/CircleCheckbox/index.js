import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./circleCheckbox.css";

const CircleCheckbox = ({ selected, className, onClick }) =>
  <div
    className={classnames(
      styles.circleIcon,
      className,
      { [styles.selected]: selected }
    )}
    onClick={onClick}
  >
    &nbsp;
  </div>;

CircleCheckbox.propTypes = {
  selected: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default CircleCheckbox;
