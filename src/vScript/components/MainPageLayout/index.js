import React from "react";
import PropTypes from "prop-types";

import styles from "./mainPageLayout.css";

const MainPageLayout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.innerCard}>
      {children}
    </div>
  </div>
);

MainPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainPageLayout;
