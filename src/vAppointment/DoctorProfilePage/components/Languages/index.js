import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";
import classnames from "classnames";

import styles from "./languages.css";
import SectionTitle from "../../../PracticeProfilePage/components/SectionTitle";

const Languages = ({ languages, title, className }) => (
  <div className={classnames(styles.container, className)}>
    <SectionTitle title={title} />
    <div className={styles.languagesContainer}>
      {
      map(l => <span className={styles.language} key={l}>{l}</span>, languages)
    }
    </div>
  </div>
);

Languages.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Languages;
