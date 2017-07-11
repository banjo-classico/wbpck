import React from "react";
import PropTypes from "prop-types";

import styles from "./appointmentsList.css";

const getHeight = (children, isFetching, itemHeight, emptyHeight) => {
  if (isFetching) {
    return "0px";
  }
  if (children.length) {
    return `${children.length * itemHeight}em`;
  }
  return `${emptyHeight}px`;
};

const AppointmentsList = ({ children, isFetching, itemHeight, emptyHeight }) => (
  <div
    style={{ minHeight: getHeight(children, isFetching, itemHeight, emptyHeight) }}
    className={styles.container}
  >
    <div>{ isFetching ? null : children }</div>
  </div>
);

AppointmentsList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  itemHeight: PropTypes.number.isRequired,
  emptyHeight: PropTypes.number.isRequired,
};

export default AppointmentsList;
