import PropTypes from "prop-types";

const profilePropType = PropTypes.shape({
  FirstName: PropTypes.string,
  LastName: PropTypes.string,
  Id: PropTypes.string,
  Mobile: PropTypes.string,
  DateOfBirth: PropTypes.string,
  Email: PropTypes.string,
  MobileVerified: PropTypes.bool,
  HasPractice: PropTypes.bool,
  PatientProfiles: PropTypes.array,
  AvatarUrl: PropTypes.string,
});

export {
  profilePropType,
};
