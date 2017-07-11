import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { replace, push } from "react-router-redux";

import styles from "./guestBookingError.css";
import { actions as headerActions } from "../../components/header/actions/actions";
import NotEnrolled from "./components/NotEnrolled";
import CallPractice from "../../components/CallPractice";
import Logo from "../../svgs/logo.svg";
import {
  isBookingForSomeoneElse as checkBookingForSomeoneElse,
} from "../../selectors/sessionSelectors";
import { PracticeInfoPropType } from "../PracticeBookingPage/propTypes";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";

const pushTo = (pushFn, token, isBookingForSomeoneElse) => () =>
  (token && !isBookingForSomeoneElse ?
    pushFn(routeConfig.editProfile.getBrowserPath()) :
    pushFn(routeConfig.patientDetails.getBrowserPath()));

class GuestBookingError extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    overrideBackArrow: PropTypes.func.isRequired,
    clearBackArrow: PropTypes.func.isRequired,
    practice: PracticeInfoPropType.isRequired,
    replaceProp: PropTypes.func.isRequired,
    goToBooking: PropTypes.func.isRequired,
    isBookingForSomeoneElse: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    token: PropTypes.string,
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.overrideBackArrow(pushTo(
        this.props.replaceProp,
        this.props.token,
        this.props.isBookingForSomeoneElse,
      ));
      this.props.setHeading(
        <div
          className={styles.check} onClick={pushTo(
          this.props.replaceProp,
          this.props.token,
          this.props.isBookingForSomeoneElse,
        )}
        >Details<Logo className={styles.logo} /></div>
      );
      this.props.addStyles([styles.header], [styles.headerArrow]);
      this.props.displayHeaderIcons({ arrow: false, menu: false, help: true });
    }
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.clearHeading();
      this.props.clearStyles();
      this.props.displayHeaderIcons();
      this.props.clearBackArrow();
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <span className={styles.whoops}>Whoops</span>
        <NotEnrolled
          goToBooking={() => this.props.goToBooking(this.props.practice.UrlName)}
          error={this.props.error}
        />
        <CallPractice practice={this.props.practice} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.sessionReducer.guestBookingError || state.checkEnrollmentReducer.error,
  practice: state.practiceAppointmentReducer.practiceInfo.practice,
  token: state.loginReducer.token,
  isBookingForSomeoneElse: checkBookingForSomeoneElse(state),
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  overrideBackArrow: bindActionCreators(headerActions.overrideBackArrow, dispatch),
  clearBackArrow: bindActionCreators(headerActions.clearBackArrow, dispatch),
  replaceProp: bindActionCreators(replace, dispatch),
  // eslint-disable-next-line max-len
  goToBooking: id => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestBookingError);
