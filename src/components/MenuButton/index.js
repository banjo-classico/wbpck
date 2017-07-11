import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as appActions } from "../../App/actions/actions";
import { actions as menuActions } from "../../components/Menu/actions/actions";
// eslint-disable-next-line max-len
import { actions as appointmentActions } from "../../ConsumerInterface/Appointments/actions/actions";
import MenuIcon from "../../svgs/menu.svg";
import Arrow from "../../svgs/rightarrow2.svg";
import styles from "./menuButton.css";

class MenuButton extends Component {
  static propTypes = {
    toggleCta: PropTypes.func.isRequired,
    toggleShrinkApp: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    isShowing: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  handleMenuClick() {
    if (this.props.isShowing) {
      setTimeout(this.props.toggleMenu, 400);
    } else {
      this.props.toggleMenu();
    }
    this.props.toggleShrinkApp();
    setTimeout(this.props.toggleCta, 400);
  }
  render() {
    return (
      <button
        onClick={this.handleMenuClick}
        className={styles.button}
      >
        {this.props.isShowing ?
          <Arrow transform="scale(-1, 1)" className={styles.arrow} /> :
          <MenuIcon className={styles.menu} />
        }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  isShowing: state.appStylesReducer.shrink,
});
const mapDispatchToProps = (dispatch) => ({
  toggleShrinkApp: bindActionCreators(appActions.toggleShrinkApp, dispatch),
  toggleCta: bindActionCreators(appointmentActions.toggleCta, dispatch),
  showMenu: bindActionCreators(menuActions.showMenu, dispatch),
  hideMenu: bindActionCreators(menuActions.hideMenu, dispatch),
  toggleMenu: bindActionCreators(menuActions.toggleMenu, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
