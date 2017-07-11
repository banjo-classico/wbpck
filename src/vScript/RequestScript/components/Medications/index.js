import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { map } from "lodash/fp";

import Tick from "../../../../svgs/bigTick.svg";
import styles from "./medications.css";

const getMedsString = (meds) => `${meds.map(m => ` ${m}`)}`;

const Medications = ({ meds, isOpen }) => (
  <div className={classnames(styles.container, { [styles.openContainer]: isOpen })}>
    {!isOpen && <div className={styles.medication}>{getMedsString(meds)}</div>}
    {isOpen &&
      map(
        m =>
          <div className={styles.openMedication} key={m}>
            <Tick className={styles.tick} />{m}
          </div>, meds)
    }
  </div>
);

Medications.propTypes = {
  meds: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool.isRequired,
};

export default Medications;
