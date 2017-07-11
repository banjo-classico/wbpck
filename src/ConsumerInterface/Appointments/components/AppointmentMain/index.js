import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classnames from "classnames";

import { appointmentPropType } from "../../propTypes";
import styles from "./appointmentMain.css";

const getBookedFor = (past, isClosed, appointment) => {
  if (isClosed) {
    return (
      <div className={classnames(styles.bookedFor, { [styles.bookedForPast]: past })}>
        <span>{past ? "for " : "Booked for "}</span>
        <span style={{ textTransform: past ? "capitalize" : "uppercase" }}>
          {`${appointment.FirstName} ${appointment.LastName}`}
        </span>
      </div>
    );
  }
  return <div />;
};
const AppointmentMain = ({ appointment, isClosed, past }) => {
  const docStyles = {
    fontWeight: isClosed ? "400" : "500",
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img
          className={classnames(styles.img, { [styles.imgPast]: past && isClosed })}
          src={appointment.ProviderPictureUrl}
          alt={appointment.ProviderName}
        />
        <div className={classnames(styles.details, { [styles.detailsPast]: past })}>
          {
            isClosed ?
              <div className={classnames({ [styles.timeContainer]: past })}>
                <span className={classnames(styles.time, { [styles.timePast]: past })}>
                  {moment(appointment.Time).format(past ? "DD/MM/YY" : "dddd, DD MMM h:mmA")}
                </span>
              </div> : null
          }
          <div className={classnames(styles.nameContainer, { [styles.extraWidth]: !isClosed })}>
            <span className={styles.docName} style={docStyles}>{appointment.ProviderName}</span>
          </div>
          {
            !isClosed ? <div className={styles.providerTitle}>{appointment.ProviderTitle}</div> :
            null
          }
          <span className={styles.practiceName}>at {appointment.PracticeName}</span>
          {past ? getBookedFor(past, isClosed, appointment) : null}
        </div>
      </div>
      {!past ? getBookedFor(past, isClosed, appointment) : null}
    </div>
  );
};

AppointmentMain.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  past: PropTypes.bool,
  appointment: appointmentPropType.isRequired,
};

export default AppointmentMain;
