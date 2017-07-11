import React from "react";
import PropTypes from "prop-types";

import NamedPatient from "../NamedPatient";
import SomeoneElse from "../SomeoneElse";
import LoadingSpinner from "../../../../components/loadingSpinner";
import styles from "./patientSelection.css";

const PatientSelection =
  ({
     userProfile,
     dependantProfiles,
     userOnClick,
     dependantOnClick,
     someoneElseOnClick,
     dependantsFetching,
  }) => (
    <LoadingSpinner
      isFetching={dependantsFetching}
      containerClassName={styles.outerContainer}
      iconClassName={styles.spinner}
      overlayClassName={styles.overlay}
    >
      <div className={styles.container}>
        <NamedPatient
          name={`${userProfile.FirstName} ${userProfile.LastName}`}
          onClick={userOnClick}
          avatarLink={userProfile.AvatarUrl}
        />
        {
          dependantProfiles.length > 0 && dependantProfiles.map(
            dep =>
              <NamedPatient
                onClick={() => dependantOnClick(dep)}
                name={`${dep.FirstName} ${dep.LastName}`}
                avatarLink={dep.AvatarUrl}
                key={dep.Id}
              />
          )
        }
        <SomeoneElse
          onClick={someoneElseOnClick}
        />
      </div>
    </LoadingSpinner>
);

PatientSelection.propTypes = {
  userProfile: PropTypes.object.isRequired,
  dependantProfiles: PropTypes.arrayOf(PropTypes.object),
  userOnClick: PropTypes.func.isRequired,
  dependantOnClick: PropTypes.func.isRequired,
  someoneElseOnClick: PropTypes.func.isRequired,
  dependantsFetching: PropTypes.bool.isRequired,
};

export default PatientSelection;
