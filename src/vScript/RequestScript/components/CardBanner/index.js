import React from "react";
import PropTypes from "prop-types";

import Tick from "../../../../svgs/bigTick.svg";
import styles from "./cardBanner.css";

const CardBanner = ({ status, isRed }) => (
  <div className={styles.outerContainer}>
    <div
      className={styles.container}
      style={{ backgroundColor: isRed ? "#FF6A65" : "#23C373" }}
    >
      {!isRed && <Tick className={styles.tick} />}
      <span>{status}</span>
    </div>
  </div>
);

CardBanner.propTypes = {
  status: PropTypes.string,
  isRed: PropTypes.bool,
};

export default CardBanner;
