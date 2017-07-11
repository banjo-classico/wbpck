import React, { Component } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import smoothScroll from "smoothscroll";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as bookingActions } from "../PracticeBookingPage/actions/actions";
import { actions as practiceProfileActions } from "./actions/actions";
import { actions as loginActions } from "../../ConsumerInterface/EntryPage/actions/actions";
import { practicePropType } from "./propTypes";
import renderOnResolutionChange from "../../components/RenderOnResolutionChange";
import DesktopHeader from "./components/DesktopHeader";
import LoginPopUp from "./components/LoginPopUp";
import PracticeHeader from "./components/PracticeHeader";
import PracticeContact from "./components/PracticeContact";
import PracticeDescription from "./components/PracticeDescription";
import InstantDoctorAppointment from "./components/InstantDoctorAppointment";
import OpeningHours from "./components/OpeningHours";
import Languages from "./components/Languages";
import Specialities from "./components/Specialities";
import OurTeam from "./components/OurTeam";
import DoctorAppointments from "./components/DoctorAppointments";
import NotOnline from "./components/NotOnline";
import styles from "./practiceProfilePage.css";
import { clearAppointmentData } from "../../selectors/appointmentSelectors";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";

class PracticeProfilePage extends Component {
  static propTypes = {
    getPracticeProfile: PropTypes.func.isRequired,
    getPracticeInfo: PropTypes.func.isRequired,
    clearAppointmentData: PropTypes.func.isRequired,
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    bookNow: PropTypes.func.isRequired,
    goToDoctorProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    goForgotPassword: PropTypes.func.isRequired,
    routeParams: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    shouldClearStateOnMount: PropTypes.bool.isRequired,
    practice: practicePropType.isRequired,
    token: PropTypes.string,
    error: PropTypes.object,
    loginError: PropTypes.object,
    isLoggedIn: PropTypes.bool,
  }
  state = {
    login: false,
  }
  componentWillMount() {
    if (this.props.shouldClearStateOnMount) {
      this.props.clearAppointmentData();
    }
  }
  componentDidMount() {
    // to get the missing practice info for later pages.
    if (isDesktop()) this.props.getPracticeInfo(this.props.routeParams.id);
    this.props.getPracticeProfile(this.props.routeParams.id);
    this.props.addStyles([styles.header]);
    this.props.addAppStyles([styles.app]);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.practice.Name !== this.props.practice.Name) {
      if (document.title !== nextProps.practice.Name) {
        document.title = nextProps.practice.Name;
      }
    }
    if (isDesktop() && (this.props.practice || (nextProps.token !== this.props.token))) {
      this.props.setHeading(
        <DesktopHeader
          practice={nextProps.practice}
          isLoggedIn={nextProps.isLoggedIn}
          logInAction={
            nextProps.isLoggedIn ?
             this.handleLogOut(nextProps.token) :
            this.toggleLogin
          }
        />);
      this.props.displayHeaderIcons({ menu: false, arrow: false, help: false });
    }
    if (!isDesktop()) {
      this.props.clearHeading();
      this.props.addStyles([styles.header]);
      this.props.displayHeaderIcons({ menu: false, arrow: true, help: true });
    }
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.clearHeading();
  }
  scrollToAppointments = () => {
    // eslint-disable-next-line react/no-find-dom-node
    smoothScroll(findDOMNode(this.appointments));
  }
  toggleLogin = () => {
    this.setState({ login: !this.state.login });
  }
  login = (email, password) => {
    this.props.login(email, password);
    this.toggleLogin();
  }
  handleLogOut = (token) => () => {
    this.props.logout(
      token,
      { path: "practiceProfile", id: this.props.routeParams.id },
    );
  }
  render() {
    return (
      <div>
        {!this.props.isFetching && !this.props.practice.IsOnline && !isDesktop() ?
          <NotOnline clinic={this.props.practice} /> :
          <div className={styles.container} ref={c => { this.page = c; }}>
            {this.props.error && this.props.error.status === 404 ?
              <div className={styles.error}>
              Sorry, the practice you are looking for was not found
            </div> :
              <div className={styles.contentContainer}>
                <div className={styles.pageLayout}>
                  <div className={styles.infoContent}>
                    {
                      !isDesktop() ?
                        <PracticeHeader
                          practice={this.props.practice}
                          isFetching={this.props.isFetching}
                        /> : null
                    }
                    <InstantDoctorAppointment
                      type={this.props.practice.AllowsBookingBy}
                      practice={this.props.practice.Name}
                      onClick={isDesktop() ?
                    this.scrollToAppointments :
                    () => this.props.bookNow(this.props.routeParams.id)
                  }
                      // doctors={this.props.doctors}
                    />
                    <div className={styles.infoInner}>
                      {!isDesktop() ? <PracticeContact practice={this.props.practice} /> : null}
                      <OpeningHours
                        hours={this.props.practice.OpeningHours}
                        note={this.props.practice.HourNote}
                      />
                    </div>
                  </div>
                  <div className={styles.mainContent}>
                    <Languages
                      className={styles.languages}
                      languages={this.props.practice.Language}
                      title="Languages we speak"
                    />
                    <Specialities specialities={this.props.practice.Specialties} />
                    <OurTeam
                      team={this.props.practice.Doctors}
                      pushProp={this.props.goToDoctorProfile(this.props.routeParams.id)}
                      orgid={this.props.routeParams.id}
                      onBookNow={() => this.props.bookNow(this.props.routeParams.id)}
                    />
                    <PracticeDescription description={this.props.practice.Description} />
                    {isDesktop() ? <PracticeContact practice={this.props.practice} /> : null}
                    {
                  isDesktop() ?
                    <PracticeHeader
                      practice={this.props.practice}
                      isFetching={this.props.isFetching}
                      hideImg
                    /> : null
                  }
                  </div>
                  <div className={styles.copyright}>&#169; 2016 Vensa Health</div>
                </div>
                {isDesktop() ?
                  <DoctorAppointments
                    ref={c => { this.appointments = c; }}
                    // doctors={this.props.doctors}
                    togglePopUp={this.togglePopUp}
                    practice={this.props.practice}
                    routeParams={this.props.routeParams}
                  /> : null
              }
              </div>
          }
            {this.state.login ?
              <LoginPopUp
                login={this.login}
                goForgotPassword={this.props.goForgotPassword}
                isError={this.props.loginError}
                closePopUp={this.toggleLogin}
              /> : null
          }
          </div>
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  isFetching: state.practiceProfileReducer.isFetching,
  practice: state.practiceProfileReducer.profile,
  shouldClearStateOnMount: state.practiceBookingPageReducer.shouldClearStateOnMount,
  error: state.practiceProfileReducer.error,
  isLoggedIn: state.loginReducer.token !== null,
  loginError: state.loginReducer.error,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  goToDoctorProfile: orgid => id =>
    bindActionCreators(push, dispatch)(routeConfig.doctorProfile.getBrowserPath(orgid, id)),
  bookNow: id => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
  getPracticeProfile: bindActionCreators(practiceProfileActions.getPracticeProfile, dispatch),
  getPracticeInfo: bindActionCreators(bookingActions.fetchPracticeInfo, dispatch),
  clearAppointmentData: clearAppointmentData(dispatch),
  // eslint-disable-next-line max-len
  goForgotPassword: () => bindActionCreators(push, dispatch)(routeConfig.passwordReset.getBrowserPath()),
  login: bindActionCreators(loginActions.login, dispatch),
  // eslint-disable-next-line max-len
  logout: bindActionCreators(loginActions.logout, dispatch),
});

// eslint-disable-next-line max-len
export default connect(mapStateToProps, mapDispatchToProps)(renderOnResolutionChange(PracticeProfilePage));
export {
  styles,
};
