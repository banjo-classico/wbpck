import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { map, filter, compose, min } from "lodash/fp";
import { push } from "react-router-redux";
import moment from "moment";

import { actions as appointmentActions } from "./actions/actions";
import { actions as filterActions, filterTypes } from "./actions/filterActions";
import { actions as pageActions } from "./actions/pageActions";
import { actions as checkoutActions } from "../CheckoutPage/actions/actions";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as sessionActions } from "../ConfirmationCodePage/actions/sessionActions";
import { DoctorProfilePropType, SelectedTimePropType } from "./propTypes";
import DoctorContainer from "./components/doctorContainer";
import DatePickerComponent from "./components/DatePicker";
import LoadingSpinner from "../../components/loadingSpinner";
import EmptyBookings from "./components/EmptyBookings";
import DoctorProfilePopUp from "./components/DoctorProfilePopUp";
import styles from "./practiceBooking.css";
import { clearAppointmentData } from "../../selectors/appointmentSelectors";
import { routeConfig } from "../../routes";

class PracticeBookingPage extends Component {
  static propTypes = {
    getPracticeInfo: PropTypes.func.isRequired,
    routeParams: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    setHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    removeStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    clearSecondLine: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    setHeadingSecondLine: PropTypes.func.isRequired,
    selectTime: PropTypes.func.isRequired,
    filterMorning: PropTypes.func.isRequired,
    filterAfternoon: PropTypes.func.isRequired,
    filterEvening: PropTypes.func.isRequired,
    selectDay: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    doctors: PropTypes.arrayOf(DoctorProfilePropType).isRequired,
    selectedTime: SelectedTimePropType,
    pushProp: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    clearSession: PropTypes.func.isRequired,
    clearAppointmentData: PropTypes.func.isRequired,
    clearAppointmentConfirm: PropTypes.func.isRequired,
    clearPracticeBookingPageReducerState: PropTypes.func.isRequired,
    practiceName: PropTypes.string.isRequired,
    shouldClearSessionStateOnMount: PropTypes.bool.isRequired,
    onTimeSelectedFn: PropTypes.func,
    nextAvailable: PropTypes.string,
    setDateTimePickerIsShowing: PropTypes.func.isRequired,
  }
  state = {
    showDoctorProfile: false,
    shownDoctorId: null,
  }
  componentWillMount() {
    // TODO: check if practiceInfo already exists
    this.props.getPracticeInfo(this.props.routeParams.id);
    if (this.props.shouldClearSessionStateOnMount) {
      this.props.clearAppointmentConfirm();
      this.props.clearAppointmentData();
    }
  }
  componentDidMount() {
    this.props.setHeading(<div />);
    this.props.addStyles([styles.header]);
    this.props.addAppStyles([styles.app]);
    this.props.displayHeaderIcons({ menu: false, arrow: true, help: true });
    this.props.setHeadingSecondLine(
      <DatePickerComponent practiceUrlName={this.props.routeParams.id} />
    );
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this.container)
      .addEventListener("click", this.setDateTimePickerIsShowing, false);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.practiceName.length > 1) {
      this.props.setHeading(<div className={styles.headerName}>{nextProps.practiceName}</div>);
      if (document.title !== nextProps.practiceName) {
        document.title = nextProps.practiceName;
      }
    }
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
    // the next if statement is for when header is fixed
    // if (this.container) {
    //   // eslint-disable-next-line react/no-find-dom-node
    //   ReactDOM.findDOMNode(this.container).children[0].scrollIntoView(true);
    // }
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.clearSecondLine();
    this.props.clearStyles();
    this.props.clearAppStyles();
    this.props.displayHeaderIcons();
    this.props.clearPracticeBookingPageReducerState();
  }
  setDateTimePickerIsShowing = () => {
    this.props.setDateTimePickerIsShowing(false);
  }
  setTime = (doctorId, appointmentId, time) => {
    this.props.selectTime(doctorId, appointmentId, time);
    if (this.props.onTimeSelectedFn) {
      this.props.onTimeSelectedFn(doctorId, appointmentId, time);
    } else if (this.props.isLoggedIn) {
      this.props.pushProp(routeConfig.patientSelection.getBrowserPath());
    } else {
      this.props.pushProp(routeConfig.loginTriage.getBrowserPath());
    }
  }
  toggleDoctorProfile = (shownDoctorId) => {
    this.setState({ showDoctorProfile: !this.state.showDoctorProfile, shownDoctorId });
    if (this.state.showDoctorProfile) {
      this.props.removeStyles([styles.headerZ]);
    } else {
      this.props.addStyles([styles.headerZ]);
    }
  }
  goToDate = (date) => () => {
    const hourOfDay = moment(date).hour();
    if (hourOfDay < 12) {
      this.props.filterMorning();
    } else if (hourOfDay < 17) {
      this.props.filterAfternoon();
    } else {
      this.props.filterEvening();
    }
    this.props.selectDay(this.props.routeParams.id, moment(date), "first", "flu");
  }
  getNextAvailable = () => {
    return compose(
      min,
      map(d => d.NextAvailableSlot)
    )(this.props.availableDoctors)
  }
  render() {
    const emptyBookings = filter(
      d => d.AvailableSlots.length !== 0,
      this.props.doctors
    ).length === 0;
    this.getNextAvailable();
    return (
      <LoadingSpinner
        isFetching={this.props.isFetching}
        iconClassName={styles.icon}
        containerClassName={styles.page}
        contentRef={c => { this.container = c; }}
        onClick={() => this.props.setDateTimePickerIsShowing(false)}
      >
        {this.state.showDoctorProfile ?
          <DoctorProfilePopUp
            id={this.state.shownDoctorId}
            orgid={this.props.routeParams.id}
            closeProfile={this.toggleDoctorProfile}
          /> : null
        }
        {
          !this.props.isFetching && emptyBookings ?
            <EmptyBookings goToDate={this.goToDate} nextAvailable={this.getNextAvailable()} /> :
          map(d =>
            <DoctorContainer
              selectedTime={this.props.selectedTime}
              doctor={d}
              setTime={this.setTime}
              key={d.PmsUserId}
              onClick={this.toggleDoctorProfile}
              goToDate={this.goToDate}
            />, this.props.doctors
          )
        }
      </LoadingSpinner>
    );
  }
}

const mapStateToProps = (state) => ({
  shouldClearSessionStateOnMount: state.practiceBookingPageReducer.shouldClearStateOnMount,
  onTimeSelectedFn: state.practiceBookingPageReducer.onTimeSelectedFn,
  isLoggedIn: state.loginReducer.token !== null,
  selectedTime: state.practiceAppointmentReducer.selectedTime,
  currentFilter: state.practiceAppointmentReducer.currentFilter,
  isFetching: state.practiceAppointmentReducer.doctorInfo.isFetching,
  practiceName: state.practiceAppointmentReducer.practiceInfo.practice.Name,
  availableDoctors: state.practiceAppointmentReducer.doctorInfo.doctors,
  doctors: (() => {
    switch (state.practiceAppointmentReducer.currentFilter) {
      case filterTypes.morning:
        return state.practiceAppointmentReducer.days.first.morningAppointments;
      case filterTypes.afternoon:
        return state.practiceAppointmentReducer.days.first.afternoonAppointments;
      case filterTypes.evening:
        return state.practiceAppointmentReducer.days.first.eveningAppointments;
      default: return state.practiceAppointmentReducer.days.first.morningAppointments;
    }
  })(),
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  clearSecondLine: bindActionCreators(headerActions.clearSecondLine, dispatch),
  setHeadingSecondLine: bindActionCreators(headerActions.setSecondLine, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  removeStyles: bindActionCreators(headerActions.removeStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  selectTime: bindActionCreators(appointmentActions.selectTime, dispatch),
  getPracticeInfo: bindActionCreators(appointmentActions.fetchPracticeInfo, dispatch),
  clearSession: bindActionCreators(sessionActions.clearSession, dispatch),
  clearAppointmentConfirm: bindActionCreators(checkoutActions.clearConfirmationState, dispatch),
  clearPracticeBookingPageReducerState: bindActionCreators(pageActions.clearState, dispatch),
  clearAppointmentData: clearAppointmentData(dispatch),
  pushProp: bindActionCreators(push, dispatch),
  setDateTimePickerIsShowing: bindActionCreators(pageActions.setDateTimePickerIsShowing, dispatch),
  filterMorning: bindActionCreators(filterActions.filterMorning, dispatch),
  filterAfternoon: bindActionCreators(filterActions.filterAfternoon, dispatch),
  filterEvening: bindActionCreators(filterActions.filterEvening, dispatch),
  selectDay: bindActionCreators(appointmentActions.selectDay, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticeBookingPage);
