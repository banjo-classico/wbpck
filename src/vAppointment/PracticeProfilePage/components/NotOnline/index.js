import React from "react";

import styles from "./notOnline.css";
import { practicePropType } from "../../propTypes";

const NotOnline = ({ clinic }) => (
  <div className={styles.container}>
    <div>{`${clinic.Name} is offline for appointment bookings, please try again later.`}</div>
  </div>
);

NotOnline.propTypes = {
  clinic: practicePropType.isRequired,
};

export default NotOnline;
