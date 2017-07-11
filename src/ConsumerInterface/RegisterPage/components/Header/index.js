import React from "react";
import PropTypes from "prop-types";

import Arrow from "../../../../svgs/rightarrow2.svg";
import styles from "./header.css";

const Header = ({ onClick, text }) => (
  <div className={styles.container}>
    <Arrow onClick={onClick} className={styles.arrow} />
    <div className={styles.text}>{text}</div>
  </div>
);

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Header;
