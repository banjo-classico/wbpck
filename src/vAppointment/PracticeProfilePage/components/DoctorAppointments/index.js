import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { map } from "lodash/fp";
import moment from "moment";
import classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { actions as appointmentActions } from "../../../PracticeBookingPage/actions/actions";
import { actions as appActions } from "../../../../App/actions/actions";
import { actions as filterActions } from "../../../PracticeBookingPage/actions/filterActions";
import { actions as multiDayActions } from "../../actions/appointmentActions";
import { actions as popUpActions } from "../../actions/popUpActions";
import { actions as enrolCheckActions } from "../../../PatientSelectionPage/actions/actions";
import DaySelector from "../DaySelector";
import NotOnline from "../NotOnline";
import FilterBox from "../../filterComponents/FilterBox";
// import FilterStrings from "../../filterComponents/FilterStrings";
import DoctorMainComponent from "../DoctorMainComponent";
import DesktopPopUp from "../../popUpComponents/DesktopPopUp";
import DesktopDoctorProfile from "../../popUpComponents/DesktopDoctorProfile";
import AppointmentInfoContainer from "../../popUpComponents/AppointmentInfoContainer";
import LoginTriage from "../../../LoginTriage";
import SelectionDesktopPage from "../../../PatientSelectionPage/components/DesktopPage";
import { practicePropType, doctorProfilePropType } from "../../propTypes";
import { SelectedTimePropType } from "../../../PracticeBookingPage/propTypes";
import styles from "./doctorAppointments.css";
import { findDoctor } from "../../../../selectors/appointmentSelectors";
import { filterDoctors, matchAppointments } from "../../filterFunctions";

export class DoctorAppointments extends Component {
  static propTypes = {
    addAppStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    getMultiDayAppointments: PropTypes.func.isRequired,
    currentFilter: PropTypes.string.isRequired,
    setMainComponent: PropTypes.func.isRequired,
    setSideComponent: PropTypes.func.isRequired,
    togglePopUp: PropTypes.func.isRequired,
    showPopUp: PropTypes.bool.isRequired,
    clearEnrollmentCheck: PropTypes.func.isRequired,
    filterMorning: PropTypes.func.isRequired,
    filterAfternoon: PropTypes.func.isRequired,
    filterEvening: PropTypes.func.isRequired,
    selectTime: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Date).isRequired,
    doctors: PropTypes.arrayOf(doctorProfilePropType).isRequired,
    appointments: PropTypes.arrayOf(doctorProfilePropType).isRequired,
    practice: practicePropType.isRequired,
    selectedTime: SelectedTimePropType.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFetchingPractice: PropTypes.bool.isRequired,
    maxDays: PropTypes.number.isRequired,
    urlName: PropTypes.string,
    mainComponent: PropTypes.node,
    sideComponent: PropTypes.func,
    token: PropTypes.string,
    doctor: doctorProfilePropType,
    onTimeSelectedFn: PropTypes.func,
    shouldHideButton: PropTypes.bool,
  }
  state = {
    isDoctorProfile: false,
    mainDay: moment(),
    filterStr: "",
    filteredDoctors: this.props.doctors,
    filterTop: 100,
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.urlName !== this.props.urlName) {
      // when we mount we want the flu clinic to be at the top of the doctors
      this.getAppointments(moment(), "flu", nextProps.urlName);
    }
    if (nextProps.doctors !== this.props.doctors) {
      this.filterDoctors(
        filterDoctors(this.state.filterStr),
        this.state.filterStr,
        nextProps.doctors
      );
    }
    if (nextProps.showPopUp === true && window.innerHeight < 700) {
      this.props.clearAppStyles();
    }
    if (this.props.showPopUp === true && nextProps.showPopUp === false) {
      this.props.addAppStyles([styles.app]);
    }
    if (nextProps.showPopUp === true && window.innerHeight < 700) {
      this.props.clearAppStyles();
    }
    if (nextProps.showPopUp === false && this.props.showPopUp === true) {
      this.props.addAppStyles([styles.app]);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  getAppointments = (startDay, doctorName, id) => {
    this.props.getMultiDayAppointments(id, moment(startDay), 5, doctorName);
  }
  setMainDay = (day) => {
    this.setState({ mainDay: day });
    this.getAppointments(day, "flu");
  }
  setTime = (doctorId, appointmentId, time) => {
    this.props.selectTime(doctorId, appointmentId, time);
    if (this.props.onTimeSelectedFn) {
      this.props.onTimeSelectedFn(doctorId, appointmentId, time);
    }
  }
  setIsDoctorProfile = (bool) => {
    this.setState({ isDoctorProfile: bool });
  }
  togglePopUp = (mainComponent, sideComponent, isDoctorProfile = false) => {
    this.setIsDoctorProfile(isDoctorProfile);
    this.props.togglePopUp();
    if (!this.props.showPopUp) {
      this.props.setMainComponent(mainComponent);
      this.props.setSideComponent(sideComponent);
    }
    if (this.props.showPopUp) {
      this.props.clearEnrollmentCheck();
    }
  }
  filterToDate = (date) => {
    const hourOfDay = moment(date).hour();
    if (hourOfDay < 12) {
      this.props.filterMorning();
    } else if (hourOfDay < 17) {
      this.props.filterAfternoon();
    } else {
      this.props.filterEvening();
    }
    this.setMainDay(moment(date));
  }
  moveDays = (direction) => {
    if (direction === "forward") {
      this.setState({ mainDay: this.state.mainDay.add(5, "days") });
    }
    if (direction === "back") {
      this.setState({ mainDay: this.state.mainDay.subtract(5, "days") });
    }
    this.getAppointments(this.state.mainDay, "flu");
  }
  filterDoctors = (filterFn, filterStr, doctors = this.props.doctors) => {
    const filteredDoctors = filterFn(doctors);
    if (filterStr.length <= 0) {
      this.setState({ filteredDoctors: doctors });
    } else {
      this.setState({ filteredDoctors });
    }
    this.setState({ filterStr });
  }
  handleScroll = () => {
    if (this.filters) {
      this.setState({ filterTop: this.filters.getBoundingClientRect().top });
    }
  }
  // <FilterStrings filterStr={this.state.filterStr} clearFilter={this.clearFilter}/>
  render() {
    const shouldFix = this.state.filterTop < 1;
    return (
      <ReactCSSTransitionGroup
        component="div"
        className={styles.container}
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        ref={c => { this.container = c; }}
      >
        <div
          ref={c => { this.filters = c; }}
          className={classnames({ [styles.filterBox]: shouldFix })}
        >
          <div className={classnames({ [styles.fixed]: shouldFix })}>
            <FilterBox
              currentFilter={this.props.currentFilter}
              filterMorning={this.props.filterMorning}
              filterAfternoon={this.props.filterAfternoon}
              filterEvening={this.props.filterEvening}
              selectedDay={this.props.selectedDay}
              setMainDay={this.setMainDay}
              maxDays={this.props.maxDays}
              filterDoctors={this.filterDoctors}
            />
            {
              this.props.practice.IsOnline ?
                <DaySelector
                  onClickLeft={() => this.moveDays("back")}
                  onClickRight={() => this.moveDays("forward")}
                  mainDay={this.state.mainDay}
                /> : null
            }
          </div>
        </div>
        {!this.props.isFetchingPractice && !this.props.practice.IsOnline ?
          <NotOnline clinic={this.props.practice} /> :
          <div>
            {
          map(d =>
            <DoctorMainComponent
              key={d.PmsUserId}
              isFetching={this.props.isFetching}
              doctor={d}
              appointments={matchAppointments(d.PmsUserId, this.props.appointments)}
              togglePopUp={() => this.togglePopUp(
                this.props.token ?
                  <SelectionDesktopPage /> :
                  <LoginTriage />,
                AppointmentInfoContainer,
              )}
              toggleDoctorProfile={
                (id, selectedDay = moment(), shouldShowExtras) => this.togglePopUp(
                  <DesktopDoctorProfile
                    id={id}
                    orgid={this.props.practice.Id}
                    selectedDay={selectedDay}
                    showProfileExtras={shouldShowExtras}
                    setIsDoctorProfile={this.setIsDoctorProfile}
                  />,
                  null,
                  true,
                )
              }
              setTime={this.setTime}
              filterToDate={this.filterToDate}
              currentFilter={this.props.currentFilter}
            />
          )(this.state.filteredDoctors)
          }
          </div>
        }
        {this.props.showPopUp ?
          <DesktopPopUp
            isDoctorProfile={this.state.isDoctorProfile}
            closePopUp={this.togglePopUp}
            shouldHideButton={this.props.shouldHideButton}
            sideComponent={this.props.sideComponent && <this.props.sideComponent
              doctor={this.props.doctor}
              practiceName={this.props.practice.Name}
              appointment={this.props.selectedTime.time}
              closePopUp={this.togglePopUp}
            />}
            mainComponent={this.props.mainComponent}
          /> : null}
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  urlName: state.practiceAppointmentReducer.practiceInfo.practice.UrlName,
  isFetchingPractice: state.practiceProfileReducer.isFetching,
  isFetching: state.multiDayAppointmentsReducer.isFetching,
  mainComponent: state.practiceProfilePopUpReducer.mainComponent,
  shouldHideButton: state.practiceProfilePopUpReducer.shouldHideButton,
  sideComponent: state.practiceProfilePopUpReducer.sideComponent,
  showPopUp: state.practiceProfilePopUpReducer.showPopUp,
  token: state.loginReducer.token,
  onTimeSelectedFn: state.practiceBookingPageReducer.onTimeSelectedFn,
  selectedTime: state.practiceAppointmentReducer.selectedTime,
  selectedDay: state.practiceAppointmentReducer.selectedDay,
  maxDays: state.practiceAppointmentReducer.practiceInfo.practice.MaxDays || 0,
  doctors: state.multiDayAppointmentsReducer.doctorInfo.doctors,
  appointments: state.multiDayAppointmentsReducer.doctors,
  currentFilter: state.multiDayAppointmentsReducer.currentFilter,
  doctor: findDoctor(
    state.practiceAppointmentReducer.selectedTime.doctorId,
    state.practiceProfileReducer.profile.Doctors,
  ),

});
const mapDispatchToProps = (dispatch) => ({
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  selectTime: bindActionCreators(appointmentActions.selectTime, dispatch),
  getMultiDayAppointments: bindActionCreators(multiDayActions.fetchMultiDayAppointments, dispatch),
  setMainComponent: bindActionCreators(popUpActions.setMainComponent, dispatch),
  setSideComponent: bindActionCreators(popUpActions.setSideComponent, dispatch),
  togglePopUp: bindActionCreators(popUpActions.togglePopUp, dispatch),
  clearEnrollmentCheck: bindActionCreators(enrolCheckActions.clearState, dispatch),
  filterMorning: bindActionCreators(filterActions.filterMorning, dispatch),
  filterAfternoon: bindActionCreators(filterActions.filterAfternoon, dispatch),
  filterEvening: bindActionCreators(filterActions.filterEvening, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAppointments);
