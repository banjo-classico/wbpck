import React, { Component, PropTypes } from "react";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import isMobilePhone from "validator/lib/isMobilePhone";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as loginActions } from "../EntryPage/actions/actions";
// eslint-disable-next-line max-len
import { actions as passwordActions } from "../../vAppointment/RequestNewPasswordPage/actions/actions";
import { actions as registerActions } from "./actions/actions";
import { actions as checkActions } from "./actions/checkUsernameActions";

import Names from "./components/Names";
import DateOfBirth from "./components/DateOfBirth";
import Mobile from "./components/Mobile";
import Email from "./components/Email";
import Password from "./components/Password";
import Header from "./components/Header";
import Switcheroo from "../../components/Switcheroo";
import styles from "./registerPage.css";

class RegisterPage extends Component {
  static propTypes = {
    firstName: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.instanceOf(Date),
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    usedEmail: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    setFirstName: PropTypes.func.isRequired,
    setSurname: PropTypes.func.isRequired,
    setDateOfBirth: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setMobile: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    clearRegisterData: PropTypes.func.isRequired,
    isEmailValid: PropTypes.bool.isRequired,
    checkEmail: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    requestNewPassword: PropTypes.func.isRequired,
    goBackProp: PropTypes.func.isRequired,
    clearPasswordState: PropTypes.func.isRequired,
    isEmailChecking: PropTypes.bool.isRequired,
    clearCheckUserState: PropTypes.func.isRequired,
    accept: PropTypes.bool.isRequired,
    setAcceptTnC: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    shouldErrorPassword: PropTypes.bool,
    hasSentPassword: PropTypes.bool,
    isEmailError: PropTypes.bool,

  }
  constructor(props) {
    super(props);
    this.allDetailsFilled = this.allDetailsFilled.bind(this);
    this.register = this.register.bind(this);
    this.handleSwitcheroo = this.handleSwitcheroo.bind(this);
    this.backArrowFn = this.backArrowFn.bind(this);
    this.setHeaderText = this.setHeaderText.bind(this);
  }
  state = {
    headerText: "What's your name?",
    showWelcomeBack: true,
  }
  componentWillMount() {
    this.props.clearRegisterData();
    this.props.setHeading(<div />);
    this.props.addStyles([styles.hidden]);
    this.props.addAppStyles([styles.app]);
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.clearStyles();
    this.props.clearAppStyles();
    this.props.clearCheckUserState();
  }
  setHeaderText(text) {
    this.setState({ headerText: text });
  }
  register() {
    if (this.allDetailsFilled()) {
      this.props.register({
        firstName: this.props.firstName,
        lastName: this.props.surname,
        dateOfBirth: this.props.dateOfBirth,
        mobile: this.props.mobile,
        email: this.props.email,
        password: this.props.password,
      });
    }
  }

  allDetailsFilled() {
    return this.props.firstName.length > 0 &&
      this.props.surname.length > 0 &&
      moment(this.props.dateOfBirth).isValid() &&
      isMobilePhone(this.props.mobile, "en-NZ") &&
      this.props.email.length > 0 &&
      this.props.password.length > 0;
  }
  handleSwitcheroo(next, last) {
    if (this.switcheroo) {
      this.switcheroo.setItemToShow(next, last);
    }
  }
  backArrowFn() {
    if (this.switcheroo) {
      const next = this.switcheroo.state.itemToShow - 1;
      const last = this.switcheroo.state.itemToShow;
      if (last === 1) {
        this.props.goBackProp();
      } else {
        this.handleSwitcheroo(next, last);
      }
    }
  }
  render() {
    const firstName = this.props.firstName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    const surname = this.props.surname.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    return (
      <div
        className={styles.page}
      >
        <Header text={this.state.headerText} onClick={this.backArrowFn} />
        <div className={styles.mainContainer}>
          <Switcheroo
            ref={c => { this.switcheroo = c; }}
            className={styles.switcheroo}
            firstItem={
              <Names
                setHeaderText={() => this.setHeaderText("What's your name?")}
                setFirstName={this.props.setFirstName}
                firstName={this.props.firstName}
                setSurname={this.props.setSurname}
                surname={this.props.surname}
                onClick={() => {
                  this.setHeaderText(`${firstName} ${surname}`);
                  this.handleSwitcheroo(2, 1);
                }}
              />
            }
            secondItem={
              <DateOfBirth
                setDateOfBirth={this.props.setDateOfBirth}
                dateOfBirth={this.props.dateOfBirth}
                onClick={() => {
                  this.handleSwitcheroo(3, 2);
                }}
              />
            }
            thirdItem={
              <Mobile
                setMobile={this.props.setMobile}
                mobile={this.props.mobile}
                onClick={() => {
                  this.handleSwitcheroo(4, 3);
                }}
              />
            }
            fourthItem={
              <Email
                checkEmail={this.props.checkEmail}
                email={this.props.email}
                isEmailChecking={this.props.isEmailChecking}
                isEmailError={this.props.isEmailError}
                isEmailValid={this.props.isEmailValid}
                onClick={() => {
                  this.handleSwitcheroo(5, 4);
                }}
                clearCheckState={this.props.clearCheckUserState}
                isFetching={this.props.isFetching}
                hasSentPassword={this.props.hasSentPassword}
                shouldErrorPassword={this.props.shouldErrorPassword}
                login={this.props.login}
                requestNewPassword={this.props.requestNewPassword}
                clearPasswordState={this.props.clearPasswordState}
                usedEmail={this.props.usedEmail}
              />
            }
            fifthItem={
              <Password
                setPassword={this.props.setPassword}
                password={this.props.password}
                onClick={this.register}
              />
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName: state.registerPatientInfoReducer.firstName,
  surname: state.registerPatientInfoReducer.surname,
  dateOfBirth: state.registerPatientInfoReducer.dateOfBirth,
  mobile: state.registerPatientInfoReducer.mobile,
  email: state.registerPatientInfoReducer.email,
  password: state.registerPatientInfoReducer.password,
  accept: state.registerPatientInfoReducer.accept,
  isEmailChecking: state.checkUsernameReducer.checking,
  isEmailError: state.checkUsernameReducer.error,
  isEmailValid: state.checkUsernameReducer.isValid,
  isFetching: state.loginReducer.isFetching,
  hasSentPassword: state.requestNewPasswordReducer.success,
  shouldErrorPassword: state.requestNewPasswordReducer.error !== null,
  usedEmail: state.checkUsernameReducer.usedEmail,
});

const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  setFirstName: bindActionCreators(registerActions.setFirstName, dispatch),
  setSurname: bindActionCreators(registerActions.setSurname, dispatch),
  setDateOfBirth: bindActionCreators(registerActions.setDateOfBirth, dispatch),
  setMobile: bindActionCreators(registerActions.setMobile, dispatch),
  setPassword: bindActionCreators(registerActions.setPassword, dispatch),
  setAcceptTnC: bindActionCreators(registerActions.setAcceptTnC, dispatch),
  register: bindActionCreators(registerActions.register, dispatch),
  clearRegisterData: bindActionCreators(registerActions.clearRegisterData, dispatch),
  checkEmail: bindActionCreators(checkActions.checkUsername, dispatch),
  clearCheckUserState: bindActionCreators(checkActions.clearCheckUserState, dispatch),
  goBackProp: bindActionCreators(goBack, dispatch),
  login: bindActionCreators(loginActions.login, dispatch),
  requestNewPassword: bindActionCreators(passwordActions.requestNewPassword, dispatch),
  clearPasswordState: bindActionCreators(passwordActions.clearState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
