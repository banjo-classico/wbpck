import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

import AppointmentCard from "../../../Appointments/components/AppointmentCard";
import { appointmentPropType } from "../../../Appointments/propTypes";
import styles from "./feedList.css";


const FeedList = ({
  feed,
  toggleStyles,
  toggleOpenCardState,
  changeCtaFn,
  changeCtaIcon,
  toggleCta,
  cancelAppointment,
  checkAbleToCancel,
  toggleDeleter,
  openDeleter,
  nonClickable,
  userName,
  goToAddDependant,
  preLoadDependant,
}) => (
  <div className={styles.container}>
    {
    map(f =>
      <AppointmentCard
        key={f.Id}
        toggleStyles={toggleStyles}
        toggleOpenCardState={toggleOpenCardState}
        appointment={f}
        cancelAppointment={cancelAppointment}
        checkAbleToCancel={checkAbleToCancel}
        changeCtaFn={changeCtaFn}
        changeCtaIcon={changeCtaIcon}
        toggleCta={toggleCta}
        toggleDeleter={toggleDeleter}
        openDeleter={openDeleter}
        nonClickable={nonClickable}
        userName={userName}
        goToAddDependant={goToAddDependant}
        preLoadDependant={preLoadDependant}
      />)(feed)
    }
  </div>
);

FeedList.propTypes = {
  feed: PropTypes.arrayOf(appointmentPropType).isRequired,
  toggleStyles: PropTypes.func.isRequired,
  toggleOpenCardState: PropTypes.func.isRequired,
  changeCtaFn: PropTypes.func.isRequired,
  changeCtaIcon: PropTypes.func.isRequired,
  toggleCta: PropTypes.func.isRequired,
  cancelAppointment: PropTypes.func.isRequired,
  checkAbleToCancel: PropTypes.func.isRequired,
  toggleDeleter: PropTypes.func.isRequired,
  openDeleter: PropTypes.bool.isRequired,
  nonClickable: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  goToAddDependant: PropTypes.func.isRequired,
  preLoadDependant: PropTypes.func.isRequired,
};

export default FeedList;
