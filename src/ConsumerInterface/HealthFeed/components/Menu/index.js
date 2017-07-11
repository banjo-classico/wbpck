import React from "react";
import PropTypes from "prop-types";

import appointmentsIcon from "../../../../images/appointments.png";
import addDependant from "../../../../images/addDependant.png";
import addPractice from "../../../../images/addPractice.png";
// import orderScript from "../../../../images/orderScript.png";
import styles from "./menu.css";

const createMenuButton = (icon, label, onClickFn) => (
  <a key={label} className={styles.button} onClick={onClickFn}>
    {icon}<span className={styles.buttonText}>{label}</span>
  </a>
);

const Menu = ({
  appointmentsFn,
  dependantFn,
  practiceListingFn,
}) => (
  <div className={styles.container}>
    {
      createMenuButton(
        <img src={appointmentsIcon} className={styles.icon} alt="img" />,
        "Make an Appointment",
        appointmentsFn
      )
    }
    {
      createMenuButton(
        <img src={addDependant} className={styles.icon} alt="img" />,
        "Add a Dependant",
        dependantFn
      )
    }
    {
      createMenuButton(
        <img src={addPractice} className={styles.icon} alt="img" />,
        "Add a Practice",
        practiceListingFn,
      )
    }
  </div>
);
// {
//   createMenuButton(
//     <img src={orderScript} className={styles.icon} alt="img" />,
//     "Order a Repeat Script",
//     scriptFn,
//   )
// }

Menu.propTypes = {
  appointmentsFn: PropTypes.func.isRequired,
  dependantFn: PropTypes.func.isRequired,
  practiceListingFn: PropTypes.func.isRequired,
  // scriptFn: PropTypes.func.isRequired,
};

export default Menu;
