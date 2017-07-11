import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";

/* eslint-disable max-len */
import styles from "./desktopPage.css";
import { actions as enrollmentActions } from "../../actions/actions";
import { actions as dependantActions } from "../../../../ConsumerInterface/DependantsPage/actions/actions";
import { actions as popUpActions } from "../../../PracticeProfilePage/actions/popUpActions";
import { actions as patientDetailsActions } from "../../../PatientDetailsPage/actions/actions";
import { actions as guardianDetailsActions } from "../../../GuardianshipPage/actions/actions";
import { actions as loginActions } from "../../../../ConsumerInterface/EntryPage/actions/actions";
// import LoadingSpinner from "../../../components/loadingSpinner";
import PatientSelection from "../PatientSelection";
import ReasonForVisit from "../../../FeelingPage";
import PatientDetailsPage from "../../../PatientDetailsPage";
import EnrolledErrorPopUp from "../EnrolledErrorPopUp";
import LoginTriage from "../../../LoginTriage/";
import { routeConfig } from "../../../../routes";
import { isDesktop } from "../../../../config";
import { practicePropType } from "../../../PracticeProfilePage/propTypes";
/* eslint-enable max-len */

class SelectionDesktopPage extends Component {
  static propTypes = {
    clearGuardianDetails: PropTypes.func.isRequired,
    clearPatientDetails: PropTypes.func.isRequired,
    goToReasonForVisit: PropTypes.func.isRequired,
    checkEnrolledPatient: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    dateOfBirth: PropTypes.string,
    time: PropTypes.string,
    enrolledError: PropTypes.string,
    doctorId: PropTypes.string,
    practice: practicePropType,
    isEnrolled: PropTypes.bool,
    fetchDependants: PropTypes.func.isRequired,
    token: PropTypes.string,
    dependants: PropTypes.arrayOf(PropTypes.object),
    userProfile: PropTypes.object.isRequired,
    addPatientDetails: PropTypes.func.isRequired,
    goToPatientDetails: PropTypes.func.isRequired,
    goToLoginTriage: PropTypes.func.isRequired,
    goToBooking: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    dependantsIsFetching: PropTypes.bool.isRequired,
    urlName: PropTypes.string,
  };
  state = {
    showErrorPopUp: false,
  }
  componentDidMount() {
    this.props.fetchDependants(this.props.token);
    this.props.clearGuardianDetails();
    this.props.clearPatientDetails();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.enrolledError !== this.props.enrolledError) {
      this.setState({ showErrorPopUp: true });
    }
    if (nextProps.isEnrolled !== this.props.isEnrolled) {
      this.props.goToReasonForVisit();
    }
  }
  onDependantClick = (patient) => {
    // When clicking on dependant, we will use the dependants details and the
    // logged in user's mobile
    this.props.addPatientDetails(
      {
        dependantId: patient.Id,
        name: patient.FirstName,
        surname: patient.LastName,
        birthday: patient.DateOfBirth,
        phone: this.props.userProfile.Mobile,
      }
    );
    this.props.checkEnrolledPatient(
      patient.FirstName,
      patient.LastName,
      patient.DateOfBirth,
      this.props.userProfile.Mobile,
      this.props.time,
      this.props.practice.Id,
      this.props.doctorId,
    );
  }
  onLogoutClick = () => {
    this.props.logout(
      this.props.token,
      { path: "practiceProfile", id: this.props.urlName }
    );
    this.props.goToLoginTriage();
  }
  hideErrorPopUp = () => {
    this.setState({ showErrorPopUp: null });
  }
  handleEnrollmentCheck = () => {
    this.props.checkEnrolledPatient(
      this.props.firstName,
      this.props.lastName,
      this.props.dateOfBirth,
      this.props.phone,
      this.props.time,
      this.props.practice.Id,
      this.props.doctorId,
    );
  }
  render() {
    return (
      <div className={styles.page}>
        <div className={styles.innerContainer}>
          <div className={styles.greetingContainer}>
            <div className={styles.greeting}>{`Hey ${this.props.firstName}, Welcome back!`}</div>
            <div className={styles.title}>Who are you booking an appointment for?</div>
          </div>
          <PatientSelection
            userProfile={this.props.userProfile}
            dependantProfiles={this.props.dependants}
            userOnClick={this.handleEnrollmentCheck}
            dependantOnClick={this.onDependantClick}
            someoneElseOnClick={this.props.goToPatientDetails}

            dependantsFetching={this.props.dependantsIsFetching}
          />
          <div
            className={styles.logoutText}
            onClick={this.onLogoutClick}
          >
            {`Not ${this.props.userProfile.FirstName} ${this.props.userProfile.LastName}? Log out`}
          </div>
        </div>
        {
          this.state.showErrorPopUp && isDesktop() ?
            <EnrolledErrorPopUp
              closePopUp={this.hideErrorPopUp}
              practice={this.props.practice}
              error={this.props.enrolledError}
              goToBooking={this.props.goToBooking}
            /> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  urlName: state.practiceAppointmentReducer.practiceInfo.practice.UrlName,
  token: state.loginReducer.token,
  dependants: state.fetchDependantsReducer.dependants,
  dependantsIsFetching: state.fetchDependantsReducer.isFetching,
  practice: state.practiceProfileReducer.profile,
  doctorId: state.practiceAppointmentReducer.selectedTime.doctorId,
  time: state.practiceAppointmentReducer.selectedTime.time,
  userProfile: state.profileReducer.profile,
  firstName: state.profileReducer.profile.FirstName || undefined,
  lastName: state.profileReducer.profile.LastName || undefined,
  dateOfBirth: state.profileReducer.profile.DateOfBirth,
  phone: state.profileReducer.profile.Mobile,
  enrolledError: state.checkEnrollmentReducer.error,
  isChecking: state.checkEnrollmentReducer.isChecking,
  isEnrolled: state.checkEnrollmentReducer.isEnrolled,
});
const mapDispatchToProps = dispatch => ({
  fetchDependants: bindActionCreators(dependantActions.fetchDependants, dispatch),
  clearGuardianDetails: bindActionCreators(guardianDetailsActions.clearState, dispatch),
  addPatientDetails: bindActionCreators(patientDetailsActions.addDetails, dispatch),
  clearPatientDetails: bindActionCreators(patientDetailsActions.clearDetails, dispatch),
  checkEnrolledPatient: bindActionCreators(enrollmentActions.checkEnrolledPatient, dispatch),
  /* eslint-disable max-len */
  goToReasonForVisit: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<ReasonForVisit />),
  goToPatientDetails: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<PatientDetailsPage />),
  logout: bindActionCreators(loginActions.logout, dispatch),
  goToLoginTriage: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<LoginTriage />),
  goToBooking: id => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
  /* eslint-enable max-len */
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionDesktopPage);
