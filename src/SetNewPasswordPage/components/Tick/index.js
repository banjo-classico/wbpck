import React from "react";

import TickIcon from "../../../svgs/bigTick.svg";
import styles from "./tick.css";

const Tick = () => (
  <div className={styles.container}>
    <TickIcon className={styles.tick} />
  </div>
);

export default Tick;
