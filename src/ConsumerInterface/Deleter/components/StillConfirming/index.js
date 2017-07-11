import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./stillConfirming.css";
import CheckoutContent from "../CheckoutContent";
import WaitTime from "../WaitTime";
import Transition from "../../../../components/Transition";

const StillConfirming = ({ isBusy, onClick }) => (
  <Transition
    className={classnames(styles.confirmingContent, { [styles.confirmingBusy]: isBusy })}
  >
    { isBusy ?
      <CheckoutContent
        className={styles.notConfirmed}
        key="1"
        status="Looks like our server's a bit busy..."
      >
        <WaitTime onClick={onClick} />
      </CheckoutContent> :
      <CheckoutContent
        className={styles.notConfirmed}
        key="2"
        status="Hold on!"
        description="We are canceling your appointment."
      />
    }
  </Transition>
);
StillConfirming.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StillConfirming;
export {
  styles,
};
