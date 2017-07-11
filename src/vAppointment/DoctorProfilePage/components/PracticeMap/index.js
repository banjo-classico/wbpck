import React from "react";

import { GOOGLE_API_KEY } from "../../../../config";
import styles from "./practiceMap.css";
import Pin from "../../../../svgs/pin.svg";
import { practicePropType } from "../../../PracticeProfilePage/propTypes";

const PracticeMap = ({ clinic }) => (
  <div className={styles.container}>
    <div
      className={styles.sectionTitle}
    >{clinic.Name || "location currently unavailable"}</div>
    <div className={styles.address}>
      <Pin className={styles.pin} />{clinic.Address}
    </div>
    <div className={styles.map}>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${clinic.Address}`}
        className={styles.iframe}
      />
    </div>
  </div>
);

PracticeMap.propTypes = {
  clinic: practicePropType.isRequired,
};

export default PracticeMap;
