import React from "react";
import PropTypes from "prop-types";

import CircleCheckbox from "../../../../components/CircleCheckbox";
import Tick from "../../../../svgs/tick.svg";
import styles from "./formTitle.css";

const FormTitle = ({ title, isValid }) => (
  <div className={styles.title}>
    {
      isValid ?
        <Tick className={styles.tick} /> :
        <CircleCheckbox selected className={styles.icon} />
    }
    {title}
  </div>
);

FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
};

export default FormTitle;
