import { PropTypes } from "react";

const dependantPropType = PropTypes.shape({
  Id: PropTypes.string,
  CaregiverId: PropTypes.string,
  FirstName: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired,
  Mobile: PropTypes.string,
  DateOfBirth: PropTypes.string.isRequired,
  Email: PropTypes.string,
  Relationship: PropTypes.number,
  AvatarUrl: PropTypes.string,
});

export {
  dependantPropType,
};
