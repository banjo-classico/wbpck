import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

import AppointmentCard from "../AppointmentCard";
import LoadingSpinner from "../../../../components/loadingSpinner";
import styles from "./pastAppointments.css";
import { appointmentPropType } from "../../propTypes";
import { getHeight } from "../../helpers";

const PastAppointments = ({
    isFetching,
    appointments,
    toggleStyles,
    toggleOpenCardState,
    changeCtaFn,
    changeCtaIcon,
    toggleCta,
    nonClickable,
    goToAddDependant,
    preLoadDependant,
    userName,
  }) => (
    <div
      style={{ minHeight: getHeight(appointments, isFetching, 110, 100) }}
    >
      <LoadingSpinner
        isFetching={isFetching}
        containerClassName={styles.appointmentContainer}
        iconClassName={styles.spinner}
      >
        {appointments.length ? <div className={styles.label}>Past Appointments</div> : null}
        <div className={styles.innerContainer}>
          {
        map(a =>
          <AppointmentCard
            key={a.Id}
            toggleStyles={toggleStyles}
            toggleOpenCardState={toggleOpenCardState}
            appointment={a}
            changeCtaFn={changeCtaFn}
            changeCtaIcon={changeCtaIcon}
            toggleCta={toggleCta}
            past
            goToAddDependant={goToAddDependant}
            preLoadDependant={preLoadDependant}
            nonClickable={nonClickable}
            userName={userName}
          />)(appointments)
      }
        </div>
      </LoadingSpinner>
    </div>
);

PastAppointments.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  nonClickable: PropTypes.bool.isRequired,
  toggleCta: PropTypes.func.isRequired,
  changeCtaFn: PropTypes.func.isRequired,
  changeCtaIcon: PropTypes.func.isRequired,
  toggleOpenCardState: PropTypes.func.isRequired,
  toggleStyles: PropTypes.func.isRequired,
  goToAddDependant: PropTypes.func.isRequired,
  preLoadDependant: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(appointmentPropType).isRequired,
};

export default PastAppointments;
