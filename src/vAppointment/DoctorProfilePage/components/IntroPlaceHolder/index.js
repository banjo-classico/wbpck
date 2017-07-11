import React from "react";
import PropTypes from "prop-types";

import styles from "./introPlaceHolder.css";
import LoadingSpinner from "../../../../components/loadingSpinner";

const IntroPlaceHolder = ({ isFetching }) => (
  <LoadingSpinner
    containerClassName={styles.container}
    iconClassName={styles.spinner}
    isFetching={isFetching}
  >
    <div className={styles.background} />
    <div className={styles.nameContainer}>
      <div className={styles.imgPlaceHolder} />
    </div>
    <div className={styles.blurbPlaceHolder} />
  </LoadingSpinner>
);
IntroPlaceHolder.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default IntroPlaceHolder;
