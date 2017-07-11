import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";

import { actions as doctorActions } from "../../../DoctorProfilePage/actions/actions";
import { actions as appointmentActions } from "../../../PracticeBookingPage/actions/actions";
import { actions as popUpActions } from "../../actions/popUpActions";
import LoginTriage from "../../../LoginTriage";
import DesktopSelectionPage from "../../../PatientSelectionPage/components/DesktopPage";
import ProfileIntro from "../ProfileIntro";
import ProfileExtras from "../ProfileExtras";
import ProfileAppointments from "../ProfileAppointments";
import AppointmentInfoContainer from "../AppointmentInfoContainer";
import styles from "./desktopDoctorProfile.css";
import { doctorPropType } from "../../../DoctorProfilePage/propTypes";
import { popUpAppointmentsPropType } from "../../propTypes";

class DesktopDoctorProfile extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    orgid: PropTypes.string.isRequired,
    doctor: doctorPropType.isRequired,
    fetchDoctorProfile: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired,
    setMainComponent: PropTypes.func.isRequired,
    setSideComponent: PropTypes.func.isRequired,
    setIsDoctorProfile: PropTypes.func.isRequired,
    getAppointments: PropTypes.func.isRequired,
    showProfileExtras: PropTypes.bool.isRequired,
    appointments: popUpAppointmentsPropType.isRequired,
    isFetchingAppointments: PropTypes.bool.isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
    token: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.setPopUp = this.setPopUp.bind(this);
    this.fetchAppointments = this.fetchAppointments.bind(this);
  }
  state = {
    selectedDay: this.props.selectedDay,
  }
  componentWillMount() {
    this.props.fetchDoctorProfile(this.props.id);
    this.props.getAppointments(this.state.selectedDay, this.props.orgid, this.props.id);
  }
  setPopUp() {
    this.props.setIsDoctorProfile(false);
    this.props.setMainComponent(this.props.token ? <DesktopSelectionPage /> : <LoginTriage />);
    this.props.setSideComponent(AppointmentInfoContainer);
  }
  fetchAppointments(direction) {
    if (direction === "forward") {
      this.setState({ selectedDay: this.state.selectedDay.add(1, "days") });
    }
    if (direction === "back") {
      this.setState({ selectedDay: this.state.selectedDay.subtract(1, "days") });
    }
    this.props.getAppointments(this.state.selectedDay, this.props.orgid, this.props.id);
  }
  render() {
    return (
      <div className={styles.container}>
        <ProfileIntro
          url={this.props.doctor.Picture}
          name={this.props.doctor.Name}
          title={this.props.doctor.Title}
        />
        <ProfileExtras
          blurb={this.props.doctor.Description}
          doctor={this.props.doctor}
          showProfileExtras={this.props.showProfileExtras}
        />
        <ProfileAppointments
          selectedDay={this.state.selectedDay}
          appointments={this.props.appointments}
          doctorId={this.props.doctor.Id}
          setTime={this.props.setTime}
          setPopUp={this.setPopUp}
          fetchAppointments={this.fetchAppointments}
          isFetching={this.props.isFetchingAppointments}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  isFetching: state.doctorProfileReducer.isFetching,
  doctor: state.doctorProfileReducer.doctor,
  clinic: state.practiceProfileReducer.profile,
  appointments: state.practiceProfilePopUpReducer.doctorProfileAppointments,
  isFetchingAppointments: state.practiceProfilePopUpReducer.isFetching,
});
const mapDispatchToProps = (dispatch) => ({
  setTime: bindActionCreators(appointmentActions.selectTime, dispatch),
  fetchDoctorProfile: bindActionCreators(doctorActions.fetchDoctorProfile, dispatch),
  setMainComponent: bindActionCreators(popUpActions.setMainComponent, dispatch),
  setSideComponent: bindActionCreators(popUpActions.setSideComponent, dispatch),
  getAppointments: bindActionCreators(popUpActions.getDoctorProfileAppointments, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopDoctorProfile);
