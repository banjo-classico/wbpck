import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import moment from "moment";
import { find } from "lodash/fp";

import PatientDetailsPage from "../PatientDetailsPage";
import SignInPage from "../SignInPage";
import AppointmentInfo from "../../AutoRegisterPage/components/AppointmentInfo";
import styles from "./loginTriage.css";
import autoRegisterImg from "../../images/autoRegisterImg.png";
import { actions as popUpActions } from "../PracticeProfilePage/actions/popUpActions";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { DoctorProfilePropType } from "../../vAppointment/PracticeBookingPage/propTypes";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";

export class LoginTriage extends Component {
  static propTypes = {
    addAppStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    setHeadingSecondLine: PropTypes.func.isRequired,
    clearSecondLine: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    goToPatientDetails: PropTypes.func.isRequired,
    goToSignIn: PropTypes.func.isRequired,
    appointment: PropTypes.instanceOf(moment).isRequired,
    doctor: DoctorProfilePropType.isRequired,
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.addAppStyles([styles.app]);
      this.props.displayHeaderIcons({ menu: false, arrow: true, help: true });
      this.props.addStyles([styles.header]);
      this.props.setHeadingSecondLine(
        <AppointmentInfo
          doctor={this.props.doctor}
          appointment={this.props.appointment}
        />
      );
    }
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.clearAppStyles();
      this.props.displayHeaderIcons();
      this.props.clearStyles();
      this.props.clearSecondLine();
    }
  }
  render() {
    return (
      <div
        className={styles.container}
        style={isDesktop() ? null : {
          backgroundImage: `url(${autoRegisterImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.welcome}>
          <div className={styles.tenakoe}>T&#275;n&#257; koe</div>
          <div>Welcome to Vensa</div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.newButton}
            onClick={this.props.goToPatientDetails}
          >
            I&#39;m new here
          </button>
          <button className={styles.loginButton} onClick={this.props.goToSignIn}>Log In</button>
        </div>
        <div className={styles.emergencyWarning}>
          If this is a medical emergency, please call 111 for an ambulance.
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  doctor: find(({ PmsUserId }) =>
      PmsUserId === state.practiceAppointmentReducer.selectedTime.doctorId,
      state.practiceAppointmentReducer.doctorInfo.doctors),
  appointment: moment(state.practiceAppointmentReducer.selectedTime.time),
});
const mapDispathToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  setHeadingSecondLine: bindActionCreators(headerActions.setSecondLine, dispatch),
  clearSecondLine: bindActionCreators(headerActions.clearSecondLine, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  goToSignIn: () => {
    // eslint-disable-next-line max-len
    if (isDesktop()) bindActionCreators(popUpActions.setMainComponent, dispatch)(<SignInPage />);
    else bindActionCreators(push, dispatch)(routeConfig.signIn.getBrowserPath());
  },
  goToPatientDetails: () => {
    // eslint-disable-next-line max-len
    if (isDesktop()) bindActionCreators(popUpActions.setMainComponent, dispatch)(<PatientDetailsPage />);
    else bindActionCreators(push, dispatch)(routeConfig.patientDetails.getBrowserPath());
  },
});

export default connect(mapStateToProps, mapDispathToProps)(LoginTriage);
