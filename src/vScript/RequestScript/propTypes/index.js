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

const scriptPropType = PropTypes.shape({
  Id: PropTypes.string,
  Status: PropTypes.string,
  FirstName: PropTypes.string,
  LastName: PropTypes.string,
  OrganisationName: PropTypes.string,
  OrganisationId: PropTypes.string,
  DateTime: PropTypes.string,
  FreeFormMedications: PropTypes.arrayOf(PropTypes.string),
  IsRed: PropTypes.bool,
});

const detailsPropType = PropTypes.shape({
  Id: PropTypes.string,
  Message: PropTypes.string,
  PmsUserName: PropTypes.string,
  PmsUserId: PropTypes.string,
  PmsUserTitle: PropTypes.string,
  PmsUserProfilePictureUrl: PropTypes.string,
  Pricing: PropTypes.shape({
    Name: PropTypes.string,
    Price: PropTypes.number,
    Note: PropTypes.string,
    Option: PropTypes.number,
    Fax: PropTypes.string,
    Phone: PropTypes.string,
    Adress: PropTypes.string,
  }),
});

export {
  dependantPropType,
  scriptPropType,
  detailsPropType,
};
