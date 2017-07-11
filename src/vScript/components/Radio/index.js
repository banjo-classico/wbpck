import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Tick from "../../../svgs/tick.svg";
import styles from "./radio.css";

const Radio = ({ selected, className, onClick, fillColor }) => {
  const backgroundColor = selected && "#07A3C8";
  const style = { backgroundColor: fillColor || backgroundColor };
  return (
    <div
      className={classnames(styles.circleIcon, className, { [styles.selected]: selected })}
      onClick={onClick}
      style={style}
    >
      {selected && <Tick className={styles.tick} />}
    </div>
  );
};

Radio.propTypes = {
  selected: PropTypes.bool,
  className: PropTypes.string,
  fillColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default Radio;
