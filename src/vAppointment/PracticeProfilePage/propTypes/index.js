import { PropTypes } from "react";

const hourLinePropType = PropTypes.shape({
  o: PropTypes.string,
  c: PropTypes.string,
  dow: PropTypes.string,
  order: PropTypes.string,
});

const hoursPropType = PropTypes.shape({
  1: hourLinePropType.isRequired,
  2: hourLinePropType.isRequired,
  3: hourLinePropType.isRequired,
  4: hourLinePropType.isRequired,
  5: hourLinePropType.isRequired,
  6: hourLinePropType.isRequired,
  7: hourLinePropType.isRequired,
});

const doctorPropType = PropTypes.shape({
  Name: PropTypes.string.isRequired,
  Picture: PropTypes.string.isRequired,
  PmsUserId: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired,
});

const practicePropType = PropTypes.shape({
  Name: PropTypes.string,
  Address: PropTypes.string,
  Phone: PropTypes.string,
  Email: PropTypes.string,
  Id: PropTypes.string,
  OpeningHours: hoursPropType,
  Description: PropTypes.string,
  Pictures: PropTypes.arrayOf(PropTypes.string),
  Language: PropTypes.arrayOf(PropTypes.string),
  Specialities: PropTypes.arrayOf(PropTypes.string),
  Doctors: PropTypes.arrayOf(doctorPropType),
});

const slotPropType = PropTypes.shape({
  Guid: PropTypes.string.isRequired,
  Time: PropTypes.string.isRequired,
});

const appointmentsPropType = PropTypes.shape({
  day: PropTypes.string.isRequired,
  morning: PropTypes.arrayOf(slotPropType),
  afternoon: PropTypes.arrayOf(slotPropType),
  evening: PropTypes.arrayOf(slotPropType),
});
const doctorProfilePropType = PropTypes.shape({
  PmsUserId: PropTypes.string,
  Name: PropTypes.string,
  Type: PropTypes.string,
  Description: PropTypes.string,
  ProfilePictureURL: PropTypes.string,
  AvailableSlots: PropTypes.arrayOf(appointmentsPropType),
});

const popUpAppointmentsPropType = PropTypes.shape({
  morningAppointments: PropTypes.arrayOf(slotPropType),
  afternoonAppointments: PropTypes.arrayOf(slotPropType),
  eveningAppointments: PropTypes.arrayOf(slotPropType),
});

export {
  hoursPropType,
  practicePropType,
  doctorPropType,
  doctorProfilePropType,
  slotPropType,
  appointmentsPropType,
  popUpAppointmentsPropType,
};
