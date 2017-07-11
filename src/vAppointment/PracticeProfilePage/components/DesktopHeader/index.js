import React from "react";
import PropTypes from "prop-types";
import { head } from "lodash/fp";

import Logo from "../../../../components/header/components/Logo";
import HeaderImage from "../HeaderImage";
import renderOnResolutionChange from "../../../../components/RenderOnResolutionChange";
import { practicePropType } from "../../propTypes";
import styles from "./desktopHeader.css";

const DesktopHeader = ({ practice, logInAction, isLoggedIn }) => (
  <div className={styles.container}>
    <div className={styles.blueBanner}><Logo />
      <div className={styles.logIn} onClick={() => logInAction()}>
        {isLoggedIn ? "Log out" : "Log in"}
      </div>
    </div>
    <HeaderImage url={head(practice.Pictures)} />
  </div>
);
DesktopHeader.propTypes = {
  practice: practicePropType.isRequired,
  logInAction: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};
export default renderOnResolutionChange(DesktopHeader);
