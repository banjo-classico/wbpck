import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import moment from "moment";
import classnames from "classnames";

import RegisterForm from "./components/RegisterForm";
import IsRegistering from "./components/IsRegistering";
import AppointmentInfo from "./components/AppointmentInfo";
import Heading from "./components/Heading";
import DesktopHeading from "./components/DesktopHeading";
import autoRegisterImg from "../images/autoRegisterImg.png";
import styles from "./autoRegisterPage.css";
import { actions as headerActions } from "../components/header/actions/actions";
import { actions as registerActions } from "./actions/actions";
import { actions as appActions } from "../App/actions/actions";
// eslint-disable-next-line max-len
import { actions as checkActions } from "../ConsumerInterface/RegisterPage/actions/checkUsernameActions";
import { clearAppointmentData, findDoctor } from "../selectors/appointmentSelectors";
import { DoctorProfilePropType } from "../vAppointment/PracticeBookingPage/propTypes";
import { routeConfig } from "../routes";
import { isDesktop } from "../config";

export class AutoRegisterPage extends Component {
  static propTypes = {
    addAppStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    setHeadingSecondLine: PropTypes.func.isRequired,
    clearSecondLine: PropTypes.func.isRequired,
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearAppointmentData: PropTypes.func.isRequired,
    autoRegisterUser: PropTypes.func.isRequired,
    home: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
    sessionId: PropTypes.string.isRequired,
    registerSuccess: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isEmailChecking: PropTypes.bool.isRequired,
    confirmingAppointment: PropTypes.bool.isRequired,
    isValidEmail: PropTypes.bool.isRequired,
    checkEmail: PropTypes.func.isRequired,
    clearCheckUserState: PropTypes.func.isRequired,
    appointment: PropTypes.instanceOf(moment).isRequired,
    doctor: DoctorProfilePropType.isRequired,
    isEmailError: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }
  componentDidMount() {
    this.props.setHeading(
      isDesktop() ?
        <DesktopHeading doctor={this.props.doctor} appointment={this.props.appointment} /> :
        <Heading confirming={this.props.confirmingAppointment} />
    );
    if (!isDesktop()) {
      this.props.setHeadingSecondLine(
        <AppointmentInfo
          doctor={this.props.doctor}
          appointment={this.props.appointment}
          confirming={this.props.confirmingAppointment}
        />
      );
      this.props.displayHeaderIcons({ menu: false, arrow: false, help: true });
    }
    this.props.addStyles([styles.header]);
    this.props.addAppStyles([styles.app]);
  }
  componentDidUpdate() {
    if (this.props.registerSuccess) {
      this.props.home();
    }
  }
  componentWillUnmount() {
    this.props.clearAppointmentData();
    this.props.clearCheckUserState();
    this.props.displayHeaderIcons();
    this.props.clearAppStyles();
    this.props.clearSecondLine();
    this.props.clearHeading();
    this.props.clearStyles();
  }
  register(email, password) {
    this.props.autoRegisterUser(email, this.props.sessionId, password);
  }
  render() {
    return (
      <div
        className={classnames(styles.container, { [styles.flexContainer]: this.props.isFetching })}
        style={{
          backgroundImage: `url(${autoRegisterImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {
          this.props.isFetching ?
            <IsRegistering /> :
            <RegisterForm
              registerUser={this.register}
              checkEmail={this.props.checkEmail}
              isEmailError={this.props.isEmailError}
              isValidEmail={this.props.isValidEmail}
              isEmailChecking={this.props.isEmailChecking}
              goToLogin={this.props.goToLogin}
            />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  confirmingAppointment: state.appointmentConfirmationReducer.checking,
  sessionId: state.sessionReducer.sessionId,
  isFetching: state.autoRegisterReducer.isFetching,
  registerSuccess: state.autoRegisterReducer.success,
  isEmailError: state.checkUsernameReducer.error,
  isValidEmail: state.checkUsernameReducer.isValid,
  isEmailChecking: state.checkUsernameReducer.checking,
  doctor: findDoctor(
    state.practiceAppointmentReducer.selectedTime.doctorId,
    isDesktop() ?
      state.practiceProfileReducer.profile.Doctors :
      state.practiceAppointmentReducer.doctorInfo.doctors,
  ),
  appointment: moment(state.practiceAppointmentReducer.selectedTime.time),
});
const mapDispathToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  setHeadingSecondLine: bindActionCreators(headerActions.setSecondLine, dispatch),
  clearSecondLine: bindActionCreators(headerActions.clearSecondLine, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  autoRegisterUser: bindActionCreators(registerActions.autoRegisterUser, dispatch),
  home: () => bindActionCreators(push, dispatch)(routeConfig.home.getBrowserPath()),
  checkEmail: bindActionCreators(checkActions.checkUsername, dispatch),
  clearCheckUserState: bindActionCreators(checkActions.clearCheckUserState, dispatch),
  clearAppointmentData: clearAppointmentData(dispatch),
  goToLogin: () => bindActionCreators(push, dispatch)(routeConfig.login.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispathToProps)(AutoRegisterPage);
