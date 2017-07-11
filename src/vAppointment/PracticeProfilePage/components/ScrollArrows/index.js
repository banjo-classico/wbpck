import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import RightArrow from "../../../../svgs/rightarrow.svg";
import styles from "./scrollArrows.css";

const Arrow = ({ isLeft, onClick }) => (
  <a className={classnames(styles.container, { [styles.leftCont]: isLeft })} onClick={onClick}>
    <RightArrow className={classnames(styles.icon, { [styles.left]: isLeft })} />
  </a>
);

Arrow.propTypes = {
  onClick: PropTypes.func,
  isLeft: PropTypes.bool,
};
export default Arrow;
