import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import moment from "moment";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";

import { actions as loginActions } from "./actions/actions";
import { actions as headerActions } from "../../components/header/actions/actions";
// eslint-disable-next-line max-len
import { actions as passwordActions } from "../../vAppointment/RequestNewPasswordPage/actions/actions";
import { actions as registerActions } from "../RegisterPage/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import ForgotPasswordSlider from "./components/ForgotPasswordSlider";
import SignUpForm from "./components/SignUpForm";
import polygonsImg from "../../images/polygons.jpg";
import Logo from "../../svgs/logo.svg";
import styles from "./entryPage.css";
import { routeConfig } from "../../routes";

class EntryPage extends Component {
  static propTypes = {
    clearStyles: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    goToRegister: PropTypes.func.isRequired,
    clearRegisterData: PropTypes.func.isRequired,
    requestNewPassword: PropTypes.func.isRequired,
    clearPasswordState: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    shouldErrorPassword: PropTypes.bool.isRequired,
    hasSentPassword: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      query: PropTypes.object,
    }),
  }
  constructor(props) {
    super(props);
    this.toggleForgotPassword = this.toggleForgotPassword.bind(this);
  }
  state = {
    showForgotPassword: false,
  }
  componentWillMount() {
    const query = this.props.location.query && this.props.location.query;
    if (query.token) {
      this.props.loginSuccess(
        query.token,
        moment().add(query.expires - 120, "seconds").toDate(),
        query.email,
      );
    }
  }
  componentDidMount() {
    this.props.clearRegisterData();
    this.props.addStyles([styles.hidden]);
    this.props.addAppStyles([styles.app]);
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.clearAppStyles();
  }
  toggleForgotPassword() {
    this.setState({ showForgotPassword: !this.state.showForgotPassword });
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        component="div"
        className={styles.container}
        style={{
          backgroundImage: `url(${polygonsImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
        }}
        transitionName={{
          leave: classnames(
           { [styles.leave]: !this.state.showForgotPassword },
           { [styles.forgotLeave]: this.state.showForgotPassword }
         ),
          leaveActive: classnames(
           { [styles.leaveActive]: !this.state.showForgotPassword },
           { [styles.forgotLeaveActive]: this.state.showForgotPassword }
         ),
          enter: classnames(
           { [styles.enter]: !this.state.showForgotPassword },
           { [styles.forgotEnter]: this.state.showForgotPassword }
         ),
          enterActive: classnames(
           { [styles.enterActive]: !this.state.showForgotPassword },
           { [styles.forgotEnterActive]: this.state.showForgotPassword }
         ),
        }}
        transitionLeaveTimeout={300}
        transitionEnterTimeout={300}
      >
        {
         !this.state.showForgotPassword ?
           <div className={styles.innerContainer}>
             <Logo className={styles.logo} />
             <div className={styles.greeting}>
               <span className={styles.largeText}>T&#275;n&#257; koe</span>
               <span className={styles.smallText}>Welcome to Vensa</span>
             </div>
             <SignUpForm
               secondaryCta
               login={this.props.login}
               isFetching={this.props.isFetching}
               goToRegister={this.props.goToRegister}
               toggleForgotPassword={this.toggleForgotPassword}
             />
           </div> : null
       }
        {
         this.state.showForgotPassword ?
           <ForgotPasswordSlider
             hasSent={this.props.hasSentPassword}
             shouldError={this.props.shouldErrorPassword}
             requestNewPassword={this.props.requestNewPassword}
             clearState={this.props.clearPasswordState}
             toggleForgotPassword={this.toggleForgotPassword}
           /> :
         null
       }
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.loginReducer.isFetching,
  hasSentPassword: state.requestNewPasswordReducer.success,
  shouldErrorPassword: state.requestNewPasswordReducer.error !== null,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  login: bindActionCreators(loginActions.login, dispatch),
  loginSuccess: bindActionCreators(loginActions.loginSuccess, dispatch),
  requestNewPassword: bindActionCreators(passwordActions.requestNewPassword, dispatch),
  clearPasswordState: bindActionCreators(passwordActions.clearState, dispatch),
  clearRegisterData: bindActionCreators(registerActions.clearRegisterData, dispatch),
  goToRegister: () => bindActionCreators(push, dispatch)(routeConfig.register.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryPage);
export {
  styles,
};
