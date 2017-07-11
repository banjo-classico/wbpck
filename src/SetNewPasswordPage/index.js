import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classnames from "classnames";

import { actions as appStyleActions } from "../App/actions/actions";
import { actions as headerActions } from "../components/header/actions/actions";
import { actions as newPasswordActions } from "./actions/actions";
import PasswordChange from "../components/PasswordChange";
import Invalid from "./components/Invalid";
import LoadingSpinner from "../components/loadingSpinner";
import styles from "./setNewPasswordPage.css";
import CtaButton from "../components/CtaButton/index";
import Logo from "../svgs/logo.svg";
import { routeConfig } from "../routes";
import { isDesktop } from "../config";
import Alert from "../libs/Alert";

class SetNewPasswordPage extends Component {
  static propTypes = {
    routeParams: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
    addStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearAppClassNames: PropTypes.func.isRequired,
    setAppClassNames: PropTypes.func.isRequired,
    checkPasswordToken: PropTypes.func.isRequired,
    setNewPassword: PropTypes.func.isRequired,
    goToRequest: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
    tokenIsValid: PropTypes.bool.isRequired,
    isSetting: PropTypes.bool.isRequired,
    isSuccessful: PropTypes.bool.isRequired,
    isChecking: PropTypes.bool.isRequired,
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValidState = this.setValidState.bind(this);
  }
  state = {
    isValidForm: false,
  }
  componentDidMount() {
    this.props.addStyles(isDesktop() ? [styles.hidden] : [styles.heading]);
    this.props.checkPasswordToken(this.props.routeParams.token);
    if (!isDesktop()) {
      this.props.displayHeaderIcons({ menu: false, arrow: false, help: false });
      this.props.setAppClassNames([styles.app]);
      this.props.setHeading(<div />);
    } else {
      this.props.setAppClassNames([styles.app]);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccessful) {
      Alert.success("Your new password has been set");
      this.props.goToLogin();
    }
  }
  componentWillUnmount() {
    if (!isDesktop()) {
      this.props.displayHeaderIcons();
      this.props.clearHeading();
    }
    this.props.clearStyles();
    this.props.clearAppClassNames();
  }
  setValidState() {
    this.setState({ isValidForm: this.passwordChange.state.isValid });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newPasswordState = this.passwordChange.getState();
    if (
      !newPasswordState.newPasswordError &&
      !newPasswordState.confirmPasswordError &&
      newPasswordState.newPassword === newPasswordState.confirmPassword
    ) {
      this.props.setNewPassword(newPasswordState.newPassword, this.props.routeParams.token);
    } else {
      this.passwordChange.onConfirmPasswordBlur();
    }
  }
  render() {
    return (
      <LoadingSpinner
        containerClassName={styles.container}
        isFetching={this.props.isChecking}
      >
        {
          isDesktop() ?
            <div className={styles.desktopHeader}><Logo className={styles.logo} /></div> :
            null
        }
        <div className={styles.innerContainer}>
          {(() => {
            if (this.props.isChecking) return <div />;
            if (this.props.tokenIsValid) {
              return (
                <form onSubmit={this.handleSubmit} className={styles.form}>
                  <div className={styles.topText}>Create your new password</div>
                  <PasswordChange
                    ref={c => { this.passwordChange = c; }}
                    setIsValid={this.setValidState}
                    isWhiteBackground={isDesktop()}
                  />
                  {
                    isDesktop() ?
                      <button
                        type="submit"
                        className={classnames(styles.button,
                          { [styles.active]: this.state.isValidForm })}
                      >
                        <LoadingSpinner
                          containerClassName={styles.buttonSpinner}
                          isFetching={this.props.isSetting}
                        >
                          {this.props.isSetting ? null :
                          <span className={styles.buttonText}>Reset</span>
                          }
                        </LoadingSpinner>
                      </button>
                      :
                      <CtaButton
                        className={styles.button}
                        white
                      />
                  }
                </form>
              );
            }
            return <Invalid goToRequest={this.props.goToRequest} />;
          })()}
        </div>
      </LoadingSpinner>
    );
  }
}

const mapStateToProps = (state) => ({
  isChecking: state.checkPasswordTokenReducer.isChecking,
  tokenIsValid: state.checkPasswordTokenReducer.success,
  isSetting: state.setNewPasswordReducer.isSetting,
  isSuccessful: state.setNewPasswordReducer.success,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  setAppClassNames: bindActionCreators(appStyleActions.addAppStyles, dispatch),
  clearAppClassNames: bindActionCreators(appStyleActions.clearAppStyles, dispatch),
  checkPasswordToken: bindActionCreators(newPasswordActions.checkPasswordToken, dispatch),
  setNewPassword: bindActionCreators(newPasswordActions.setNewPassword, dispatch),
  goToRequest: () => bindActionCreators(push, dispatch)(routeConfig.passwordReset.getBrowserPath()),
  goToLogin: () => bindActionCreators(push, dispatch)(routeConfig.login.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPasswordPage);
export {
  styles,
};
