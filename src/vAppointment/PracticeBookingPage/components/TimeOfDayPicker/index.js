import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { filterTypes } from "../../actions/filterActions";
import styles from "./timeOfDayPicker.css";

const TimeOfDayPicker = ({
  currentFilter,
  onMorningClick,
  onAfterNoonClick,
  onEveningClick,
  morningDisabled,
  afternoonDisabled,
  eveningDisabled,
}) => (
  <div className={styles.container}>
    <button
      disabled={morningDisabled}
      className={classnames(
        styles.button,
        { [styles.selected]: currentFilter === filterTypes.morning && !morningDisabled }
      )}
      onClick={onMorningClick}
    >Morning</button>
    <button
      disabled={afternoonDisabled}
      className={classnames(
        styles.button,
        { [styles.selected]: currentFilter === filterTypes.afternoon && !afternoonDisabled }
      )}
      onClick={onAfterNoonClick}
    >Afternoon</button>
    <button
      disabled={eveningDisabled}
      className={classnames(
        styles.button,
        { [styles.selected]: currentFilter === filterTypes.evening && !eveningDisabled }
      )}
      onClick={onEveningClick}
    >Evening</button>
  </div>
);

TimeOfDayPicker.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onMorningClick: PropTypes.func.isRequired,
  onAfterNoonClick: PropTypes.func.isRequired,
  onEveningClick: PropTypes.func.isRequired,
  morningDisabled: PropTypes.bool.isRequired,
  afternoonDisabled: PropTypes.bool.isRequired,
  eveningDisabled: PropTypes.bool.isRequired,
};


export default TimeOfDayPicker;
