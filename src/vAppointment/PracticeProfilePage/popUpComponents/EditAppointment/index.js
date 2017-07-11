import React, { Component } from "react";
import PropTypes from "prop-types";

import ButtonContainer from "../../../../components/ButtonContainer";
import CancelAppointmentPopUp from "../CancelAppointmentPopUp";
import styles from "./editAppointment.css";

class EditAppointment extends Component {
  static propTypes = {
    closePopUp: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.toggleClicked = this.toggleClicked.bind(this);
  }
  state = {
    cancelIsClicked: false,
  }
  toggleClicked() {
    this.setState({ cancelIsClicked: !this.state.cancelIsClicked });
  }
  render() {
    return (
      <div className={styles.container}>
        <ButtonContainer
          leftButtonText="Change Date or Time"
          onLeftButtonClick={this.props.closePopUp}
          rightButtonText="Cancel"
          onRightButtonClick={this.toggleClicked}
          containerStyle={styles.buttonContainer}
          leftButtonStyle={styles.buttons}
          rightButtonStyle={styles.buttons}
        />
        {
          this.state.cancelIsClicked &&
          <CancelAppointmentPopUp
            toggleClicked={this.toggleClicked}
            closePopUp={this.props.closePopUp}
          />
        }
      </div>
    );
  }
}

// <div className={styles.cancelContainer}>
//   <div>Are you sure you want to cancel this appointment?</div>
//   <ButtonContainer
//     leftButtonText="Yes"
//     onLeftButtonClick={this.props.closePopUp}
//     rightButtonText="No"
//     onRightButtonClick={this.toggleClicked}
//     buttonStyle={styles.cancelButtons}
//   />
// </div>

export default EditAppointment;
