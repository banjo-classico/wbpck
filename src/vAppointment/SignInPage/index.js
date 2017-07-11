import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push, replace } from "react-router-redux";
import moment from "moment";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as loginActions } from "../../ConsumerInterface/EntryPage/actions/actions";
import { actions as popUpActions } from "../PracticeProfilePage/actions/popUpActions";
import SelectionDesktopPage from "../PatientSelectionPage/components/DesktopPage";
import PatientDetailsPage from "../PatientDetailsPage";
import RequestNewPasswordPage from "../RequestNewPasswordPage";
import SignInForm from "./components/SignInForm";
import AppointmentInfo from "../../AutoRegisterPage/components/AppointmentInfo";
import LoadingSpinner from "../../components/loadingSpinner";
import autoRegisterImg from "../../images/autoRegisterImg.png";
import styles from "./signInPage.css";
import { DoctorProfilePropType } from "../../vAppointment/PracticeBookingPage/propTypes";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";
import { findDoctor } from "../../selectors/appointmentSelectors";

class SignInPage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    clearSecondLine: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    setHeadingSecondLine: PropTypes.func.isRequired,
    goPatientDetails: PropTypes.func.isRequired,
    replaceFeeling: PropTypes.func.isRequired,
    goPatientSelection: PropTypes.func.isRequired,
    goToPatientDetails: PropTypes.func.isRequired,
    goForgotPassword: PropTypes.func.isRequired,
    goRegister: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearSideComponent: PropTypes.func.isRequired,
    doctor: DoctorProfilePropType.isRequired,
    setPopUpComponent: PropTypes.func,
    isError: PropTypes.bool,
    profileId: PropTypes.string,
    appointment: PropTypes.string,
    token: PropTypes.string,
  }
  componentWillMount() {
    if (this.props.token) {
      this.props.replaceFeeling();
    }
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.addAppStyles([styles.app]);
      this.props.addStyles([styles.heading]);
      this.props.displayHeaderIcons({ menu: false, arrow: true, help: true });
      this.props.setHeadingSecondLine(
        <AppointmentInfo
          doctor={this.props.doctor}
          appointment={this.props.appointment}
        />
      );
    }
  }
  componentDidUpdate() {
    if (this.props.profileId && !isDesktop()) this.props.goPatientSelection();
    if (this.props.profileId && isDesktop()) this.props.setPopUpComponent(<SelectionDesktopPage />);
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.clearHeading();
      this.props.clearSecondLine();
      this.props.displayHeaderIcons();
      this.props.clearStyles();
      this.props.clearAppStyles();
    }
  }
  render() {
    return (
      <LoadingSpinner
        isFetching={this.props.isLoggingIn}
        containerClassName={styles.container}
        overlayClassName={styles.overlay}
        iconClassName={styles.spinner}
        component="div"
        style={isDesktop() ? null : {
          backgroundImage: `url(${autoRegisterImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isDesktop() ?
          <div className={styles.welcome}>
            <div className={styles.kiaOra}>Kia ora, Welcome back!</div>
            <div>
              Enter your details to log in to your Vensa account
            </div>
          </div> : null
        }
        <SignInForm
          login={this.props.login}
          isError={this.props.isError}
          isLoggingIn={this.props.isLoggingIn}
          goForgotPassword={this.props.goForgotPassword}
          clearSideComponent={this.props.clearSideComponent}
          goToPatientDetails={this.props.goToPatientDetails}
        />
      </LoadingSpinner>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  isError: state.loginReducer.error || state.profileReducer.error,
  isLoggingIn: state.loginReducer.isFetching || state.profileReducer.isFetching,
  profileId: state.profileReducer.profile.Id,
  appointment: moment(state.practiceAppointmentReducer.selectedTime.time),
  doctor: findDoctor(
    state.practiceAppointmentReducer.selectedTime.doctorId,
    state.practiceAppointmentReducer.doctorInfo.doctors.length ?
    state.practiceAppointmentReducer.doctorInfo.doctors :
    state.practiceProfileReducer.profile.Doctors,
  ),
});
const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(loginActions.login, dispatch),
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  clearSecondLine: bindActionCreators(headerActions.clearSecondLine, dispatch),
  setHeadingSecondLine: bindActionCreators(headerActions.setSecondLine, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  setPopUpComponent: bindActionCreators(popUpActions.setMainComponent, dispatch),
  clearSideComponent: bindActionCreators(popUpActions.clearSideComponent, dispatch),
  // eslint-disable-next-line max-len
  goPatientSelection: () => bindActionCreators(push, dispatch)(routeConfig.patientSelection.getBrowserPath()),
  // eslint-disable-next-line max-len
  replaceFeeling: () => bindActionCreators(replace, dispatch)(routeConfig.reasonForVisit.getBrowserPath()),
  goToPatientDetails: () => {
    // eslint-disable-next-line max-len
    if (isDesktop()) bindActionCreators(popUpActions.setMainComponent, dispatch)(<PatientDetailsPage />);
    else bindActionCreators(push, dispatch)(routeConfig.patientDetails.getBrowserPath());
  },
  goForgotPassword: () => {
    // eslint-disable-next-line max-len
    if (isDesktop()) bindActionCreators(popUpActions.setMainComponent, dispatch)(<RequestNewPasswordPage />);
    else bindActionCreators(push, dispatch)(routeConfig.passwordReset.getBrowserPath());
  },
  goRegister: () => bindActionCreators(push, dispatch)(routeConfig.register.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
export {
  styles,
};
