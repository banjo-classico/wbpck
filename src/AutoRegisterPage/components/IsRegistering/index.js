import React from "react";

import styles from "./isRegistering.css";
import LoadingSpinner from "../../../components/loadingSpinner";

const IsRegistering = () => (
  <div className={styles.container}>
    <LoadingSpinner
      isFetching
      containerClassName={styles.spinnerContainer}
      iconClassName={styles.spinner}
      children={<div />}
    />
    <div className={styles.text}>Registering you now...</div>
  </div>
);

export default IsRegistering;
