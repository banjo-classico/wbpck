import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import isEmail from "validator/lib/isEmail";
import { connect } from "react-redux";

import { actions as headerActions } from "../components/header/actions/actions";
import { actions as appStyleActions } from "../App/actions/actions";
import { actions as supportActions } from "../ConsumerInterface/SupportPage/actions/actions";
import LoadingSpinner from "../components/loadingSpinner";
import PageNav from "../components/pageNav";
import InputWithError from "../components/inputError";
import styles from "./supportPageTwo.css";
import RightArrow from "../svgs/rightarrow.svg";
import { routeConfig } from "../routes";

class SupportPageTwo extends Component {
  static propTypes = {
    clearHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    setAppClassNames: PropTypes.func.isRequired,
    clearAppClassNames: PropTypes.func.isRequired,
    sendMessageToSupport: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isSending: PropTypes.bool.isRequired,
    isError: PropTypes.bool,
    isSuccess: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.clearNameError = this.clearNameError.bind(this);
    this.clearEmailError = this.clearEmailError.bind(this);
  }
  state = {
    name: "",
    nameError: null,
    email: "",
    emailError: null,
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.addStyles([styles.header]);
    this.props.setAppClassNames([styles.background]);
  }
  componentWillUnmount() {
    this.props.clearAppClassNames();
    this.props.clearStyles();
    this.props.displayHeaderIcons();
    this.props.clearHeading();
  }
  onNameChange(e) {
    this.setState({ name: e.target.value });
  }
  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  clearNameError() {
    this.setState({ nameError: null });
  }
  clearEmailError() {
    this.setState({ emailError: null });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name.length > 0 && isEmail(this.state.email)) {
      this.props.sendMessageToSupport(
        this.props.message,
        undefined,
        this.state.name,
        this.state.email
      );
    } else if (this.state.name.length < 1) {
      this.setState({ nameError: "Please include your name" });
    } else if (!isEmail(this.state.email)) {
      this.setState({ emailError: "Please provide a valid email" });
    }
  }
  render() {
    return (
      <LoadingSpinner
        isFetching={this.props.isSending}
        containerClassName={styles.container}
      >
        <form onSubmit={this.handleSubmit} className={styles.form} >
          <span className={styles.heading}>How can we get back to you?</span>
          <div className={styles.inputContainer}>
            <div className={styles.label}>Name</div>
            <InputWithError
              required
              className={styles.input}
              type="text"
              onChange={this.onNameChange}
              onFocus={this.clearNameError}
              onErrorClick={this.clearNameError}
              isError={this.state.nameError}
              errorMessage={this.state.nameError}
            />
            <div className={styles.label}>Email</div>
            <InputWithError
              required
              className={styles.input}
              type="email"
              onChange={this.onEmailChange}
              onFocus={this.clearEmailError}
              onErrorClick={this.clearEmailError}
              isError={this.state.emailError}
              errorMessage={this.state.emailError}
            />
          </div>
          <button type="submit" className={styles.hidden} />
        </form>
        <div className={styles.navContainer}>
          <a
            className={styles.navLinkLarge}
            onClick={this.handleSubmit}
          >
            <span>Next</span>
            <RightArrow className={styles.forwardArrow} />
          </a>
          <PageNav
            total={2}
            currentIndex={1}
            className={styles.navItems}
            itemClassName={styles.navIcon}
            selectedItemClassName={styles.selectedNavIcon}
          />
        </div>
      </LoadingSpinner>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.sendMessageToSupportReducer.message,
  isSuccess: state.sendMessageToSupportReducer.success,
  isSending: state.sendMessageToSupportReducer.isSending,
});
const mapDispatchToProps = (dispatch) => ({
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  setAppClassNames: bindActionCreators(appStyleActions.addAppStyles, dispatch),
  clearAppClassNames: bindActionCreators(appStyleActions.clearAppStyles, dispatch),
  sendMessageToSupport: bindActionCreators(supportActions.sendMessageToSupport, dispatch),
  goToLogin: () => bindActionCreators(push, dispatch)(routeConfig.login.getBrowserPath()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SupportPageTwo);
export {
  styles,
};
