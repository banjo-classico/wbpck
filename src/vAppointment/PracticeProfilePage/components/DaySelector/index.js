import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { times } from "lodash/fp";

import Arrow from "../../../../svgs/leftarrow.svg";
import styles from "./daySelector.css";

const DaySelector = ({ onClickLeft, onClickRight, mainDay }) => (
  <div className={styles.daySelector}>
    <div className={styles.arrowContainer} onClick={onClickLeft}>
      <Arrow className={styles.arrowIconLeft} />
    </div>
    <div className={styles.dayContainer}>
      {times(i => <div className={styles.dayUnit} key={i}>
        <div className={styles.dow}>{moment(mainDay).add(i, "days").format("dddd ")}</div>
        <div className={styles.month}>{moment(mainDay).add(i, "days").format("MMM Do")}</div>
      </div>
    )(5)}
    </div>
    <div className={styles.arrowContainer} onClick={onClickRight}>
      <Arrow className={styles.arrowIcon} />
    </div>
  </div>
);
DaySelector.propTypes = {
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired,
  mainDay: PropTypes.instanceOf(moment).isRequired,
};

export default DaySelector;
