import { PropTypes } from "react";

const sessionPropType = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  mobile: PropTypes.string,
  organisationId: PropTypes.string,
  pmsUserId: PropTypes.string,
  appointmentId: PropTypes.string,
  time: PropTypes.string,
  note: PropTypes.string,
  sessionId: PropTypes.string,
  initiatorFirstName: PropTypes.string,
  initiatorLastName: PropTypes.string,
  initiatorDateOfBirth: PropTypes.string,
  initiatorMobile: PropTypes.string,
  isBookingForSomeoneElse: PropTypes.bool,
});

export {
  sessionPropType,
};
