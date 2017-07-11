import { PropTypes } from "react";

const detailsPropType = PropTypes.shape({
  FirstName: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired,
  Mobile: PropTypes.string.isRequired,
  DateOfBirth: PropTypes.string.isRequired,
});

export {
  detailsPropType,
};
