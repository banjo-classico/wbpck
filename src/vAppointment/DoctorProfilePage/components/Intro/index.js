import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./intro.css";

const Intro = ({ url, name, title, blurb, goToPracticeBooking, practiceId, hideButton }) => (
  <div className={styles.container}>
    <div className={styles.nameContainer}>
      <img src={url} className={styles.img} alt="doctor" />
      <span className={styles.name}>{name}</span>
      <span className={styles.drType}>{title}</span>
    </div>
    <button
      className={classnames(styles.button, { [styles.hide]: hideButton })}
      onClick={() => goToPracticeBooking(practiceId)}
    >
      Book An Appointment
    </button>
    <span className={classnames(styles.blurb, { [styles.padding]: hideButton })}>{blurb}</span>
  </div>
);

Intro.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  practiceId: PropTypes.string.isRequired,
  goToPracticeBooking: PropTypes.func.isRequired,
  hideButton: PropTypes.bool.isRequired,
};

export default Intro;
