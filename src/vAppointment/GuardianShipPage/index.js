import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as guardianActions } from "./actions/actions";
import { actions as minorActions } from "../PatientDetailsPage/actions/actions";
import { actions as popUpActions } from "../PracticeProfilePage/actions/popUpActions";
import { actions as enrollmentActions } from "../PatientSelectionPage/actions/actions";
import EnrolledErrorPopUp from "../PatientSelectionPage/components/EnrolledErrorPopUp";
import ReasonForVisit from "../FeelingPage";
import PatientDetailsPage from "../PatientDetailsPage";
import TnC from "../../components/TnC";
import DetailsForm from "./components/DetailsForm";
import DesktopPatientDetails from "./components/DesktopPatientDetails";
import DesktopGuardianForm from "./components/DesktopGuardianForm";
import CtaButton from "../../components/CtaButton";
import styles from "./guardianshipPage.css";
import { guardianPropType, patientPropType } from "./propTypes";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";
import { practicePropType } from "../PracticeProfilePage/propTypes";

class GuardianshipPage extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    goToFeeling: PropTypes.func.isRequired,
    goToPatientDetails: PropTypes.func.isRequired,
    goToReasonForVisit: PropTypes.func.isRequired,
    addMinorDetails: PropTypes.func.isRequired,
    addGuardianDetails: PropTypes.func.isRequired,
    minorDetails: patientPropType.isRequired,
    guardianDetails: guardianPropType.isRequired,
    checkEnrollment: PropTypes.func.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    isChecking: PropTypes.bool.isRequired,
    enrolledError: PropTypes.object,
    practice: practicePropType,
    time: PropTypes.string,
    doctorId: PropTypes.string,

  }
  constructor(props) {
    super(props);
    this.handleMinorSubmit = this.handleMinorSubmit.bind(this);
    this.hideErrorPopUp = this.hideErrorPopUp.bind(this);
  }
  state = {
    conditionError: null,
    showErrorPopUp: false,
    minorFormValid: false,
    guardianFormValid: false,
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.displayHeaderIcons({ menu: false, help: true, arrow: true });
      this.props.addStyles([styles.header]);
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
  onSubmit = (e) => {
    if (this.minorForm.form.handleSubmit(e) && this.guardianForm.form.handleSubmit(e)) {
      this.props.goToFeeling();
    }
  }
  onValid = (target) => (boolean) => {
    if (target === "minor") this.setState({ minorFormValid: boolean });
    else if (target === "guardian") this.setState({ guardianFormValid: boolean });
  }
  handleMinorSubmit(e) {
    return this.minorForm.handleSubmit(e);
  }
  hideErrorPopUp() {
    this.setState({ showErrorPopUp: false });
  }
  // activateButton = () => {
  //   this.setState({ formsAreValid: true});
  // }
  render() {
    return (
      <div className={styles.container}>
        {isDesktop() ?
          <div className={styles.desktopContainer}>
            <DesktopPatientDetails
              onClick={this.props.goToPatientDetails}
              ref={c => { this.minorForm = c; }}
              details={this.props.minorDetails}
              submit={this.props.addMinorDetails}
              onlyUnderAge
              allowUnderage
            />
            <DesktopGuardianForm
              details={this.props.guardianDetails}
              minorDetails={this.props.minorDetails}
              addDetails={this.props.addGuardianDetails}
              goToReasonForVisit={this.props.goToReasonForVisit}
              handleMinorSubmit={this.handleMinorSubmit}
              time={this.props.time}
              practiceId={this.props.practice.Id}
              doctorId={this.props.doctorId}
              checkEnrollment={this.props.checkEnrollment}
              isEnrolled={this.props.isEnrolled}
              isChecking={this.props.isChecking}
              isBookingForSomeoneElse
            />
          </div> :
          <div className={styles.mobileContainer}>
            <DetailsForm
              ref={c => { this.minorForm = c; }}
              title="Patient Details"
              details={this.props.minorDetails}
              onlyUnderAge
              allowUnderage
              phoneRequired={false}
              activateButton={this.activateButton}
              onSubmit={this.props.addMinorDetails}
              onValid={this.onValid("minor")}
              isValid={this.state.minorFormValid}
            />
            <DetailsForm
              ref={c => { this.guardianForm = c; }}
              title="Guardian Details"
              details={this.props.guardianDetails}
              onlyUnderAge={false}
              allowUnderage={false}
              activateButton={this.activateButton}
              onValid={this.onValid("guardian")}
              isValid={this.state.guardianFormValid}
              onSubmit={
            (details) =>
              this.props.addGuardianDetails(
                details.name,
                details.surname,
                details.birthday,
                details.phone,
              )
            }
            />
            <TnC className={styles.condition} />
            <CtaButton
              className={styles.cta}
              onClick={this.onSubmit}
              active={this.state.minorFormValid && this.state.guardianFormValid}
            />
          </div>
        }
        {
          this.state.showErrorPopUp && isDesktop() ?
            <EnrolledErrorPopUp closePopUp={this.hideErrorPopUp} practice={this.props.practice} /> :
            null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  minorDetails: state.patientDetailsReducer.patientDetails,
  guardianDetails: state.guardianDetailsReducer,
  time: state.practiceAppointmentReducer.selectedTime.time,
  doctorId: state.practiceAppointmentReducer.selectedTime.doctorId,
  practice: state.practiceProfileReducer.profile,
  enrolledError: state.checkEnrollmentReducer.error,
  isChecking: state.checkEnrollmentReducer.isChecking,
  isEnrolled: state.checkEnrollmentReducer.isEnrolled,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addMinorDetails: bindActionCreators(minorActions.addDetails, dispatch),
  addGuardianDetails: bindActionCreators(guardianActions.addDetails, dispatch),
  checkEnrollment: bindActionCreators(enrollmentActions.checkEnrolledPatient, dispatch),
  // eslint-disable-next-line max-len
  goToFeeling: () => bindActionCreators(push, dispatch)(routeConfig.reasonForVisit.getBrowserPath()),
  // eslint-disable-next-line max-len
  goToReasonForVisit: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<ReasonForVisit />),
  // eslint-disable-next-line max-len
  goToPatientDetails: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<PatientDetailsPage />),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuardianshipPage);
export {
  styles,
};
