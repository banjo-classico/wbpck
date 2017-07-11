import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";
import classnames from "classnames";

import PrescriptionCard from "../PrescriptionCard";
// import NoPrescriptionCard from "../NoPrescriptionCard";
import LoadingSpinner from "../../../../components/loadingSpinner";
import styles from "./requestList.css";
import { scriptPropType, detailsPropType } from "../../propTypes";
// import { getHeight } from "../../../../";

const RequestList = ({
  fetchScriptDetails,
  isFetching,
  requests,
  scriptDetails,
  changeCtaFn,
  toggleCta,
  setCtaText,
  goToBooking,
  toggleStyles,
  toggleMenu,
  toggleOpenCardState,
  isPast = false,
}) => (
  <div className={classnames({ [styles.bottomMargin]: isPast })}>
    <LoadingSpinner
      isFetching={isFetching}
      containerClassName={styles.scriptContainer}
      iconClassName={styles.spinner}
    >
      {(
        () => {
          if (isFetching) return <div />;
          return (
            requests.length < 1 && !isPast ?
              <div className={styles.container}>
                <div className={styles.bold}>Repeated Script is now available!</div>
                <div className={styles.textContainer}>
                  You can now request a repeated script online without calling your practice.
                </div>
                <button
                  className={styles.tryButton}
                  onClick={() => { toggleMenu(); }}
                >
                  Try it out.
                </button>
              </div> :
              map(s =>
                <PrescriptionCard
                  key={s.Id}
                  past={isPast}
                  fetchScriptDetails={fetchScriptDetails}
                  script={s}
                  scriptDetails={scriptDetails}
                  toggleCta={s.Status !== "Denied" ? toggleCta : () => {}}
                  setCtaText={setCtaText}
                  changeCtaFn={changeCtaFn}
                  goToBooking={goToBooking}
                  toggleStyles={toggleStyles}
                  toggleOpenCardState={toggleOpenCardState}
                />)(requests)
          );
        }
      )()}
    </LoadingSpinner>
  </div>
);

RequestList.propTypes = {
  isFetching: PropTypes.bool,
  isPast: PropTypes.bool,
  fetchScriptDetails: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  toggleCta: PropTypes.func.isRequired,
  setCtaText: PropTypes.func.isRequired,
  changeCtaFn: PropTypes.func.isRequired,
  goToBooking: PropTypes.func.isRequired,
  toggleStyles: PropTypes.func.isRequired,
  toggleOpenCardState: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(scriptPropType),
  scriptDetails: detailsPropType,
};

export default RequestList;
