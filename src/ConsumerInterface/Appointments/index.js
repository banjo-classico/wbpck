import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";

import ConfirmedAppointments from "./components/ConfirmedAppointments";
import PastAppointments from "./components/PastAppointments";
import MenuContainer from "./components/MenuContainer";
import PlusIcon from "../../svgs/plus.svg";
import CtaMenuButton from "../../components/CtaMenuButton";
import styles from "./appointments.css";
import { actions } from "./actions/actions";
import { actions as cancelApptActions } from "../Deleter/actions/cancelAppointmentActions";
import { actions as deleterActions } from "../Deleter/actions/actions";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as preLoadDependantActions } from "../AddDependantPage/actions/actions";
import { actions as practiceListActions } from "../AddNewPracticePage/actions/actions";
import { appointmentPropType } from "./propTypes";
import { clinicPropType } from "../PracticeListings/propTypes";
import { routeConfig } from "../../routes";
import { isIOS } from "../../libs/BrowserDetection";
import { isDesktop } from "../../config";

class Appointments extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    allPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    clearStyles: PropTypes.func.isRequired,
    removeStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    removeAppStyles: PropTypes.func.isRequired,
    goToAddPractice: PropTypes.func.isRequired,
    goToBooking: PropTypes.func.isRequired,
    goToAddDependant: PropTypes.func.isRequired,
    cancelAppointment: PropTypes.func.isRequired,
    checkAbleToCancel: PropTypes.func.isRequired,
    toggleDeleter: PropTypes.func.isRequired,
    toggleCta: PropTypes.func.isRequired,
    changeCtaIcon: PropTypes.func.isRequired,
    changeCtaFn: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    ctaFn: PropTypes.func.isRequired,
    ctaIcon: PropTypes.node.isRequired,
    showCta: PropTypes.bool.isRequired,
    openDeleter: PropTypes.bool.isRequired,
    menuShowing: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    appointments: PropTypes.arrayOf(appointmentPropType).isRequired,
    pastAppointments: PropTypes.arrayOf(appointmentPropType).isRequired,
    practices: PropTypes.arrayOf(clinicPropType).isRequired,
    preLoadDependantData: PropTypes.func.isRequired,
    searchPractices: PropTypes.func.isRequired,
    matchedPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    isSearching: PropTypes.bool,
    goToPractice: PropTypes.func.isRequired,
    getAllPractices: PropTypes.func.isRequired,
  }
  state = {
    showMenu: false,
    cardIsOpen: false,
  }
  componentDidMount() {
    this.props.changeCtaFn(this.toggleMenu);
    this.props.getAllPractices();
  }
  getCtaStyles = () => {
    if (this.state.cardIsOpen) {
      return {
        iconStyles: styles.ctaIconCard,
        buttonStyles: styles.ctaButtonCard,
        text: "Add to my calendar",
      };
    }
    return {
      buttonStyles: styles.ctaButton,
      text: "New Appointment",
      iconStyles: styles.buttonIcon,
      textIconStyles: styles.textButtonIcon,
    };
  }
  toggleStyles = (shouldAddStyles) => {
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
  toggleOpenCardState = () => {
    this.setState({ cardIsOpen: !this.state.cardIsOpen }, this.changeCta);
  }
  changeCta = () => {
    if (!this.state.cardIsOpen) {
      this.props.changeCtaFn(this.toggleMenu);
      this.props.changeCtaIcon(PlusIcon);
    }
  }
  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu }, this.toggleStyles);
  }
  handleNoAppointmentClick = () => {
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
          <ConfirmedAppointments
            key={1}
            isFetching={this.props.isFetching}
            appointments={this.props.appointments}
            cancelAppointment={this.props.cancelAppointment}
            checkAbleToCancel={this.props.checkAbleToCancel}
            toggleStyles={this.toggleStyles}
            toggleOpenCardState={this.toggleOpenCardState}
            changeCtaFn={this.props.changeCtaFn}
            changeCtaIcon={this.props.changeCtaIcon}
            toggleCta={this.props.toggleCta}
            toggleDeleter={this.props.toggleDeleter}
            openDeleter={this.props.openDeleter}
            nonClickable={this.props.menuShowing}
            goToAddDependant={this.props.goToAddDependant}
            preLoadDependant={this.props.preLoadDependantData}
            noAppointmentClick={this.handleNoAppointmentClick}
            userName={this.props.userName}
          />
          <PastAppointments
            key={2}
            isFetching={this.props.isFetching}
            appointments={this.props.pastAppointments}
            toggleStyles={this.toggleStyles}
            toggleOpenCardState={this.toggleOpenCardState}
            changeCtaFn={this.props.changeCtaFn}
            changeCtaIcon={this.props.changeCtaIcon}
            toggleCta={this.props.toggleCta}
            nonClickable={this.props.menuShowing}
            userName={this.props.userName}
            goToAddDependant={this.props.goToAddDependant}
            preLoadDependant={this.props.preLoadDependantData}
          />
        </div>
        {this.props.showCta ?
          <CtaMenuButton
            ref={c => { this.cta = c; }}
            {...this.getCtaStyles()}
            onClick={this.props.ctaFn}
            icon={this.props.ctaIcon}
          /> : null
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
          {this.state.showMenu &&
            <MenuContainer
              practices={this.props.practices}
              goToBooking={this.props.goToBooking}
              goToAddPractice={this.props.goToAddPractice}
              searchPractices={this.props.searchPractices}
              allPractices={this.props.allPractices}
              matchedPractices={this.props.matchedPractices}
              isSearching={this.props.isSearching}
              goToPractice={this.props.goToPractice}
              token={this.props.id}
              //   notVensaAction={this.props.toggleErrorPopUp}
            />
        }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: `${state.profileReducer.profile.FirstName} ${state.profileReducer.profile.LastName}`,
  menuShowing: state.appStylesReducer.shrink,
  ctaFn: state.appointmentsCTAReducer.ctaFn,
  ctaIcon: state.appointmentsCTAReducer.ctaIcon,
  showCta: state.appointmentsCTAReducer.showCta,
  id: state.loginReducer.token,
  appointments: state.fetchConfirmedAppointmentsReducer.appointments,
  pastAppointments: state.fetchPastAppointmentsReducer.appointments,
  isFetching: state.fetchConfirmedAppointmentsReducer.isFetching ||
    state.fetchPastAppointmentsReducer.isFetching ||
    state.practiceListingReducer.isFetching,
  practices: state.practiceListingReducer.practices,
  openDeleter: state.deletionReducer.isOpen,
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
  cancelAppointment: bindActionCreators(cancelApptActions.cancelAppointment, dispatch),
  checkAbleToCancel: bindActionCreators(cancelApptActions.checkAbleToCancel, dispatch),
  toggleDeleter: bindActionCreators(deleterActions.toggleDeleter, dispatch),
  searchPractices: bindActionCreators(practiceListActions.searchPractices, dispatch),
  getAllPractices: bindActionCreators(practiceListActions.getAllPractices, dispatch),
  /* eslint-disable max-len */
  goToAddDependant: () => bindActionCreators(push, dispatch)(routeConfig.addDependant.getBrowserPath()),
  preLoadDependantData: bindActionCreators(preLoadDependantActions.preloadDependantData, dispatch),
  goToBooking: (id) => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
  goToAddPractice: () => bindActionCreators(push, dispatch)(routeConfig.addPractice.getBrowserPath()),
  goToPreview: (id) => bindActionCreators(push, dispatch)(routeConfig.practicePreview.getBrowserPath(id)),
  goToPractice: (e) => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(e.UrlName)),
  /* eslint-enable max-len */
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
export {
  styles,
};
