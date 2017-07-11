import PropTypes from "prop-types";

const pricingOptionPropType = PropTypes.shape({
  Option: PropTypes.number,
  Name: PropTypes.string,
  Note: PropTypes.string,
  Price: PropTypes.number,
  Id: PropTypes.string,
});

export {
  pricingOptionPropType,
};
