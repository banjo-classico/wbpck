import React from "react";

import styles from "./whoops.css";
import kiwiIcon from "../../../../images/WhoopsKiwi.png";

const Whoops = () => (
  <div className={styles.container}>
    <div className={styles.heading}>Whoops</div>
    <img src={kiwiIcon} alt="whoops" className={styles.icon} />
  </div>
);

export default Whoops;
