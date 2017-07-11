import React from "react";

import Spinner from "../../../../svgs/spinner.svg";
import styles from "./noSlotsFiller.css";

const NoSlotsFiller = () => (
  <div className={styles.container}>
    <Spinner className={styles.spinner} />
  </div>
);

export default NoSlotsFiller;
