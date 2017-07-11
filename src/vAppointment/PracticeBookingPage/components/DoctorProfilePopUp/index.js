import React from "react";
import PropTypes from "prop-types";

import DoctorProfilePage from "../../../DoctorProfilePage";
import Close from "../../../../svgs/close.svg";
import styles from "./doctorProfilePopUp.css";

const DoctorProfilePopUp = ({ id, orgid, closeProfile }) => (
  <div className={styles.container}>
    <a
      className={styles.button}
      onClick={closeProfile}
    >
      <Close className={styles.icon} />
    </a>
    <DoctorProfilePage
      routeParams={{ id, orgid }}
      changeHeader={false}
      hideButton
      hideOurTeam
    />
  </div>
);

DoctorProfilePopUp.propTypes = {
  id: PropTypes.string.isRequired,
  closeProfile: PropTypes.func.isRequired,
  orgid: PropTypes.string.isRequired,
};

export default DoctorProfilePopUp;
