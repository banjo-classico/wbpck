import React from "react";
import PropTypes from "prop-types";

import { isDesktop } from "../../../../config";
import styles from "./doctorImage.css";

const DoctorImage = ({ onClick, onBookNow, name, src, type, id }) => {
  const names = name.split(" ");
  const firstName = `${names[0]} ${names[1]}`;
  const lastName = names[2] && names[2];
  return (
    <div className={styles.container}>
      <div
        className={styles.item}
        onClick={() => onClick(id)}
      >

        <img className={styles.img} src={src} alt="doctor" />
        <div className={styles.details}>
          <div className={styles.name}>{isDesktop() ? name : firstName}</div>
          {!isDesktop() ? <div className={styles.name}>{lastName}</div> : null}
          <div className={styles.type}>{type}</div>
        </div>
      </div>
      <button onClick={onBookNow} className={styles.button}>Book now</button>
    </div>
  );
};

DoctorImage.propTypes = {
  onClick: PropTypes.func,
  onBookNow: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DoctorImage;
