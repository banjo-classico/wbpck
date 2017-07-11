import React from "react";
import PropTypes from "prop-types";

import styles from "./emptyFeedCard.css";
import WelcomeKiwi from "../../../../svgs/welcomeKiwi.svg";
import AppointmentKiwi from "../../../../svgs/appointmentKiwi.svg";

const EmptyFeedCard = ({ name, isFirstTime, toggleMenu }) => (
  <div className={styles.container}>
    {
        isFirstTime ?
          <WelcomeKiwi className={styles.kiwi} /> :
          <AppointmentKiwi className={styles.kiwi} />
      }
    <div className={styles.welcome}>
      {
          isFirstTime ?
            `Hey ${name}, welcome to Vensa!` :
            `Kia ora ${name}!`
        }
    </div>
    <button onClick={toggleMenu} className={styles.bookButton}>
      {
        isFirstTime ?
          "Click here to make your first appointment." :
          "Need to make an appointment?"
      }
    </button>
  </div>
  );

EmptyFeedCard.propTypes = {
  name: PropTypes.string.isRequired,
  isFirstTime: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default EmptyFeedCard;
