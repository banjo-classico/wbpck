import { PropTypes } from "react";

const appointmentPropType = PropTypes.shape({
  PracticeName: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  ProviderName: PropTypes.string.isRequired,
  ProviderTitle: PropTypes.string.isRequired,
  ProviderPictureUrl: PropTypes.string.isRequired,
  Time: PropTypes.string.isRequired,
  CalendarUrl: PropTypes.string.isRequired,
  GoogleCalendarUrl: PropTypes.string.isRequired,
  Id: PropTypes.string.isRequired,
  SessionId: PropTypes.string.isRequired,
  FirstName: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired,
  Note: PropTypes.string.isRequired,
  Status: PropTypes.string.isRequired,
});

export {
  appointmentPropType,
};
