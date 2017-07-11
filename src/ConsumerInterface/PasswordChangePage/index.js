import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";

import styles from "./passwordChangePage.css";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as passwordActions } from "./actions/actions";
import { actions as appStyleActions } from "../../App/actions/actions";
import LoadingSpinner from "../../components/loadingSpinner";
import PasswordChange from "../../components/PasswordChange";
import Alert from "../../libs/Alert";

class PasswordChangePage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    clearAppClassNames: PropTypes.func.isRequired,
    setAppClassNames: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    changePassword: PropTypes.func.isRequired,
    goBackProp: PropTypes.func.isRequired,
    clearPasswordState: PropTypes.func.isRequired,
    error: PropTypes.any,
  }
  constructor(props) {
    super(props);
    this.onOldPasswordChange = this.onOldPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    oldPassword: "",
  }
  componentDidMount() {
    this.props.setHeading(<div>Change Password</div>);
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.clearPasswordState();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      Alert.error("Your old password is incorrect");
      this.props.clearPasswordState();
    }
    if (nextProps.success) {
      this.props.goBackProp();
      Alert.success("Your new password has been set");
      this.props.clearPasswordState();
    }
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.displayHeaderIcons();
  }

  onOldPasswordChange(e) {
    this.setState({
      oldPassword: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newPasswordState = this.passwordChange.getState();
    if (
      !newPasswordState.newPasswordError &&
      !newPasswordState.confirmPasswordError &&
      newPasswordState.newPassword === newPasswordState.confirmPassword
    ) {
      this.props.changePassword(this.state.oldPassword, newPasswordState.newPassword);
    } else {
      this.passwordChange.onConfirmPasswordBlur();
    }
  }
  render() {
    return (
      <div className={styles.outerContainer}>
        <LoadingSpinner
          isFetching={this.props.isRequesting}
          containerClassName={styles.spinnerContainer}
        >
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <div className={styles.inputContainer}>
              <span className={styles.label}>Old Password</span>
              <input
                type="password"
                className={styles.input}
                value={this.state.oldPassword}
                onChange={this.onOldPasswordChange}
                required
              />
            </div>
            <PasswordChange
              setIsValid={() => {}}
              isWhiteBackground
              isChangePassword
              ref={c => { this.passwordChange = c; }}
            />
            <div className={styles.buttonContainer}>
              <button className={styles.button} type="submit">SAVE</button>
            </div>
          </form>
        </LoadingSpinner>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isRequesting: state.changePasswordReducer.isRequesting,
  success: state.changePasswordReducer.success,
  error: state.changePasswordReducer.error,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  clearPasswordState: bindActionCreators(passwordActions.clearChangePassword, dispatch),
  changePassword: bindActionCreators(passwordActions.changeUserPassword, dispatch),
  setAppClassNames: bindActionCreators(appStyleActions.addAppStyles, dispatch),
  clearAppClassNames: bindActionCreators(appStyleActions.clearAppStyles, dispatch),
  goBackProp: bindActionCreators(goBack, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangePage);
export {
  styles,
};
