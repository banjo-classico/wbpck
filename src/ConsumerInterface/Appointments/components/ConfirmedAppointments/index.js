import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

import AppointmentCard from "../AppointmentCard";
import NoAppointmentCard from "../NoAppointmentCard";
import LoadingSpinner from "../../../../components/loadingSpinner";
import styles from "./confirmedAppointments.css";
import { appointmentPropType } from "../../propTypes";
import { getHeight } from "../../helpers";

const ConfirmedAppointments = ({
    isFetching,
    appointments,
    cancelAppointment,
    checkAbleToCancel,
    toggleStyles,
    toggleOpenCardState,
    changeCtaFn,
    changeCtaIcon,
    toggleCta,
    toggleDeleter,
    openDeleter,
    nonClickable,
    noAppointmentClick,
    goToAddDependant,
    preLoadDependant,
    userName,
  }) => (
    <div
      style={{ minHeight: getHeight(appointments, isFetching, 195, 185) }}
    >
      <LoadingSpinner
        isFetching={isFetching}
        containerClassName={styles.appointmentContainer}
        iconClassName={styles.spinner}
      >
        {appointments.length ?
      map(a =>
        <AppointmentCard
          key={a.Id}
          toggleStyles={toggleStyles}
          toggleOpenCardState={toggleOpenCardState}
          appointment={a}
          changeCtaFn={changeCtaFn}
          changeCtaIcon={changeCtaIcon}
          toggleCta={toggleCta}
          cancelAppointment={cancelAppointment}
          checkAbleToCancel={checkAbleToCancel}
          toggleDeleter={toggleDeleter}
          openDeleter={openDeleter}
          nonClickable={nonClickable}
          goToAddDependant={goToAddDependant}
          preLoadDependant={preLoadDependant}
          userName={userName}
        />)(appointments) :
      <NoAppointmentCard onClick={noAppointmentClick} />
    }
      </LoadingSpinner>
    </div>
);

ConfirmedAppointments.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  nonClickable: PropTypes.bool.isRequired,
  openDeleter: PropTypes.bool.isRequired,
  toggleDeleter: PropTypes.func.isRequired,
  toggleCta: PropTypes.func.isRequired,
  changeCtaFn: PropTypes.func.isRequired,
  changeCtaIcon: PropTypes.func.isRequired,
  toggleOpenCardState: PropTypes.func.isRequired,
  toggleStyles: PropTypes.func.isRequired,
  cancelAppointment: PropTypes.func.isRequired,
  checkAbleToCancel: PropTypes.func.isRequired,
  goToAddDependant: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(appointmentPropType).isRequired,
  noAppointmentClick: PropTypes.func.isRequired,
  preLoadDependant: PropTypes.func.isRequired,
};

export default ConfirmedAppointments;
