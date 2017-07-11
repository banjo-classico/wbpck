import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

import Arrow from "../../../../svgs/rightarrow2.svg";
import { clinicPropType } from "../../../PracticeListings/propTypes";
import styles from "./practiceList.css";

const PracticeList = ({
  practices,
  goToBooking,
  otherPractice,
  showArrow,
  arrowClick,
}) => (
  <div className={styles.container}>
    {showArrow && <Arrow className={styles.backArrow} onClick={arrowClick} />}
    <div className={styles.heading}>Where?</div>
    <div className={styles.optionsContainer}>
      {
        map(p =>
          <a
            className={styles.button}
            onClick={() => goToBooking(p.UrlName)}
            key={p.Id}
          >
            {p.Name}
          </a>
        )(practices)
      }
      <a className={styles.button} onClick={otherPractice}>Other practice...</a>
    </div>
  </div>
);

PracticeList.propTypes = {
  goToBooking: PropTypes.func.isRequired,
  otherPractice: PropTypes.func.isRequired,
  showArrow: PropTypes.bool,
  practices: PropTypes.arrayOf(clinicPropType).isRequired,
  arrowClick: PropTypes.func,
};

export default PracticeList;
