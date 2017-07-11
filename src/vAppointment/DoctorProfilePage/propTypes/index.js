import { PropTypes } from "react";

const doctorPropType = PropTypes.shape({
  Picture: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  Language: PropTypes.arrayOf(PropTypes.string).isRequired,
  MedicalInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
  Education: PropTypes.arrayOf(PropTypes.string).isRequired,
  PracticeAffiliations: PropTypes.arrayOf(PropTypes.string).isRequired,
  Id: PropTypes.string.isRequired,
});


export {
  doctorPropType,
};
