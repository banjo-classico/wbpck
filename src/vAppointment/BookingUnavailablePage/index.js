import React, { Component } from "react";
import PropTypes from "prop-types";
import { goBack, push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as practiceBookingActions } from "../PracticeBookingPage/actions/pageActions";
import { actions as popUpActions } from "../PracticeProfilePage/actions/popUpActions";
import { actions as practiceAppointmentActions } from "../PracticeBookingPage/actions/actions";
import { actions as confirmationActions } from "../CheckoutPage/actions/actions";
import CheckoutPage from "../CheckoutPage";
import Whoops from "./components/Whoops";
import TimeNotAvailable from "./components/TimeNotAvailable";
import ConnectionIssue from "./components/ConnectionIssue";
import Logo from "../../svgs/logo.svg";
import styles from "./bookingUnavailablePage.css";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";
import { PracticeInfoPropType } from "../PracticeBookingPage/propTypes";
import { sessionState, sessionDispatch, allSessionProps } from "../../selectors/sessionSelectors";
import { sessionPropType } from "../ConfirmationCodePage/propTypes";

class BookingUnavailablePage extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    goBackProp: PropTypes.func.isRequired,
    goToPracticeBooking: PropTypes.func.isRequired,
    goToHome: PropTypes.func.isRequired,
    goToCheckout: PropTypes.func.isRequired,
    createSession: PropTypes.func.isRequired,
    setOnTimeSelectedFn: PropTypes.func.isRequired,
    setClearStateOnMount: PropTypes.func.isRequired,
    clearSelectedTime: PropTypes.func.isRequired,
    clearConfirmationState: PropTypes.func.isRequired,
    closePopUp: PropTypes.func.isRequired,
    session: sessionPropType.isRequired,
    clinic: PracticeInfoPropType.isRequired,
    error: PropTypes.shape({ status: PropTypes.number.isRequired }).isRequired,
  }
  constructor(props) {
    super(props);
    this.onYesClick = this.onYesClick.bind(this);
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.setHeading(
        <div className={styles.retryContainer}>
          <a className={styles.retry} onClick={this.props.goBackProp}>Retry</a>
          <Logo className={styles.logo} />
        </div>
      );
      this.props.addStyles([styles.header], [styles.headerArrow]);
      this.props.displayHeaderIcons({ menu: false, arrow: false, help: true });
    }
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.clearStyles();
    this.props.displayHeaderIcons();
    this.props.clearConfirmationState();
  }
  onYesClick() {
    const sessionId = "";
    if (isDesktop()) this.props.closePopUp();
    this.props.clearConfirmationState();
    this.props.clearSelectedTime();
    this.props.setClearStateOnMount(false);
    this.props.setOnTimeSelectedFn(
      (pmsUserId, appointmentId, time) =>
        this.props.createSession(
          { ...this.props.session, pmsUserId, appointmentId, time, sessionId }
        )()
    );
    this.props.goToPracticeBooking(isDesktop() ? this.props.clinic.Id : this.props.clinic.Guid);
  }
  render() {
    // Still waiting for other error scenarios from design
    return (
      <div className={styles.container}>
        <Whoops />
        {
        this.props.error.status === 400 ?
          <TimeNotAvailable
            onYesClick={this.onYesClick}
            onNoClick={this.props.goToHome}
          /> :
          <ConnectionIssue
            clinic={this.props.clinic}
            onCancelClick={() => this.props.goToPracticeBooking(this.props.clinic.Id)}
            onRetryClick={() => (isDesktop() ? this.props.goToCheckout() : this.props.goBackProp())}
          />
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  clinic: isDesktop() ?
    state.practiceProfileReducer.profile :
    state.practiceAppointmentReducer.practiceInfo.practice,
  error: state.appointmentConfirmationReducer.error || state.submitAppointmentReducer.error || {},
  session: sessionState([])(state),
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  goBackProp: bindActionCreators(goBack, dispatch),
  setClearStateOnMount: bindActionCreators(practiceBookingActions.setClearStateOnMount, dispatch),
  setOnTimeSelectedFn: bindActionCreators(practiceBookingActions.setOnTimeSelectedFn, dispatch),
  clearConfirmationState: bindActionCreators(confirmationActions.clearConfirmationState, dispatch),
  clearSelectedTime: bindActionCreators(practiceAppointmentActions.clearSelection, dispatch),
  // eslint-disable-next-line max-len
  goToPracticeBooking: (id) => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
  goToHome: () => bindActionCreators(push, dispatch)(routeConfig.home.getBrowserPath()),
  createSession: sessionDispatch(dispatch)(allSessionProps),
  // eslint-disable-next-line max-len
  goToCheckout: () => bindActionCreators(popUpActions.setMainComponent, dispatch)(<CheckoutPage />, true),
  closePopUp: bindActionCreators(popUpActions.closePopUp, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingUnavailablePage);
export {
  styles,
};
