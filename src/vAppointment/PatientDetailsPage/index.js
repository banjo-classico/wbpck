import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classnames from "classnames";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as patientDetailsActions } from "./actions/actions";
import { actions as guardianDetailsActions } from "../GuardianshipPage/actions/actions";
import { actions as popUpActions } from "../PracticeProfilePage/actions/popUpActions";
import { actions as enrollmentActions } from "../PatientSelectionPage/actions/actions";
import EnrolledErrorPopUp from "../PatientSelectionPage/components/EnrolledErrorPopUp";
import ReasonForVisit from "../FeelingPage";
import SignInPage from "../SignInPage";
import PatientDetailsForm from "./components/PatientDetailsForm";
import GuardianDetails from "./components/GuardianDetails";
import GuardianshipPage from "../GuardianshipPage";
import PatientSelectionPage from "../PatientSelectionPage/components/DesktopPage";
import styles from "./patientDetailsPage.css";
import { isDesktop } from "../../config";
import { routeConfig } from "../../routes";
import { practicePropType } from "../PracticeProfilePage/propTypes";

class PatientDetailsPage extends Component {

  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    addDetails: PropTypes.func.isRequired,
    goToReasonForVisit: PropTypes.func.isRequired,
    goToGuardianshipPage: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
    checkEnrollment: PropTypes.func.isRequired,
    goToPatientSelection: PropTypes.func.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    isChecking: PropTypes.bool.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearGuardianDetails: PropTypes.func.isRequired,
    closePopUp: PropTypes.func.isRequired,
    isBookingForSomeoneElse: PropTypes.bool.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthday: PropTypes.string,
    phone: PropTypes.string,
    time: PropTypes.string,
    doctorId: PropTypes.string,
    enrolledError: PropTypes.object,
    practice: practicePropType,
    token: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.showGuardianDetails = this.showGuardianDetails.bind(this);
    this.hideGuardianDetails = this.hideGuardianDetails.bind(this);
    this.hideErrorPopUp = this.hideErrorPopUp.bind(this);
  }
  state = {
    showGuardianDetails: false,
    showErrorPopUp: false,
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.addStyles([styles.header]);
      this.props.displayHeaderIcons({ menu: false, help: true, arrow: true });
      this.props.clearGuardianDetails();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.enrolledError !== this.props.enrolledError) {
      this.setState({ showErrorPopUp: true });
    }
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.clearStyles();
      this.props.displayHeaderIcons();
    }
  }
  showGuardianDetails(details) {
    this.props.addDetails(details);
    if (isDesktop()) {
      this.props.goToGuardianshipPage();
    } else {
      this.setState({ showGuardianDetails: true });
    }
  }
  hideGuardianDetails() {
    this.setState({ showGuardianDetails: false });
  }
  hideErrorPopUp() {
    this.setState({ showErrorPopUp: false });
  }
  render() {
    return (
      <div
        className={classnames(
        styles.patientDetailsPage,
        { [styles.loggedIn]: this.props.token }
      )}
      >
        {
          this.state.showGuardianDetails ?
            <GuardianDetails onCancel={this.hideGuardianDetails} /> : null
        }
        <PatientDetailsForm
          addDetails={this.props.addDetails}
          goToReasonForVisit={this.props.goToReasonForVisit}
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          birthday={this.props.birthday}
          phone={this.props.phone}
          time={this.props.time}
          doctorId={this.props.doctorId}
          practiceId={this.props.practice.Id}
          isBookingForSomeoneElse={this.props.isBookingForSomeoneElse}
          addGuardianDetails={this.showGuardianDetails}
          clearGuardianDetails={this.props.clearGuardianDetails}
          isLoggedIn={this.props.token}
          login={this.props.goToLogin}
          checkEnrollment={this.props.checkEnrollment}
          isEnrolled={this.props.isEnrolled}
          isChecking={this.props.isChecking}
          goToPatientSelection={this.props.goToPatientSelection}
        />
        {
          this.state.showErrorPopUp && isDesktop() &&
            <EnrolledErrorPopUp
              closePopUp={this.hideErrorPopUp}
              practice={this.props.practice}
              error={this.props.enrolledError}
              goToBooking={this.props.closePopUp}
            />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  firstName: state.patientDetailsReducer.patientDetails.name,
  lastName: state.patientDetailsReducer.patientDetails.surname,
  birthday: state.patientDetailsReducer.patientDetails.birthday,
  phone: state.patientDetailsReducer.patientDetails.phone,
  isBookingForSomeoneElse: state.loginReducer.token !== null,
  enrolledError: state.checkEnrollmentReducer.error,
  isChecking: state.checkEnrollmentReducer.isChecking,
  isEnrolled: state.checkEnrollmentReducer.isEnrolled,
  practice: isDesktop() ?
    state.practiceProfileReducer.profile :
    state.practiceAppointmentReducer.practiceInfo.practice,
  time: state.practiceAppointmentReducer.selectedTime.time,
  doctorId: state.practiceAppointmentReducer.selectedTime.doctorId,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addDetails: bindActionCreators(patientDetailsActions.addDetails, dispatch),
  clearGuardianDetails: bindActionCreators(guardianDetailsActions.clearState, dispatch),
  checkEnrollment: bindActionCreators(enrollmentActions.checkEnrolledPatient, dispatch),
  closePopUp: bindActionCreators(popUpActions.closePopUp, dispatch),
  // eslint-disable-next-line max-len
  goToPatientSelection: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<PatientSelectionPage />),
  goToReasonForVisit: () => {
    // eslint-disable-next-line max-len
    if (isDesktop()) bindActionCreators(popUpActions.setMainComponent, dispatch)(<ReasonForVisit />);
    else bindActionCreators(push, dispatch)(routeConfig.reasonForVisit.getBrowserPath());
  },
  // eslint-disable-next-line max-len
  goToGuardianshipPage: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<GuardianshipPage />),
  goToLogin: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<SignInPage />),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailsPage);
export {
  styles,
};
