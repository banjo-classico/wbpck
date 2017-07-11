import React from "react";
import PropTypes from "prop-types";

import AltImage from "../../../AltImage";
import mobileIcon from "../../../../images/miniMobileWhite.png";
import { userPropType } from "../../propTypes";
import styles from "./userInfo.css";

const formatMobile = (mobile = "") => mobile && mobile.replace(/(\d{3})(\d{3})(\d)/, "$1 $2 $3");

const UserInfo = ({ user, onClick }) => (
  <div className={styles.container}>
    <div className={styles.innerContainer} onClick={onClick}>
      {user.AvatarUrl ?
        <img
          src={user.AvatarUrl}
          className={styles.avatar}
          alt={`${user.FirstName} ${user.LastName}`}
        /> :
        <AltImage className={styles.altImg} />
      }
      <div className={styles.name}>
        {user.FirstName ? `${user.FirstName} ${user.LastName}` : ""}
      </div>
      <div className={styles.mobile}>
        <img src={mobileIcon} className={styles.mobileIcon} alt="icon" />
        <span>{formatMobile(user.Mobile)}</span>
      </div>
    </div>
  </div>
);

UserInfo.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: userPropType.isRequired,
};

export default UserInfo;
