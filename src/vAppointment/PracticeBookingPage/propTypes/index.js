import { PropTypes } from "react";

const SlotPropType = PropTypes.shape({
  Guid: PropTypes.string.isRequired,
  Time: PropTypes.string.isRequired,
});

const DoctorProfilePropType = PropTypes.shape({
  Name: PropTypes.string.isRequired,
  Type: PropTypes.string,
  Description: PropTypes.string,
  ProfilePictureURL: PropTypes.string.isRequired,
  AvailableSlots: PropTypes.arrayOf(SlotPropType),
  NextAvailableSlot: PropTypes.string.isRequired,
});

const SelectedTimePropType = PropTypes.shape({
  time: PropTypes.string,
  doctorId: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
});

const PracticeInfoPropType = PropTypes.shape({
  Name: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  Phone: PropTypes.string,
});

const AppointmentPropType = PropTypes.shape({
  PracticeName: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  ProviderName: PropTypes.string.isRequired,
  ProviderPictureUrl: PropTypes.string.isRequired,
  Time: PropTypes.string.isRequired,
  CalendarUrl: PropTypes.string.isRequired,
  Id: PropTypes.string.isRequired,
  SessionId: PropTypes.string.isRequired,
  Phone: PropTypes.string,
});

export {
  AppointmentPropType,
  SlotPropType,
  DoctorProfilePropType,
  SelectedTimePropType,
  PracticeInfoPropType,
};
