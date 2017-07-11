import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./checkout.css";
import Confirmed from "../Confirmed";
import StillConfirming from "../StillConfirming";
import ErrorConfirming from "../ErrorConfirming";
import Transition from "../../../../components/Transition";
import loadingGif from "../../../../images/LoadingGif.gif";

const Checkout = ({ confirmed, error, isBusy, toggleCheckout }) => (
  <Transition
    className={classnames(
    styles.container,
    { [styles.containerBusy]: isBusy }
  )}
  >
    {
      !confirmed &&
      !error &&
      <img
        key="0"
        alt="canceling appointment"
        className={classnames(
          styles.loadingGif,
          { [styles.gifBusy]: isBusy }
        )}
        src={loadingGif}
      />
    }
    {(() => {
      if (confirmed) return <Confirmed key="1" />;
      if (error) return <ErrorConfirming key="2" />;
      return (<StillConfirming
        key="3"
        isBusy={isBusy}
        onClick={toggleCheckout}
      />);
    })()}
  </Transition>
);

Checkout.propTypes = {
  toggleCheckout: PropTypes.func.isRequired,
  confirmed: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isBusy: PropTypes.bool.isRequired,
};

export default Checkout;
