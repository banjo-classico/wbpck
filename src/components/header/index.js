import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { goBack, push } from "react-router-redux";
import classnames from "classnames";

import styles from "./header.css";
import Arrow from "../../svgs/rightarrow2.svg";
import Messages from "./components/Messages";
import MenuButton from "../MenuButton";
import Menu from "../Menu";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";

const Header = ({
  goBackProp,
  goToSupport,
  goToMessages,
  firstLine,
  headerClassNames,
  arrowClassNames,
  menuIconClassNames,
  helpClassNames,
  messagesClassNames,
  secondLine,
  showMenu,
  showArrow,
  showHelp,
  showMessages,
  backArrowFn,
  customIcon,
  token,
}) => (
  <div className={classnames(styles.headerContainer, headerClassNames)}>
    {isDesktop() && token ? <Menu /> : null}
    <div className={styles.header}>
      {showArrow ?
        <Arrow
          className={classnames(styles.backArrow, arrowClassNames)}
          onClick={backArrowFn || goBackProp}
        /> : null}
      {showMenu ? <MenuButton iconClassName={menuIconClassNames} /> : null}
      <div className={styles.container}>
        {firstLine}
      </div>
      {showMessages ?
        <Messages
          className={messagesClassNames}
          onClick={goToMessages}
        /> : null
      }
      {
        customIcon && customIcon
      }
      {
        showHelp ?
          <a className={classnames(styles.help, helpClassNames)} onClick={goToSupport}>
          HELP
          </a> : null
      }
    </div>
    {secondLine ? <div className={styles.secondLine}>{secondLine}</div> : null}
  </div>
);
Header.propTypes = {
  goBackProp: PropTypes.func.isRequired,
  goToSupport: PropTypes.func.isRequired,
  goToMessages: PropTypes.func.isRequired,
  backArrowFn: PropTypes.func,
  customIcon: PropTypes.node,
  firstLine: PropTypes.node,
  secondLine: PropTypes.node,
  showMenu: PropTypes.bool,
  showArrow: PropTypes.bool,
  showHelp: PropTypes.bool,
  showMessages: PropTypes.bool,
  token: PropTypes.string,
  headerClassNames: PropTypes.arrayOf(PropTypes.string),
  arrowClassNames: PropTypes.arrayOf(PropTypes.string),
  menuIconClassNames: PropTypes.arrayOf(PropTypes.string),
  helpClassNames: PropTypes.arrayOf(PropTypes.string),
  messagesClassNames: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  firstLine: state.headerReducer.heading,
  headerClassNames: state.headerReducer.headerClassNames,
  arrowClassNames: state.headerReducer.arrowClassNames,
  helpClassNames: state.headerReducer.helpClassNames,
  messagesClassNames: state.headerReducer.messagesClassNames,
  menuIconClassNames: state.headerReducer.menuIconClassNames,
  secondLine: state.headerReducer.secondLine,
  showMenu: state.headerReducer.showMenu,
  showArrow: state.headerReducer.showArrow,
  showHelp: state.headerReducer.showHelp,
  showMessages: state.headerReducer.showMessages,
  backArrowFn: state.headerReducer.backArrowFn,
  customIcon: state.headerReducer.customIcon,
});
const mapDispatchToProps = (dispatch) => ({
  goBackProp: bindActionCreators(goBack, dispatch),
  goToSupport: () => bindActionCreators(push, dispatch)(routeConfig.support.getBrowserPath()),
  goToMessages: () => bindActionCreators(push, dispatch)(routeConfig.messages.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
export {
  styles,
};
