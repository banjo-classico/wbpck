import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./stillConfirming.css";
import MainContent from "../MainContent";
import WaitTime from "../WaitTime";
import Transition from "../../../../components/Transition";

const StillConfirming = ({ isBusy, onClick }) => (
  <Transition
    className={classnames(styles.confirmingContent, { [styles.confirmingBusy]: isBusy })}
  >
    { isBusy ?
      <MainContent
        className={styles.notConfirmed}
        key="1"
        status="Looks like our server's a bit busy..."
      >
        <WaitTime onClick={onClick} />
      </MainContent> :
      <MainContent
        className={styles.notConfirmed}
        key="2"
        status="Hold on!"
        description="We're just booking your appointment."
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
