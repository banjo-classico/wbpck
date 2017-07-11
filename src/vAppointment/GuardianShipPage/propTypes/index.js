import { PropTypes } from "react";

const guardianPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
});


const patientPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  phone: PropTypes.string,
});

export {
  guardianPropType,
  patientPropType,
};
