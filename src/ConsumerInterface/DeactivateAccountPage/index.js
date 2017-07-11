import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push, goBack } from "react-router-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as logoutActions } from "../EntryPage/actions/actions";
import { actions } from "./actions/actions";
import Switcheroo from "../../components/Switcheroo";
import PasswordVerification from "./components/PasswordVerification";
import Reason from "./components/Reason";
import DeactivationSuccess from "./components/DeactivationSuccess";
import styles from "./deactivateAccountPage.css";
import { routeConfig } from "../../routes";

class DeactivateAccountPage extends Component {
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
    checkPassword: PropTypes.func.isRequired,
    clearCheckPassword: PropTypes.func.isRequired,
    deactivateAccount: PropTypes.func.isRequired,
    clearDeactivateAccount: PropTypes.func.isRequired,
    goToRequestPassword: PropTypes.func.isRequired,
    goBackProp: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    passwordValid: PropTypes.bool.isRequired,
    accessToken: PropTypes.string.isRequired,
    deactivated: PropTypes.bool.isRequired,
    deactivationError: PropTypes.object,

  }
  constructor(props) {
    super(props);
    this.handleSwitcheroo = this.handleSwitcheroo.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.setHeading(<div>Deactivate my account</div>);
    this.props.addAppStyles([styles.app]);
    this.props.addStyles([styles.header]);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.passwordValid) {
      this.handleSwitcheroo(2, 1);
      this.props.overrideBackArrow(this.handleGoBack);
      this.props.clearCheckPassword();
    }
    if (nextProps.deactivated) {
      this.handleSwitcheroo(3, 2);
      this.props.setHeading(<div>Account Deactivated</div>);
      this.props.displayHeaderIcons({ menu: false, arrow: false });
    }
  }
  componentWillUnmount() {
    if (this.props.deactivated) {
      this.props.clearDeactivateAccount();
      this.props.logout();
    }
    this.props.clearHeading();
    this.props.clearStyles();
    this.props.displayHeaderIcons();
    this.props.removeAppStyles([styles.app]);
  }
  handleGoBack() {
    this.handleSwitcheroo(1, 2);
    this.props.clearBackArrow();
  }
  handleSwitcheroo(next, last) {
    if (this.switcheroo) {
      this.switcheroo.setItemToShow(next, last);
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <Switcheroo
          ref={c => { this.switcheroo = c; }}
          className={styles.switcheroo}
          firstItem={
            <PasswordVerification
              email={this.props.email}
              checkPassword={this.props.checkPassword(this.props.token)}
              goBack={this.props.goBackProp}
              goToRequestPassword={this.props.goToRequestPassword}
            />
        }
          secondItem={
            <Reason
              deactivateAccount={
              this.props.deactivateAccount(this.props.token, this.props.accessToken)
            }
              goBack={this.handleGoBack}
            />
        }
          thirdItem={
            <DeactivationSuccess
              email={this.props.email}
              goBack={this.props.goBackProp}
              logout={this.props.logout}
            />
        }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  email: state.profileReducer.profile.Email,
  passwordValid: state.deactivationReducer.passwordValid,
  accessToken: state.deactivationReducer.accessToken,
  deactivated: state.deactivationReducer.deactivated,
  deactivationError: state.deactivationReducer.deactivationError,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  overrideBackArrow: bindActionCreators(headerActions.overrideBackArrow, dispatch),
  clearBackArrow: bindActionCreators(headerActions.clearBackArrow, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(appActions.removeAppStyles, dispatch),
  // eslint-disable-next-line max-len
  checkPassword: (token) => (password) => bindActionCreators(actions.checkPassword, dispatch)(password, token),
  clearCheckPassword: bindActionCreators(actions.clearCheckPassword, dispatch),
  // eslint-disable-next-line max-len
  deactivateAccount: (token, accessToken) => (reason) => bindActionCreators(actions.deactivateAccount, dispatch)(token, accessToken, reason),
  // eslint-disable-next-line max-len
  goToRequestPassword: () => bindActionCreators(push, dispatch)(routeConfig.passwordReset.getBrowserPath()),
  clearDeactivateAccount: bindActionCreators(actions.clearDeactivateAccount, dispatch),
  goBackProp: bindActionCreators(goBack, dispatch),
  logout: bindActionCreators(logoutActions.logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeactivateAccountPage);
export {
  styles,
};
