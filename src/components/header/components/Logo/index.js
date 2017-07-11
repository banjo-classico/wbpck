import React from "react";
import PropTypes from "prop-types";

import styles from "./logo.css";
import LogoIcon from "../../../../svgs/logo.svg";

const Logo = ({ onClick }) => (
  <div className={styles.container} onClick={onClick}>
    <LogoIcon className={styles.icon} />
  </div>
);
Logo.propTypes = {
  onClick: PropTypes.func,
};

export default Logo;
