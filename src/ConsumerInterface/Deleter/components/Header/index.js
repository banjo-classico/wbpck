import React from "react";
import PropTypes from "prop-types";

import Arrow from "../../../../svgs/rightarrow2.svg";
import styles from "./header.css";

const Header = ({ onClick, text }) => (
  <div className={styles.container} onClick={onClick}>
    <Arrow className={styles.arrow} />
    <div>
      <div>Are you sure you&#39;d like to</div>
      <div className={styles.text}>{text}</div>
    </div>
  </div>
);

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Header;
