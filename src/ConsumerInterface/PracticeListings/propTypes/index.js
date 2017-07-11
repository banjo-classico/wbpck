import { PropTypes } from "react";

const clinicPropType = PropTypes.shape({
  Id: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  Phone: PropTypes.string,
  IsOnline: PropTypes.bool.isRequired,
  PictureUrl: PropTypes.string,
  PracticeId: PropTypes.string.isRequired,
  IsUsingVensa: PropTypes.bool.isRequired,
});

export {
  clinicPropType,
};
