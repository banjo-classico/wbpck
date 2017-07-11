import React, { Component, PropTypes } from "react";

import ResendForm from "./components/resendForm";
import InputCodeForm from "./components/inputCodeForm";
import ErrorPopUp from "./components/ErrorPopUp";
import smartPhoneIcon from "../../images/smartPhone.png";
import { isDesktop } from "../../config";
import styles from "./confirmationCode.css";

class ConfirmationCodePage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    clearSideComponent: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    changePhone: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
    pushProp: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    shouldPush: PropTypes.bool.isRequired,
    sendCodeIsFetching: PropTypes.bool.isRequired,
    clickHere: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    isWhite: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    milliSecondsToWait: PropTypes.number.isRequired,
    countdownStartTime: PropTypes.object.isRequired,
    sessionId: PropTypes.string,
    setAppClassNames: PropTypes.func,
    addHeaderStyles: PropTypes.func,
    clearHeaderStyles: PropTypes.func,
    clearAppClassNames: PropTypes.func,
    showSkip: PropTypes.bool,
    isError: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.setClicked = this.setClicked.bind(this);
    this.toggleErrorPopUp = this.toggleErrorPopUp.bind(this);
  }
  state = {
    hasClickedResend: false,
    showErrorPopUp: false,
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.displayHeaderIcons({ menu: false, arrow: false, help: true });
      this.props.setHeading(<div />);
      if (this.props.addHeaderStyles) this.props.addHeaderStyles([styles.heading]);
    }
  }
  componentDidUpdate() {
    if (this.props.shouldPush) {
      this.props.clearSideComponent();
      this.props.pushProp();
    }
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.displayHeaderIcons();
      this.props.clearHeading();
      if (this.props.clearHeaderStyles) this.props.clearHeaderStyles();
    }
    this.setClicked(false);
  }
  onPhoneChange(value) {
    this.props.changePhone(value);
  }
  setClicked(bool) {
    this.setState({ hasClickedResend: bool });
  }
  toggleErrorPopUp() {
    this.setState({ showErrorPopUp: !this.state.showErrorPopUp });
  }
  render() {
    return (
      <div className={styles.page}>
        {!isDesktop() ?
          <img
            src={smartPhoneIcon}
            className={styles.icon}
            key="icon"
            alt="SMS code"
          /> : null
        }
        <div className={styles.message}>
          Enter the verification code that we&#39;ve sent to your phone.
        </div>
        <InputCodeForm
          isFetching={this.props.sendCodeIsFetching}
          sendCode={this.props.sendCode}
          sessionId={this.props.sessionId}
          isError={this.props.isError}
          clearError={this.props.clearError}
        />
        <ResendForm
          phone={this.props.mobile}
          onPhoneChange={this.onPhoneChange}
          countdownStartTime={this.props.countdownStartTime}
          milliSecondsToWait={this.props.milliSecondsToWait}
          setClicked={this.setClicked}
        />
        {this.state.showErrorPopUp ? <ErrorPopUp closePopUp={this.toggleErrorPopUp} /> : null}
        <div className={styles.navContainer}>
          {
            this.props.showSkip ?
              <a className={styles.skip} onClick={this.props.pushProp}>
                skip
              </a>
              : null
          }
          {
            this.state.hasClickedResend ?
              <div className={styles.info}>
                Not receiving the text?
                <a onClick={isDesktop() ? this.toggleErrorPopUp : this.props.clickHere}>
                  Click here
                </a>
              </div> : null
          }
        </div>
      </div>
    );
  }
}


export default ConfirmationCodePage;
