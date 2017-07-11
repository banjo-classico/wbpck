import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import PatientSilhouette from "../../../../svgs/patientSilhouette.svg";
import styles from "./namedPatient.css";

const NamedPatient = ({ onClick, name, avatarLink }) => (
  <a className={classnames(styles.container)} onClick={onClick}>
    {
      !avatarLink || avatarLink === "" ?
        <PatientSilhouette className={styles.avatar} /> :
        <img alt="patient" className={styles.avatar} src={avatarLink} />
    }
    <div className={styles.name}>{name}</div>
  </a>
);

NamedPatient.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  avatarLink: PropTypes.string,
};

export default NamedPatient;
