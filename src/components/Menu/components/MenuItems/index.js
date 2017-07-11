import React from "react";
import PropTypes from "prop-types";

import logoutIcon from "../../../../images/logout.png";
import supportIcon from "../../../../images/support.png";
import practicesIcon from "../../../../images/practices.png";
import dependantsIcon from "../../../../images/dependants.png";

import styles from "./menuItems.css";

const onClick = (hideFn) => (itemFn) => () => {
  hideFn();
  itemFn();
};

const createMenuButton = (icon, item, onClickFn) => (
  <a key={item} className={styles.button} onClick={onClickFn}>
    <div className={styles.iconContainer}>
      {icon}
    </div>
    <span className={styles.buttonText}>{item}</span>
  </a>
);

const createLoggedInButtons = (dependantsFn, practicesFn, supportFn, logoutFn) => [
  createMenuButton(
    <img
      src={dependantsIcon}
      className={styles.dependantsIcon}
      alt="icon"
    />,
    "Dependants",
    dependantsFn
  ),
  createMenuButton(
    <img
      src={practicesIcon}
      className={styles.practicesIcon}
      alt="icon"
    />,
    "Practices",
    practicesFn,
  ),
  createMenuButton(
    <img
      src={supportIcon}
      className={styles.supportIcon}
      alt="icon"
    />,
    "Help",
    supportFn
  ),
  createMenuButton(
    <img
      src={logoutIcon}
      className={styles.logoutIcon}
      alt="icon"
    />,
    "Logout",
    logoutFn
  ),
];

const MenuItems = ({
  logout,
  goToDependants,
  goToPractices,
  goToSupport,
  toggleMenu,
}) => {
  const runAndHide = onClick(toggleMenu);
  return (
    <div className={styles.container}>
      {
        createLoggedInButtons(
          runAndHide(goToDependants),
          runAndHide(goToPractices),
          runAndHide(goToSupport),
          runAndHide(logout),
        )
      }
    </div>
  );
};
MenuItems.propTypes = {
  logout: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  goToSupport: PropTypes.func.isRequired,
  goToPractices: PropTypes.func.isRequired,
  goToDependants: PropTypes.func.isRequired,
};


export default MenuItems;
