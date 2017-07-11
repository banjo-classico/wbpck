import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import CameraIcon from "../../svgs/camera.svg";
import styles from "./altImage.css";

const AltImage = ({ className }) => (
  <div className={classnames(styles.container, className)}>
    <CameraIcon className={styles.camera} />
  </div>
);

AltImage.propTypes = {
  className: PropTypes.string,
};

export default AltImage;
