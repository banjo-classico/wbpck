import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import { push, goBack } from "react-router-redux";
import classnames from "classnames";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as feelingActions } from "./actions/actions";
import { actions as popUpActions } from "../PracticeProfilePage/actions/popUpActions";
import {
  sessionState,
  sessionDispatch,
  allSessionProps,
} from "../../selectors/sessionSelectors";
import { findDoctor } from "../../selectors/appointmentSelectors";
import styles from "./feelingPage.css";
import PatientDetailsPage from "../PatientDetailsPage";
import GuardianshipPage from "../GuardianshipPage";
import DesktopSelectionPage from "../PatientSelectionPage/components/DesktopPage";
import FeelingForm from "./components/FeelingForm";
import CtaButton from "../../components/CtaButton";
import LoadingSpinner from "../../components/loadingSpinner";
import ConfirmAppointment from "./components/ConfirmAppointment";
import IAmFeelingUrl from "../../images/Iamfeeling.png";
import { DoctorProfilePropType, PracticeInfoPropType } from "../PracticeBookingPage/propTypes";
import { detailsPropType } from "./propTypes";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";
import RightArrow from "../../svgs/rightarrow.svg";

class FeelingPage extends Component {

  static propTypes = {
    addFeelings: PropTypes.func.isRequired,
    skipFeelings: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    feelings: PropTypes.string.isRequired,
    createSession: PropTypes.func.isRequired,
    clearFeelings: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setMainComponent: PropTypes.func.isRequired,
    closePopUp: PropTypes.func.isRequired,
    goToPatientSelection: PropTypes.func.isRequired,
    goToPatientDetails: PropTypes.func.isRequired,
    viewPatientDetails: detailsPropType.isRequired,
    practice: PracticeInfoPropType.isRequired,
    appointment: PropTypes.instanceOf(moment).isRequired,
    doctor: DoctorProfilePropType.isRequired,
    viewGuardianDetails: detailsPropType,
    token: PropTypes.string,
    firstName: PropTypes.string,
    isBookingForSomeoneElse: PropTypes.bool,
    isFormValid: PropTypes.bool,
  }
  state = {
    viewingConfirmForm: false,
  }
  componentDidMount() {
    this.props.clearFeelings();
    if (!isDesktop()) {
      window.scrollTo(0, 0);
      this.props.addStyles([styles.header]);
      this.props.displayHeaderIcons({ menu: false, arrow: true, help: true });
    }
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.displayHeaderIcons();
      this.props.clearStyles();
    }
  }
  goToPracticeBooking = () => {
    if (isDesktop()) {
      this.props.goToPage(routeConfig.practiceProfile.getBrowserPath(this.props.practice.Id));
    } else {
      this.props.goToPage(routeConfig.practiceBooking.getBrowserPath(this.props.practice.Guid));
    }
  }
  showConfirmForm = () => {
    this.setState({ viewingConfirmForm: true });
  }
  closeConfirmForm = (fn) => () => this.setState({ viewingConfirmForm: false }, fn);
  handleBackClick = (e) => {
    e.preventDefault();
    if (!this.props.isBookingForSomeoneElse && this.props.token) {
      this.props.goToPatientSelection();
    } else {
      this.props.goToPatientDetails();
    }
  }
  render() {
    const popUpComponent = this.props.token ? <DesktopSelectionPage /> : <PatientDetailsPage />;
    return (
      <LoadingSpinner
        containerClassName={styles.feelingPage}
        overlayClassName={styles.overlay}
        iconClassName={styles.spinner}
        isFetching={this.props.isFetching}
      >
        {this.state.viewingConfirmForm &&
          <ConfirmAppointment
            doctor={this.props.doctor}
            practice={this.props.practice}
            time={this.props.appointment}
            onConfirmClick={this.props.createSession(this.props)}
            onCancelClick={this.closeConfirmForm(this.goToPracticeBooking)}
            onDoctorEditClick={isDesktop() ?
              this.props.closePopUp :
              this.closeConfirmForm(this.goToPracticeBooking)}
            onDetailsEditClick={isDesktop() ?
              () => this.props.setMainComponent(popUpComponent) :
              this.closeConfirmForm(this.props.goBack)
            }
            onGuardianEditClick={() => this.props.setMainComponent(<GuardianshipPage />)}
            patient={this.props.viewPatientDetails}
            guardian={this.props.viewGuardianDetails}
          />
        }
        <div className={styles.formContainer}>
          {
            isDesktop() &&
              <div>
                <div className={styles.desktopLabel}>
                  What&#39;s the reason for the consultation?
                </div>
                <div className={styles.bottomNote} >
                  Note that practice staff can view this information.
                </div>
              </div>
          }
          <img src={IAmFeelingUrl} className={styles.feelingIcon} alt="I am feeling" />
          <span className={styles.label}>What&#39;s your reason for the consultation?</span>
          <div className={styles.formInnerContainer}>
            <FeelingForm
              isBookingForSomeoneElse={this.props.isBookingForSomeoneElse}
              addFeelings={this.props.addFeelings}
              name={this.props.firstName}
            />
          </div>
        </div>
        {isDesktop() ? (
          <div className={styles.nextContainer}>
            <a
              className={styles.navLinkLarge}
              onClick={this.handleBackClick}
            >
              <RightArrow className={styles.backwardArrow} />
              <span>Back</span>
            </a>
            <a
              className={classnames(
                styles.navLinkLarge,
                { [styles.faded]: !this.props.isFormValid }
              )}
              onClick={this.showConfirmForm}
            >
              <span>Next</span>
              <RightArrow className={styles.forwardArrow} />
            </a>
          </div>) : <CtaButton className={styles.cta} onClick={this.showConfirmForm} active />
        }
      </LoadingSpinner>
    );
  }
}

// get the patient whom the appointment is booked for
const getPatientDetails = (isLoggedIn, isBookingForSomeoneElse, profile, sessionDetails) => {
  if (isLoggedIn && !isBookingForSomeoneElse) {
    return profile;
  }
  return {
    DependantId: sessionDetails.dependantId,
    FirstName: sessionDetails.firstName,
    LastName: sessionDetails.lastName,
    Mobile: sessionDetails.mobile || sessionDetails.initiatorMobile,
    DateOfBirth: sessionDetails.dateOfBirth,
  };
};
const getGuardianDetails = (isBookingForSomeoneElse, token, sessionDetails) => {
  if (isBookingForSomeoneElse && !token) {
    return {
      FirstName: sessionDetails.initiatorFirstName,
      LastName: sessionDetails.initiatorLastName,
      Mobile: sessionDetails.initiatorMobile,
      DateOfBirth: sessionDetails.initiatorDateOfBirth,
    };
  }
  return null;
};
const mapStateToProps = (state) => {
  const sessionProps = sessionState([])(state);
  const token = state.loginReducer.token;
  const profile = state.profileReducer.profile;
  const viewPatientDetails = getPatientDetails(
    token,
    sessionProps.isBookingForSomeoneElse,
    profile,
    sessionProps
  );
  const viewGuardianDetails = getGuardianDetails(
    sessionProps.isBookingForSomeoneElse,
    token,
    sessionProps
  );
  return {
    token,
    ...sessionProps,
    viewPatientDetails,
    viewGuardianDetails,
    feelings: state.feelingPageReducer.feelings,
    isFetching: state.sessionReducer.isFetching,
    // @TODO: put this in a selector
    doctor: findDoctor(
      state.practiceAppointmentReducer.selectedTime.doctorId,
      state.practiceAppointmentReducer.doctorInfo.doctors.length ?
      state.practiceAppointmentReducer.doctorInfo.doctors :
      state.practiceProfileReducer.profile.Doctors,
    ),
    appointment: moment(state.practiceAppointmentReducer.selectedTime.time),
    practice: isDesktop() ?
      state.practiceProfileReducer.profile :
      (state.practiceAppointmentReducer.practiceInfo.practice || {}),
  };
};
const mapDispatchToProps = (dispatch) => ({
  createSession: sessionDispatch(dispatch)(allSessionProps),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addFeelings: bindActionCreators(feelingActions.addFeelings, dispatch),
  skipFeelings: bindActionCreators(feelingActions.skipFeelings, dispatch),
  clearFeelings: bindActionCreators(feelingActions.clearFeelings, dispatch),
  setMainComponent: bindActionCreators(popUpActions.setMainComponent, dispatch),
  closePopUp: bindActionCreators(popUpActions.closePopUp, dispatch),
  goToPage: bindActionCreators(push, dispatch),
  goBack: bindActionCreators(goBack, dispatch),
  // eslint-disable-next-line max-len
  goToPatientSelection: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<DesktopSelectionPage />),
  // eslint-disable-next-line max-len
  goToPatientDetails: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<PatientDetailsPage />),
});


export default connect(mapStateToProps, mapDispatchToProps)(FeelingPage);
export {
  styles,
};
