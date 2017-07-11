import React from "react";

import styles from "./errorConfirming.css";
import ErrorConfirmingIcon from "../../../../svgs/ErrorConfirming.svg";
import CheckoutContent from "../CheckoutContent";
import Transition from "../../../../components/Transition";

const ErrorConfirming = () => (
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
    <div className={styles.iconContainer}><ErrorConfirmingIcon className={styles.icon} /></div>
    <CheckoutContent status="Appointment has not been canceled!" className={styles.content} />
  </Transition>
);

export default ErrorConfirming;
