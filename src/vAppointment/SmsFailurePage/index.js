import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// eslint-disable-next-line max-len
import { actions as profileActions } from "../../ConsumerInterface/MainShell/actions/profileActions";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as detailsActions } from "../PatientDetailsPage/actions/actions";
import { PracticeInfoPropType } from "../PracticeBookingPage/propTypes";
import NotReceiving from "./components/NotReceiving";
import CallPractice from "../../components/CallPractice";
import Logo from "../../svgs/logo.svg";
import styles from "./smsFailurePage.css";
import { isDesktop } from "../../config";

class SmsFailurePage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    changePhone: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    // moment
    countdownStartTime: PropTypes.object.isRequired,
    milliSecondsToWait: PropTypes.number.isRequired,
    practice: PracticeInfoPropType.isRequired,
  }
  constructor(props) {
    super(props);
    this.onPhoneChange = this.onPhoneChange.bind(this);
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.setHeading(
        <div className={styles.retry}>
          Retry<Logo className={styles.logo} />
        </div>
      );
      this.props.addStyles([styles.header], [styles.headerArrow]);
      this.props.displayHeaderIcons({ arrow: true, menu: false, help: true });
    }
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.clearHeading();
      this.props.clearStyles();
      this.props.displayHeaderIcons();
    }
  }
  onPhoneChange(value) {
    this.props.changePhone(value);
  }
  render() {
    return (
      <div className={styles.container}>
        <span className={styles.whoops}>Whoops</span>
        <NotReceiving
          phone={this.props.mobile}
          onPhoneChange={this.onPhoneChange}
          countdownStartTime={this.props.countdownStartTime}
          milliSecondsToWait={this.props.milliSecondsToWait}
        />
        <CallPractice practice={this.props.practice} />
      </div>
    );
  }
}

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  changePhone: stateProps.token ? dispatchProps.changePhoneUser : dispatchProps.changePhoneSession,
});
const mapStateToProps = (state) => {
  const phone = state.guardianDetailsReducer.phone ?
    state.guardianDetailsReducer.phone :
    state.patientDetailsReducer.patientDetails.phone;
  return {
    practice: state.practiceAppointmentReducer.practiceInfo.practice,
    token: state.loginReducer.token,
    mobile: state.loginReducer.token ?
    state.profileReducer.profile.Mobile
    : phone,
    countdownStartTime: state.countdownReducer.startTime,
    milliSecondsToWait: state.countdownReducer.milliSecondsToWait,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  changePhoneSession: bindActionCreators(detailsActions.changePhone, dispatch),
  changePhoneUser: bindActionCreators(profileActions.changePhone, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SmsFailurePage);
export {
  styles,
};
