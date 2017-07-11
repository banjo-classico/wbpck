import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { throttle } from "lodash/fp";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as accountVerifyActions } from "../RegisterPage/actions/registerUserCodeActions";
import MobileInput from "./components/MobileInput";
import CodeInput from "./components/CodeInput";
import Switcheroo from "../../components/Switcheroo";
import smartPhoneIcon from "../../images/smartPhone.png";
import styles from "./accountVerificationPage.css";
import Alert from "../../libs/Alert";

class AccountVerificationPage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    removeAppStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    overrideBackArrow: PropTypes.func.isRequired,
    clearBackArrow: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
    verifyCode: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    countdownStartTime: PropTypes.object.isRequired,
    milliSecondsToWait: PropTypes.number.isRequired,
    verifyError: PropTypes.bool,
    isFetching: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.handleSwitcheroo = this.handleSwitcheroo.bind(this);
    this.setMobile = this.setMobile.bind(this);
  }
  state = {
    mobile: "",
  }
  componentDidMount() {
    this.props.addStyles([styles.header]);
    this.props.addAppStyles([styles.app]);
    this.props.setHeading(<div />);
    this.props.displayHeaderIcons({ menu: false, arrow: true, help: false });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.verifyError) {
      Alert.error("Oops! It looks like you've typed the wrong number.");
    }
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.removeAppStyles([styles.app]);
    this.props.clearHeading();
    this.props.displayHeaderIcons();
  }
  setMobile(mobile) {
    this.setState({ mobile });
  }
  handleSwitcheroo(next, last) {
    if (this.switcheroo) {
      this.switcheroo.setItemToShow(next, last);
    }
  }
  render() {
    return (
      <div className={styles.outerContainer}>
        <img
          src={smartPhoneIcon}
          className={styles.icon}
          key="icon"
          alt="SMS code"
        />
        <div className={styles.container}>
          <Switcheroo
            ref={c => { this.switcheroo = c; }}
            firstItem={
              <MobileInput
                switcheroo={() => this.handleSwitcheroo(2, 1)}
                sendCode={this.props.sendCode}
                setMobile={this.setMobile}
                mobile={this.props.mobile}
              />
            }
            secondItem={
              <CodeInput
                switcheroo={() => this.handleSwitcheroo(1, 2)}
                displayHeaderIcons={this.props.displayHeaderIcons}
                overrideBackArrow={this.props.overrideBackArrow}
                clearBackArrow={this.props.clearBackArrow}
                mobile={this.state.mobile}
                clearError={this.props.clearError}
                token={this.props.token}
                verifyCode={this.props.verifyCode}
                sendCode={this.props.sendCode}
                isError={this.props.verifyError}
                countdownStartTime={this.props.countdownStartTime}
                milliSecondsToWait={this.props.milliSecondsToWait}
                isFetching={this.props.isFetching}
              />
            }
          />
        </div>
      </div>
    );
  }
}
const throttleForTime = throttle(500);
const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  isFetching: state.registerUserCodeReducer.verifyCode.isFetching,
  verifyError: state.registerUserCodeReducer.verifyCode.error &&
    state.registerUserCodeReducer.verifyCode.error.status === 400,
  countdownStartTime: state.countdownReducer.startTime,
  milliSecondsToWait: state.countdownReducer.milliSecondsToWait,
  mobile: state.profileReducer.profile.Mobile || "",
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(appActions.removeAppStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  overrideBackArrow: bindActionCreators(headerActions.overrideBackArrow, dispatch),
  clearBackArrow: bindActionCreators(headerActions.clearBackArrow, dispatch),
  sendCode: bindActionCreators(accountVerifyActions.sendCodeToVerify, dispatch),
  verifyCode: bindActionCreators(accountVerifyActions.verifyCode, dispatch),
  // eslint-disable-next-line max-len
  clearError: throttleForTime(bindActionCreators(accountVerifyActions.clearVerifyCodeError, dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerificationPage);
export {
  styles,
};
