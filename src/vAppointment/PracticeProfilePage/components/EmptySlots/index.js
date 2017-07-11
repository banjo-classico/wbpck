import React from "react";
import PropTypes from "prop-types";

import styles from "./emptySlots.css";

const EmptySlots = ({ hasAvailableSlots, onClick, currentFilter }) => (
  <div className={styles.container}>
    {hasAvailableSlots ?
      <div className={styles.inner}>
        <div className={styles.text}>
          {`No ${currentFilter} apppointments available`}
        </div>
        <div className={styles.seeMore} onClick={onClick} >See more</div>
      </div> :
      <div>
        No appointments available <br /> on this day
      </div>
    }
  </div>
);

EmptySlots.propTypes = {
  onClick: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  hasAvailableSlots: PropTypes.number,
};

export default EmptySlots;
