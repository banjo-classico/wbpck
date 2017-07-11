import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./desktopPopUp.css";
import Close from "../../../../svgs/close.svg";

const smallWindow = window.innerHeight < 700;

const DesktopPopUp = ({
  closePopUp,
  mainComponent,
  sideComponent,
  isDoctorProfile,
  shouldHideButton,
}) => (
  <div className={styles.container}>
    <div
      className={classnames(
      styles.popUpContainerOuter,
      { [styles.smallWindow]: smallWindow },
      { [styles.doctorProfile]: isDoctorProfile },
    )}
    >
      <div
        className={classnames(
        styles.popUpContainer,
        { [styles.makeAppointment]: !isDoctorProfile }
      )}
      >
        {sideComponent && sideComponent}
        <a
          className={classnames(styles.button, { [styles.hidden]: shouldHideButton })}
          onClick={closePopUp}
        >
          <Close className={styles.icon} />
        </a>
        <div
          className={classnames(
          styles.innerPopUpContainer,
          { [styles.topPadding]: !isDoctorProfile }
        )}
        >
          {mainComponent}
        </div>
      </div>
    </div>
  </div>
  );
DesktopPopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  mainComponent: PropTypes.node.isRequired,
  isDoctorProfile: PropTypes.bool.isRequired,
  shouldHideButton: PropTypes.bool.isRequired,
  sideComponent: PropTypes.node,
};

export default DesktopPopUp;
