import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./autoCompleteItem.css";
import { clinicPropType } from "../../../PracticeListings/propTypes";

const AutoCompleteItem = ({ practice, onClick, style }) => (
  <a
    key={practice.PracticeId}
    onClick={() => onClick()}
    className={classnames(styles.item, style)}
  >{practice.Name}</a>
);
AutoCompleteItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  practice: clinicPropType.isRequired,
  style: PropTypes.string.isRequired,
};

export default AutoCompleteItem;
