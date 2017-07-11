import React from "react";
import PropTypes from "prop-types";

import styles from "./nextSkipButton.css";
import RightArrow from "../../../../svgs/rightarrow.svg";

const checkSkip = (skipFn, feelings, onClickFn) => () => {
  if (!feelings.length) skipFn();
  onClickFn();
};

const NextSkipButton = ({ skip, feelings, onClickFn }) => (
  <a className={styles.navLinkLarge} onClick={checkSkip(skip, feelings, onClickFn)}>
    <div className={styles.next}>
      <span>Next</span><RightArrow className={styles.rightarrow} />
    </div>
  </a>
);
NextSkipButton.propTypes = {
  skip: PropTypes.func.isRequired,
  feelings: PropTypes.string.isRequired,
  onClickFn: PropTypes.func.isRequired,
};

export default NextSkipButton;
