import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import Clock from "../../svgs/clock.svg";
import VerticalLine from "../../svgs/verticalLine.svg";
import Calendar from "../../svgs/calendar.svg";

const AppointmentInfo = ({
  time,
  containerClassName,
  infoClassName,
  iconClassName,
  lineClassName,
  dateFormat,
}) => (
  <div className={containerClassName}>
    <div className={infoClassName}>
      <Calendar className={iconClassName} />
      <div>{moment(time).format(dateFormat)}</div>
    </div>
    <VerticalLine className={lineClassName} />
    <div className={infoClassName}>
      <Clock className={iconClassName} />
      <div>{moment(time).format("h:mm a")}</div>
    </div>
  </div>
);

AppointmentInfo.propTypes = {
  time: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  infoClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  lineClassName: PropTypes.string,
  dateFormat: PropTypes.string,
};
export default AppointmentInfo;
