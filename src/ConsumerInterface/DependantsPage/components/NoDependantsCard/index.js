import React from "react";

import styles from "./noDependantsCard.css";

const NoDependantsCard = () => (
  <div className={styles.container}>
    <div className={styles.title}>No dependants added yet</div>
    <div className={styles.text}>You have no dependants added to your social circle yet.</div>
    <div className={styles.text}>
      By adding your dependants,
      you will be able to book appointments and other services on their behalf.
    </div>
  </div>
);

NoDependantsCard.propTypes = {

};

export default NoDependantsCard;
