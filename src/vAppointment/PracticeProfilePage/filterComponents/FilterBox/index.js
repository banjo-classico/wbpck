import React from "react";
import PropTypes from "prop-types";

import TimeOfDayFilter from "../TimeOfDayFilter";
import DateFilter from "../DateFilter";
import DoctorFilter from "../DoctorFilter";
import styles from "./filterBox.css";
import { isIE } from "../../../../libs/BrowserDetection";

const FilterBox = ({
  currentFilter,
  filterMorning,
  filterAfternoon,
  filterEvening,
  selectedDay,
  setMainDay,
  maxDays,
  filterDoctors,
}) => (
  <div className={styles.container}>
    <DoctorFilter filterDoctors={filterDoctors} />
    <div className={styles.appointmentFilters}>
      {
        !isIE() ?
          <DateFilter maxDays={maxDays} selectedDay={selectedDay} setMainDay={setMainDay} />
        : null
      }
      <TimeOfDayFilter
        currentFilter={currentFilter}
        filterMorning={filterMorning}
        filterAfternoon={filterAfternoon}
        filterEvening={filterEvening}
      />
    </div>
  </div>
);

FilterBox.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  filterMorning: PropTypes.func.isRequired,
  filterAfternoon: PropTypes.func.isRequired,
  filterEvening: PropTypes.func.isRequired,
  filterDoctors: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  setMainDay: PropTypes.func.isRequired,
  maxDays: PropTypes.number,
};

export default FilterBox;
