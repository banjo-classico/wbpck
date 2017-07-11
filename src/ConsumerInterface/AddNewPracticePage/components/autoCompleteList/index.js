import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

import AutoCompleteItem from "../autoCompleteItem";
import styles from "./autoCompleteList.css";
import { clinicPropType } from "../../../PracticeListings/propTypes";

const AutoCompleteList = ({
  practices,
  allPractices,
  isSearching,
  value,
  successAction,
  listItemStyle,
  errorAction,
  condition,
}) => (
  <div className={styles.list}>
    {
      (() => {
        if (isSearching) {
          return <div className={styles.empty}>Loading...</div>;
        }
        if (practices.length) {
          return map(e =>
            <AutoCompleteItem
              practice={e}
              onClick={() => (e[condition] ? successAction(e) : errorAction(e))}
              key={e.PracticeId}
              style={listItemStyle}
            />, practices
          );
        }
        if (!value) {
          return map(e =>
            <AutoCompleteItem
              practice={e}
              onClick={() => (e[condition] ? successAction(e) : errorAction(e))}
              key={e.PracticeId}
              style={listItemStyle}
            />, allPractices
          );
        }
        return <div className={styles.empty}> No practices with this name.</div>;
      })()
    }
  </div>
);
AutoCompleteList.propTypes = {
  successAction: PropTypes.func.isRequired,
  errorAction: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  practices: PropTypes.arrayOf(clinicPropType).isRequired,
  allPractices: PropTypes.arrayOf(clinicPropType).isRequired,
  isSearching: PropTypes.bool.isRequired,
  listItemStyle: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
};
export default AutoCompleteList;
