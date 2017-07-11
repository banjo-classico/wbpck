import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";

/* eslint-disable max-len */
import { actions as headerActions } from "../../components/header/actions/actions";

import styles from "./patientSelectionPage.css";
import PatientSelection from "./components/PatientSelection";
import { actions as loginActions } from "../../ConsumerInterface/EntryPage/actions/actions";
import { actions as patientDetailsActions } from "../PatientDetailsPage/actions/actions";
import { actions as guardianDetailsActions } from "../GuardianshipPage/actions/actions";
import { actions as dependantActions } from "../../ConsumerInterface/DependantsPage/actions/actions";
import { routeConfig } from "../../routes";
/* eslint-enable max-len */

class PatientSelectionPage extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearGuardianDetails: PropTypes.func.isRequired,
    clearPatientDetails: PropTypes.func.isRequired,
    goToReasonForVisit: PropTypes.func.isRequired,
    goToPatientDetails: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    token: PropTypes.string,
    fetchDependants: PropTypes.func.isRequired,
    dependants: PropTypes.arrayOf(PropTypes.object),
    dateOfBirth: PropTypes.string,
    urlName: PropTypes.string,
    userProfile: PropTypes.object,
    addPatientDetails: PropTypes.func.isRequired,
    dependantsIsFetching: PropTypes.bool.isRequired,
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, help: true, arrow: true });
    this.props.addStyles([styles.header]);
    this.props.clearGuardianDetails();
    this.props.clearPatientDetails();
    this.props.fetchDependants(this.props.token);
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.displayHeaderIcons();
  }
  onDependantClick = (patient) => {
    // When clicking on dependant, we will use the dependants details and the
    // logged in user's mobile
    this.props.addPatientDetails(
      {
        name: patient.FirstName,
        surname: patient.LastName,
        birthday: patient.DateOfBirth,
        phone: this.props.userProfile.Mobile,
        dependantId: patient.Id,
      }
    );
    this.props.goToReasonForVisit();
  };
  handleLogOut = () => {
    this.props.logout(this.props.token, { path: "patientDetails" });
  }
  render() {
    const { firstName = "", lastName = "" } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.title}>
          <div className={styles.titleMain}>
            {`Hey ${firstName}, Welcome back!`}
          </div>
          <div className={styles.titleSecondary}>{"Who are you booking an appointment for?"}</div>
        </div>
        <PatientSelection
          userOnClick={this.props.goToReasonForVisit}
          dependantOnClick={this.onDependantClick}
          someoneElseOnClick={this.props.goToPatientDetails}
          userProfile={this.props.userProfile}
          dependantProfiles={this.props.dependants}
          dependantsFetching={this.props.dependantsIsFetching}
        />
        <a className={styles.logoutLine} onClick={this.handleLogOut}>
          {`Not ${firstName} ${lastName}? Log out`}
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token,
  urlName: state.practiceAppointmentReducer.practiceInfo.practice.UrlName,
  dependants: state.fetchDependantsReducer.dependants,
  firstName: state.profileReducer.profile.FirstName,
  lastName: state.profileReducer.profile.LastName,
  dateOfBirth: state.profileReducer.profile.DateOfBirth,
  userProfile: state.profileReducer.profile,
  dependantsIsFetching: state.fetchDependantsReducer.isFetching,
});
const mapDispatchToProps = dispatch => ({
  fetchDependants: bindActionCreators(dependantActions.fetchDependants, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  clearGuardianDetails: bindActionCreators(guardianDetailsActions.clearState, dispatch),
  clearPatientDetails: bindActionCreators(patientDetailsActions.clearDetails, dispatch),
  addPatientDetails: bindActionCreators(patientDetailsActions.addDetails, dispatch),
  /* eslint-disable max-len */
  goToReasonForVisit: () => bindActionCreators(push, dispatch)(routeConfig.reasonForVisit.getBrowserPath()),
  goToPatientDetails: () => bindActionCreators(push, dispatch)(routeConfig.patientDetails.getBrowserPath()),
  /* eslint-enable max-len */
  logout: bindActionCreators(loginActions.logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientSelectionPage);
