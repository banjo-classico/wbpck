import React from "react";
import PropTypes from "prop-types";

import ButtonContainer from "../../../../components/ButtonContainer";
import styles from "./cancelAppointmentPopUp.css";

const CancelAppointmentPopUp = ({ toggleClicked, closePopUp }) => (
  <div className={styles.outerContainer}>
    <div className={styles.container}>
      <div className={styles.text}>Are you sure you want to cancel this appointment?</div>
      <ButtonContainer
        leftButtonText="Yes"
        onLeftButtonClick={closePopUp}
        rightButtonText="No"
        onRightButtonClick={toggleClicked}
        containerStyle={styles.buttonContainer}
        leftButtonStyle={styles.yesButton}
        rightButtonStyle={styles.noButton}
      />
    </div>
  </div>
);

CancelAppointmentPopUp.propTypes = {
  toggleClicked: PropTypes.func.isRequired,
  closePopUp: PropTypes.func.isRequired,
};

export default CancelAppointmentPopUp;
