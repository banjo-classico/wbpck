import React from "react";
import moment from "moment";

import AltImage from "../../../../components/AltImage";
import { dependantPropType } from "../../propTypes";
import styles from "./closedInfo.css";

const ClosedInfo = ({ dependant }) => (
  <div className={styles.container}>
    {
      dependant.AvatarUrl ?
        <img src={dependant.AvatarUrl} className={styles.img} alt={dependant.FirstName} /> :
        <AltImage className={styles.altImg} />
    }
    <div className={styles.detailsContainer}>
      <div className={styles.name}>{`${dependant.FirstName} ${dependant.LastName}`}</div>
      <div className={styles.birthday}>{moment(dependant.DateOfBirth).format("DD/MM/YYYY")}</div>
    </div>
  </div>
);

ClosedInfo.propTypes = {
  dependant: dependantPropType.isRequired,
};

export default ClosedInfo;
