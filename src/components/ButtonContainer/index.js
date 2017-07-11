import React from "react";
import PropTypes from "prop-types";

const ButtonContainer = ({
  onLeftButtonClick,
  leftButtonText,
  onRightButtonClick,
  rightButtonText,
  containerStyle,
  leftButtonStyle,
  rightButtonStyle,
}) => (
  <div className={containerStyle}>
    <button onClick={onLeftButtonClick} className={leftButtonStyle}>{leftButtonText}</button>
    <button onClick={onRightButtonClick} className={rightButtonStyle}>{rightButtonText}</button>
  </div>
);

ButtonContainer.propTypes = {
  onLeftButtonClick: PropTypes.func.isRequired,
  leftButtonText: PropTypes.string.isRequired,
  onRightButtonClick: PropTypes.func.isRequired,
  rightButtonText: PropTypes.string.isRequired,
  containerStyle: PropTypes.string.isRequired,
  leftButtonStyle: PropTypes.string.isRequired,
  rightButtonStyle: PropTypes.string.isRequired,
};

export default ButtonContainer;
