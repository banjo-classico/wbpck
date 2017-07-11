import React from "react";

import styles from "./confirmed.css";
import Tick from "../../../../svgs/bigTick.svg";
import MainContent from "../MainContent";
import Transition from "../../../../components/Transition";

const Confirmed = () => (
  <Transition
    className={styles.container}
    component="div"
    transitionAppearTimeout={1500}
    transitionEnterTimeout={1800}
    transitionLeaveTimeout={1500}
    transitionAppear
    transitionName={{
      enter: styles.enter,
      enterActive: styles.enterActive,
      appear: styles.enter,
      appearActive: styles.enterActive,
      leave: styles.leave,
      leaveActive: styles.leaveActive,
    }}
  >
    <div className={styles.tickContainer}><Tick className={styles.tickIcon} /></div>
    <MainContent status="Confirmed!" className={styles.content} />
  </Transition>
);

export default Confirmed;
