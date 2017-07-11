import React from "react";
import classnames from "classnames";

import styles from "./practiceContact.css";
import { GOOGLE_API_KEY } from "../../../../config";
import { practicePropType } from "../../propTypes";

const PracticeContact = ({ practice }) => (
  practice.Address ?
    <div className={styles.outerContainer}>
      <div className={classnames(styles.container, styles.directionsContainer)}>
        <a
          className={styles.directions}
          href={`https://www.google.co.nz/maps/place/${practice.Address}`}
        >
        Get Directions
      </a>
      </div>
      <div className={classnames(styles.container, styles.map)}>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${practice.Address}`}
          className={styles.iframe}
        />
      </div>
    </div> : null
);


PracticeContact.propTypes = {
  practice: practicePropType.isRequired,
};

export default PracticeContact;
