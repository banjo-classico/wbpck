import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classnames from "classnames";

import styles from "./requestNewPasswordPage.css";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as passwordActions } from "./actions/actions";
import LoadingSpinner from "../../components/loadingSpinner";
import InputWithError from "../../components/inputError";
import DesktopInput from "./components/DesktopInput";
import Dart from "../../svgs/dart.svg";
import Confirmation from "./components/Confirmation";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";

class RequestNewPasswordPage extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    requestNewPassword: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    hasSent: PropTypes.bool.isRequired,
    goToLogin: PropTypes.func.isRequired,
    defaultError: PropTypes.bool,
    shouldError: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearError = this.clearError.bind(this);
  }
  state = {
    email: "",
    error: this.props.defaultError || false,
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.addStyles([styles.heading]);
      this.props.displayHeaderIcons({ menu: false, help: true, arrow: true });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldError) {
      this.setState({ error: true });
    }
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.clearStyles();
      this.props.clearHeading();
    }
    this.props.clearState();
  }
  onChange(e) {
    this.setState({ email: e.target.value });
  }
  clearError() {
    this.setState({ error: false });
  }
  handleClick(e) {
    e.preventDefault();
    this.props.requestNewPassword(this.state.email);
  }

  render() {
    return (
      <LoadingSpinner
        isFetching={this.props.isRequesting}
        iconClassName={styles.spinner}
        containerClassName={styles.spinnerContainer}
      >
        {(() => {
          if (this.props.isRequesting) return <div />;
          if (this.props.hasSent) {
            return (<Confirmation
              goToLogin={this.props.goToLogin}
              email={this.state.email}
              Icon={Dart}
              iconStyles={styles.dart}
              text="We've sent a password reset link to"
            />);
          }
          const canClick = this.state.email.length >= 5;
          return (
            <form className={styles.container} onSubmit={this.handleClick}>
              <span className={styles.topText}>Forgot your password?</span>
              <div className={styles.secondText}>
                Enter your email address below and we&#39;ll
                send you a link to reset your password.
              </div>
              <div className={styles.innerContainer}>
                <div className={styles.inputContainer}>
                  <span className={styles.label}>Your Email</span>
                  {isDesktop() ?
                    <DesktopInput
                      value={this.state.email}
                      onChange={this.onChange}
                      onFocus={this.clearError}
                      isError={this.state.error}
                    /> :
                    <InputWithError
                      required
                      value={this.state.email}
                      onChange={this.onChange}
                      onFocus={this.clearError}
                      type="email"
                      onErrorClick={this.clearError}
                      isError={this.state.error}
                      errorMessage={"This email is not registered with Vensa."}
                      className={styles.input}
                    />
                  }
                </div>
                <button
                  className={classnames(
                    styles.button,
                    { [styles.faded]: !canClick }
                  )}
                  onClick={canClick ? this.handleClick : () => {}}
                >Send</button>
              </div>
            </form>
          );
        })()}
      </LoadingSpinner>
    );
  }
}

const mapStateToProps = (state) => ({
  isRequesting: state.requestNewPasswordReducer.isRequesting,
  hasSent: state.requestNewPasswordReducer.success,
  shouldError: state.requestNewPasswordReducer.error !== null,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  requestNewPassword: bindActionCreators(passwordActions.requestNewPassword, dispatch),
  goToLogin: () => bindActionCreators(push, dispatch)(routeConfig.login.getBrowserPath()),
  clearState: bindActionCreators(passwordActions.clearState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestNewPasswordPage);
export {
  styles,
};
