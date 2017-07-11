import React from "react";
import PropTypes from "prop-types";

import Cross from "../../../../svgs/close.svg";
import styles from "./FilterStrings.css";

const FilterStrings = ({ filterStr, clearFilter }) => (
  <div className={styles.container}>
    {filterStr ?
      <div className={styles.string}>
        {filterStr}
        <Cross className={styles.icon} onClick={clearFilter} />
      </div> :
      null
    }
  </div>
);

FilterStrings.propTypes = {
  clearFilter: PropTypes.func.isRequired,
  filterStr: PropTypes.string.isRequired,
};

export default FilterStrings;
