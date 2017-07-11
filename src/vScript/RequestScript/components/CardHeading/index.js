import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import ScriptIcon from "../../../../svgs/scripts.svg";
import { scriptPropType, detailsPropType } from "../../propTypes";
import styles from "./cardHeading.css";

const CardHeading = ({ script, isOpen }) => (
  <div className={styles.container}>
    {!isOpen && <ScriptIcon className={styles.scriptIcon} />}
    <div className={classnames(styles.mainDetails, { [styles.openMainDetails]: isOpen })}>
      <div className={classnames(styles.patient, { [styles.openPatient]: isOpen })}>
        {`${script.FirstName} ${script.LastName}`}
      </div>
      {isOpen && script.PmsUserName && <div className={styles.doctor}>{script.PmsUserName}</div>}
      <div className={classnames(styles.practice, { [styles.openPractice]: isOpen })}>
        {`at ${script.OrganisationName}`}
      </div>
    </div>
  </div>
);

CardHeading.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  script: scriptPropType,
  details: detailsPropType,
};

export default CardHeading;
