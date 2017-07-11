import React from "react";
import PropTypes from "prop-types";
import { head } from "lodash/fp";

import styles from "./practiceHeader.css";
import LoadingSpinner from "../../../../components/loadingSpinner";
import PracticeTitle from "../PracticeTitle";
import { practicePropType } from "../../propTypes";

const PracticeHeader = ({ practice, isFetching, showTitle = true, hideImg = false }) => (
  <LoadingSpinner
    containerClassName={styles.container}
    iconClassName={styles.spinner}
    isFetching={isFetching}
  >
    {!hideImg ?
      <div
        className={styles.img}
        style={{
          backgroundImage: `url(${head(practice.Pictures)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >&nbsp;</div> : null
    }
    {showTitle ? <PracticeTitle practice={practice} /> : null}
  </LoadingSpinner>
);

PracticeHeader.propTypes = {
  practice: practicePropType.isRequired,
  isFetching: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool,
  hideImg: PropTypes.bool,
};

export default PracticeHeader;
