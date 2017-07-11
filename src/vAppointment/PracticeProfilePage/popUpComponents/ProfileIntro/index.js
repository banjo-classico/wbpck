import React from "react";
import PropTypes from "prop-types";

import styles from "./profileIntro.css";

const ProfileIntro = ({ url, name, title }) => (
  <div className={styles.container}>
    <div className={styles.nameContainer}>
      <img src={url} className={styles.img} alt="doctor" />
      <span className={styles.name}>{name}</span>
      <span className={styles.drType}>{title}</span>
    </div>
  </div>
);

ProfileIntro.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProfileIntro;
