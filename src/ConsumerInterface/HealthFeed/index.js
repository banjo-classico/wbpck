import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import PlusIcon from "../../svgs/plus.svg";
import CtaMenuButton from "../../components/CtaMenuButton";
import EmptyFeedCard from "./components/EmptyFeedCard";
import { actions } from "../Appointments/actions/actions";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as cancelApptActions } from "../Deleter/actions/cancelAppointmentActions";
import { actions as deleterActions } from "../Deleter/actions/actions";
import { actions as preLoadDependantActions } from "../AddDependantPage/actions/actions";
import { actions as practiceListActions } from "../AddNewPracticePage/actions/actions";
import { appointmentPropType } from "../Appointments/propTypes";
import { routeConfig } from "../../routes";
import MenuContainer from "./components/MenuContainer";
import FeedList from "./components/FeedList";
import AccountVerificationCard from "./components/AccountVerificationCard";
import { clinicPropType } from "../PracticeListings/propTypes";
import styles from "./healthFeed.css";
import { isIOS } from "../../libs/BrowserDetection";
import { isDesktop } from "../../config";

class HealthFeed extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    removeStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    removeAppStyles: PropTypes.func.isRequired,
    goToAddPractice: PropTypes.func.isRequired,
    goToAccountVerification: PropTypes.func.isRequired,
    goToBooking: PropTypes.func.isRequired,
    goToAddDependant: PropTypes.func.isRequired,
    preLoadDependant: PropTypes.func.isRequired,
    cancelAppointment: PropTypes.func.isRequired,
    checkAbleToCancel: PropTypes.func.isRequired,
    toggleDeleter: PropTypes.func.isRequired,
    toggleCta: PropTypes.func.isRequired,
    changeCtaIcon: PropTypes.func.isRequired,
    changeCtaFn: PropTypes.func.isRequired,
    clearCta: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    ctaFn: PropTypes.func.isRequired,
    ctaIcon: PropTypes.node.isRequired,
    showCta: PropTypes.bool.isRequired,
    openDeleter: PropTypes.bool.isRequired,
    menuShowing: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFirstTime: PropTypes.bool.isRequired,
    isMobileVerified: PropTypes.bool.isRequired,
    isFetchingAppointments: PropTypes.bool.isRequired,
    feed: PropTypes.arrayOf(appointmentPropType).isRequired,
    practices: PropTypes.arrayOf(clinicPropType).isRequired,
    getAllPractices: PropTypes.func.isRequired,
    searchPractices: PropTypes.func.isRequired,
    allPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    matchedPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    isSearching: PropTypes.bool,
    goToPractice: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleStyles = this.toggleStyles.bind(this);
    this.toggleOpenCardState = this.toggleOpenCardState.bind(this);
    this.getCtaStyles = this.getCtaStyles.bind(this);
    this.changeCta = this.changeCta.bind(this);
    this.handleNoFeedClick = this.handleNoFeedClick.bind(this);
  }
  state = {
    showMenu: false,
    cardIsOpen: false,
  }
  componentDidMount() {
    this.props.clearCta();
    this.props.changeCtaFn(this.toggleMenu);
    this.props.getAllPractices();
  }
  getCtaStyles() {
    if (this.state.cardIsOpen) {
      return {
        iconStyles: styles.ctaIconCard,
        buttonStyles: styles.ctaButtonCard,
        text: "Add to my calendar",
      };
    }
    return {
      buttonStyles: styles.ctaButton,
      iconStyles: styles.buttonIcon,
    };
  }
  toggleStyles(shouldAddStyles) {
    if ((this.state.showMenu || shouldAddStyles) && !isDesktop()) {
      this.props.addStyles([styles.absolute]);
      if (this.state.showMenu) {
        this.props.addAppStyles([styles.app]);
      }
    } else {
      this.props.removeStyles([styles.absolute]);
      this.props.removeAppStyles([styles.app]);
    }
  }
  toggleOpenCardState() {
    this.setState({ cardIsOpen: !this.state.cardIsOpen }, this.changeCta);
  }
  changeCta() {
    if (!this.state.cardIsOpen) {
      this.props.changeCtaFn(this.toggleMenu);
      this.props.changeCtaIcon(PlusIcon);
    }
  }
  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu }, this.toggleStyles);
  }
  handleNoFeedClick() {
    if (this.cta) {
      this.cta.handleClick();
    }
  }
  render() {
    return (
      <div className={styles.outer}>
        <div
          className={classnames(
          styles.container,
          { [styles.z]: this.state.cardIsOpen },
          { [styles.ios]: isIOS() },
        )}
        >
          {
            this.props.isMobileVerified ?
              <AccountVerificationCard onClick={this.props.goToAccountVerification} /> :
              null
          }
          {
            !this.props.isMobileVerified &&
            !this.props.feed.length &&
            !this.props.isFetching &&
            !this.props.isFetchingAppointments ?
              <EmptyFeedCard
                name={this.props.userName.split(" ")[0]}
                isFirstTime={this.props.isFirstTime}
                toggleMenu={this.handleNoFeedClick}
              /> : null
          }
          <FeedList
            feed={this.props.feed}
            toggleStyles={this.toggleStyles}
            toggleOpenCardState={this.toggleOpenCardState}
            changeCtaFn={this.props.changeCtaFn}
            changeCtaIcon={this.props.changeCtaIcon}
            toggleCta={this.props.toggleCta}
            cancelAppointment={this.props.cancelAppointment}
            checkAbleToCancel={this.props.checkAbleToCancel}
            toggleDeleter={this.props.toggleDeleter}
            openDeleter={this.props.openDeleter}
            nonClickable={this.props.menuShowing}
            userName={this.props.userName}
            isFirstTime={this.props.isFirstTime}
            noFeedClick={this.handleNoFeedClick}
            goToAddDependant={this.props.goToAddDependant}
            preLoadDependant={this.props.preLoadDependant}
          />
        </div>
        {
          this.props.showCta &&
            <CtaMenuButton
              ref={c => { this.cta = c; }}
              {...this.getCtaStyles()}
              onClick={this.props.ctaFn}
              icon={this.props.ctaIcon}
            />
        }
        <ReactCSSTransitionGroup
          component="div"
          transitionName={{
            leave: styles.leave,
            leaveActive: styles.leaveActive,
            enter: styles.enter,
            enterActive: styles.enterActive,
          }}
          transitionLeaveTimeout={300}
          transitionEnterTimeout={300}
        >
          {
            this.state.showMenu &&
              <MenuContainer
                dependantFn={this.props.goToAddDependant}
                practiceListingFn={this.props.goToAddPractice}
                practices={this.props.practices}
                goToBooking={this.props.goToBooking}
                goToAddPractice={this.props.goToAddPractice}
                searchPractices={this.props.searchPractices}
                allPractices={this.props.allPractices}
                matchedPractices={this.props.matchedPractices}
                isSearching={this.props.isSearching}
                goToPractice={this.props.goToPractice}
                token={this.props.id}
              />
        }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.profileReducer.profile.FirstName ?
    `${state.profileReducer.profile.FirstName} ${state.profileReducer.profile.LastName}` :
    "",
  isFirstTime: state.fetchPastAppointmentsReducer.appointments.length < 1,
  isFetchingAppointments: state.fetchPastAppointmentsReducer.isFetching,
  ctaFn: state.appointmentsCTAReducer.ctaFn,
  ctaIcon: state.appointmentsCTAReducer.ctaIcon,
  showCta: state.appointmentsCTAReducer.showCta,
  id: state.loginReducer.token,
  feed: state.feedReducer.feed,
  isMobileVerified: state.feedReducer.isMobileVerified,
  isFetching: state.feedReducer.isFetching ||
    state.practiceListingReducer.isFetching,
  practices: state.practiceListingReducer.practices,
  openDeleter: state.deletionReducer.isOpen,
  menuShowing: state.appStylesReducer.shrink,
  allPractices: state.practiceSelectionReducer.practices,
  matchedPractices: state.practiceSelectionReducer.matchedPractices,
  isSearching: state.practiceSelectionReducer.isSearching,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  removeStyles: bindActionCreators(headerActions.removeStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(appActions.removeAppStyles, dispatch),
  changeCtaFn: bindActionCreators(actions.changeCtaFn, dispatch),
  changeCtaIcon: bindActionCreators(actions.changeCtaIcon, dispatch),
  toggleCta: bindActionCreators(actions.toggleCta, dispatch),
  clearCta: bindActionCreators(actions.clearCta, dispatch),
  cancelAppointment: bindActionCreators(cancelApptActions.cancelAppointment, dispatch),
  checkAbleToCancel: bindActionCreators(cancelApptActions.checkAbleToCancel, dispatch),
  toggleDeleter: bindActionCreators(deleterActions.toggleDeleter, dispatch),
  preLoadDependant: bindActionCreators(preLoadDependantActions.preloadDependantData, dispatch),
  searchPractices: bindActionCreators(practiceListActions.searchPractices, dispatch),
  getAllPractices: bindActionCreators(practiceListActions.getAllPractices, dispatch),
  /* eslint-disable max-len */
  goToBooking: (id) => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
  goToAddPractice: () => bindActionCreators(push, dispatch)(routeConfig.addPractice.getBrowserPath()),
  goToAddDependant: () => bindActionCreators(push, dispatch)(routeConfig.addDependant.getBrowserPath()),
  goToAccountVerification: () => bindActionCreators(push, dispatch)(routeConfig.accountVerification.getBrowserPath()),
  goToPractice: (e) => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(e.UrlName)),
  /* eslint-enable max-len */
});

export default connect(mapStateToProps, mapDispatchToProps)(HealthFeed);
export {
  styles,
};
