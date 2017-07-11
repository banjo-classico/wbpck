import React from "react";
import PropTypes from "prop-types";

import styles from "./allowsBookingBy.css";

const getText = (type, practice) => {
  switch (type) {
    case 1:
      return "";
    case 4:
      return (
        <div className={styles.container}>
          {practice} only accepts enrolled and funded patients to book appointments online.
        </div>
      );
    case 2:
      return (
        <div className={styles.container}>
          {practice} only accepts enrolled patients to book appointments online.
        </div>
      );
    default:
      return "";
  }
};

const AllowsBookingBy = ({ type, practice }) => (
  <div>
    {getText(type, practice)}
  </div>
);

AllowsBookingBy.propTypes = {
  type: PropTypes.number,
  practice: PropTypes.string,
};

export default AllowsBookingBy;
