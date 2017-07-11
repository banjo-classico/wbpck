import React from "react";
import PropTypes from "prop-types";
import styles from "./listingMenu.css";
import { isDesktop } from "../../../../config";

const ListingMenu = ({ unlinkPractice, toggleMenuActive, goToSupport }) => (
  <div className={styles.outer}>
    {isDesktop() ?
      <div
        onClick={toggleMenuActive}
        className={styles.dark}
      /> : null
    }
    <div className={styles.container} onClick={toggleMenuActive}>
      <div onClick={unlinkPractice}>Remove this practice</div>
      <div onClick={goToSupport}>Report a website issue</div>
    </div>
  </div>
);
ListingMenu.propTypes = {
  unlinkPractice: PropTypes.func.isRequired,
  toggleMenuActive: PropTypes.func.isRequired,
  goToSupport: PropTypes.func.isRequired,
};
export default ListingMenu;
