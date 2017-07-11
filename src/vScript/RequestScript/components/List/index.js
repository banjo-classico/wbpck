import React, { Component } from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

import Arrow from "../../../../svgs/rightarrow2.svg";
import styles from "./list.css";

const List = ({
  heading,
  options,
  arrowFn,
  optionOnClick,
  dontShowArrow,
  lastOption,
  lastOptionFn,
}) => (
  <div className={styles.container}>
    {dontShowArrow && <Arrow className={styles.invisibleArrow} />}
    {!dontShowArrow && <Arrow className={styles.backArrow} onClick={arrowFn} />}
    <div className={styles.heading}>{heading}</div>
    <div className={styles.optionsContainer}>
      {
        map(o =>
          <a
            className={styles.button}
            key={o.Id}
            onClick={() => optionOnClick(o)}
          >
            {o.FirstName ? `${o.FirstName} ${o.LastName}` : o.Name}
          </a>
        )(options)
      }

      <a
        className={styles.button}
        onClick={lastOptionFn}
      >
        {lastOption}
      </a>
    </div>
  </div>
);

List.propTypes = {
  heading: PropTypes.string.isRequired,
  options: PropTypes.array,
  arrowFn: PropTypes.func,
  optionOnClick: PropTypes.func.isRequired,
  dontShowArrow: PropTypes.bool,
  lastOption: PropTypes.string,
  lastOptionFn: PropTypes.func,
};

export default List;
