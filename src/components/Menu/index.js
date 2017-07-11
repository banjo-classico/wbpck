import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";

// eslint-disable-next-line max-len
import { actions as appointmentActions } from "../../ConsumerInterface/Appointments/actions/actions";
import { actions as loginActions } from "../../ConsumerInterface/EntryPage/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import MenuItems from "./components/MenuItems";
import UserInfo from "./components/UserInfo";
import polygonsImg from "../../images/polygons.jpg";
import styles from "./menu.css";
import { userPropType } from "./propTypes";
import { routeConfig } from "../../routes";

class Menu extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    goToEditProfile: PropTypes.func.isRequired,
    toggleShrinkApp: PropTypes.func.isRequired,
    goToPractices: PropTypes.func.isRequired,
    goToDependants: PropTypes.func.isRequired,
    goToSupport: PropTypes.func.isRequired,
    toggleCta: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    user: userPropType.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }
  handleToggle() {
    this.props.toggleCta();
    this.props.toggleShrinkApp();
  }
  handleProfileClick() {
    this.props.goToEditProfile();
    this.props.toggleCta();
  }
  render() {
    return (
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${polygonsImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <UserInfo user={this.props.user} onClick={this.handleProfileClick} />
        <div className={styles.divider}>&nbsp;</div>
        <MenuItems
          logout={() => this.props.logout(this.props.token)}
          goToPractices={this.props.goToPractices}
          goToSupport={this.props.goToSupport}
          goToDependants={this.props.goToDependants}
          toggleMenu={this.handleToggle}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isShowing: state.menuReducer.isShowing,
  token: state.loginReducer.token,
  user: state.profileReducer.profile,
});
const mapDispatchToProps = (dispatch) => ({
  toggleCta: bindActionCreators(appointmentActions.toggleCta, dispatch),
  toggleShrinkApp: bindActionCreators(appActions.toggleShrinkApp, dispatch),
  logout: bindActionCreators(loginActions.logout, dispatch),
  // eslint-disable-next-line max-len
  goToPractices: () => bindActionCreators(push, dispatch)(routeConfig.practiceListings.getBrowserPath()),
  goToSupport: () => bindActionCreators(push, dispatch)(routeConfig.support.getBrowserPath()),
  goToDependants: () => bindActionCreators(push, dispatch)(routeConfig.dependants.getBrowserPath()),
  // eslint-disable-next-line max-len
  goToEditProfile: () => bindActionCreators(push, dispatch)(routeConfig.editProfile.getBrowserPath()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
