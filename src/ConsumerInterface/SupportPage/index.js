/* eslint-disable max-len */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { goBack, replace } from "react-router-redux";
import { connect } from "react-redux";
import { defer } from "lodash/fp";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import Textarea from "react-textarea-autosize";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appStyleActions } from "../../App/actions/actions";
import { actions as supportActions } from "./actions/actions";
import SuccessOverlay from "./components/SuccessOverlay";
import SendButton from "./components/SendButton";
import styles from "./supportPage.css";
import { routeConfig } from "../../routes";

class SupportPage extends Component {
  static propTypes = {
    clearHeading: PropTypes.func.isRequired,
    setHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    setAppClassNames: PropTypes.func.isRequired,
    clearAppClassNames: PropTypes.func.isRequired,
    sendMessageToSupport: PropTypes.func.isRequired,
    addMessageToState: PropTypes.func.isRequired,
    goBackProp: PropTypes.func.isRequired,
    goToNextSupportPage: PropTypes.func.isRequired,
    isSending: PropTypes.bool.isRequired,
    token: PropTypes.string,
    id: PropTypes.string,
    isError: PropTypes.bool,
    isSuccess: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailPhoneChange = this.onEmailPhoneChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.clearError = this.clearError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    name: "",
    emailPhone: "",
    message: "",
    error: "",
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.setHeading(<div>Kia ora, how can we help?</div>);
    this.props.addStyles([styles.header]);
    // eslint-disable-next-line no-underscore-dangle
    defer(() => this.textarea._resizeComponent());
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.displayHeaderIcons();
    this.props.clearHeading();
  }
  onNameChange() {
    this.setState({ name: this.name.value });
    this.clearError();
  }
  onEmailPhoneChange() {
    this.setState({ emailPhone: this.emailPhone.value });
    this.clearError();
  }
  onMessageChange() {
    this.setState({ message: this.textarea.value });
    this.clearError();
  }
  clearError() {
    this.setState({ error: "" });
  }
  validateForm() {
    return (
      this.textarea.value.length &&
      this.name.value.length &&
      this.emailPhone.value.length &&
      (
        isEmail(this.emailPhone.value) ||
        isMobilePhone(this.emailPhone.value, "en-NZ")
      )
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.sendMessageToSupport(
        this.state.message,
        this.props.id,
        this.state.name,
        this.state.emailPhone
      );
      // No other way to clear textarea value. I hate this, damn you react-textarea-autosize!
      this.textarea.value = "";
      this.name.value = "";
      this.emailPhone.value = "";
    } else if (!isEmail(this.emailPhone.value) && !isMobilePhone(this.emailPhone.value)) {
      this.setState({ error: "Please enter a correct email or mobile number" });
    } else if (this.name.value.length < 1) {
      this.setState({ error: "Please enter a name" });
    } else if (this.textarea.value.length < 1) {
      this.setState({ error: "Please enter a message" });
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form} >
        <div className={styles.innerContainer}>
          <div className={styles.textBlock}>
            <div className={styles.redText}>
              For queries relating to your booking or other medical
              information, please contact your medical centre directly.
            </div>
            <div className={styles.text}>
              If this website is not working, please let us know below, or call us on <br />
              0800 736 463
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.label}>Name</div>
            <input
              type="text"
              onChange={this.onNameChange}
              className={styles.input}
              ref={c => { this.name = c; }}
            />
            <div className={styles.label}>Email or Mobile number</div>
            <input
              type="text"
              onChange={this.onEmailPhoneChange}
              className={styles.input}
              ref={c => { this.emailPhone = c; }}
            />
            <div className={styles.label}>Your message</div>
            <Textarea
              className={styles.textarea}
              required
              onChange={this.onMessageChange}
              onFocus={this.onFocus}
              maxLength={200}
              ref={c => { this.textarea = c; }}
            />
          </div>
          {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
        </div>
        <SendButton isSending={this.props.isSending} />
        {this.props.isSuccess ? <SuccessOverlay onClick={this.props.goBackProp} /> : null}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isSending: state.sendMessageToSupportReducer.isSending,
  isError: state.sendMessageToSupportReducer.error,
  isSuccess: state.sendMessageToSupportReducer.success,
  id: state.profileReducer.profile.Id,
  token: state.loginReducer.token,
});
const mapDispatchToProps = (dispatch) => ({
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  setAppClassNames: bindActionCreators(appStyleActions.addAppStyles, dispatch),
  clearAppClassNames: bindActionCreators(appStyleActions.clearAppStyles, dispatch),
  sendMessageToSupport: bindActionCreators(supportActions.sendMessageToSupport, dispatch),
  addMessageToState: bindActionCreators(supportActions.addMessageToState, dispatch),
  goBackProp: () => {
    bindActionCreators(supportActions.clearSupport, dispatch)();
    bindActionCreators(goBack, dispatch)();
  },
  // eslint-disable-next-line max-len
  goToNextSupportPage: () => bindActionCreators(replace, dispatch)(routeConfig.supportGuest.getBrowserPath()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SupportPage);
export {
  styles,
};
/* eslint-enable max-len */
