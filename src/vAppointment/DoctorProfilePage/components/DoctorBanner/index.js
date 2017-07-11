import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { actions as headerActions } from "../../../../components/header/actions/actions";
import styles from "./doctorBanner.css";
import { doctorPropType } from "../../propTypes";
import { routeConfig } from "../../../../routes";

const DoctorBanner = ({ doctor, bookNow, clinicId }) => (
  <div className={styles.container}>
    <img className={styles.img} src={doctor.Picture} alt="Doctor" />
    <div className={styles.innerContainer}>
      <div className={styles.name}>{doctor.Name}</div>
      <div className={styles.title}>{doctor.Title}</div>
      <button className={styles.button} onClick={() => bookNow(clinicId)}>Book Now</button>
    </div>
  </div>
);

DoctorBanner.propTypes = {
  doctor: doctorPropType,
  clinicId: PropTypes.string,
  bookNow: PropTypes.func,
};

const mapStateToProps = (state) => ({
  doctor: state.doctorProfileReducer.doctor,
  clinicId: state.practiceProfileReducer.profile.Id,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  bookNow: id => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorBanner);
