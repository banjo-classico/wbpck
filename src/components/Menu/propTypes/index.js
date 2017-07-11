import { PropTypes } from "react";

const userPropType = PropTypes.shape({
  Id: PropTypes.string,
  FirstName: PropTypes.string,
  LastName: PropTypes.string,
  Mobile: PropTypes.string,
  DateOfBirth: PropTypes.string,
  Email: PropTypes.string,
  MobileVerified: PropTypes.bool,
  HasPractice: PropTypes.bool,
  PatientProfiles: PropTypes.arrayOf(PropTypes.object),
  AvatarUrl: PropTypes.string,
});

export {
  userPropType,
};
