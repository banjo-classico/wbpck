import React from "react";
import PropTypes from "prop-types";

const DateLabel = ({ className, onClick }) => (
  <span className={className} onClick={onClick}>
    Date of Birth: <span style={{ fontSize: "12px" }}>(DD-MM-YYYY)</span>
  </span>
);
// {Modernizr.inputtypes.date ?
//   "Date of Birth" :
//   <span style={{ fontSize: "14px" }}>Date of Birth: (DD-MM-YYYY)</span>}

DateLabel.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default DateLabel;
