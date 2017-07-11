import React from "react";

import loadingGif from "../../../../images/LoadingGif.gif";
import styles from "./pending.css";

const Pending = () => (
  <div className={styles.container}>
    <img src={loadingGif} className={styles.gif} alt="processing..." />
  </div>
);

Pending.propTypes = {

};

export default Pending;
