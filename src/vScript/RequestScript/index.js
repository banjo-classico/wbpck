import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { CSSTransitionGroup } from "react-transition-group";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as depActions } from "../../ConsumerInterface/DependantsPage/actions/actions";
import { actions as apptActions } from "../../ConsumerInterface/Appointments/actions/actions";
import { actions as searchActions } from "./actions/searchActions";
import { actions as menuActions } from "./actions/menuActions";
import { actions } from "./actions/actions";
import CtaMenuButton from "../../components/CtaMenuButton";
import MenuContainer from "./components/MenuContainer";
import RequestList from "./components/RequestList";
import styles from "./requestScript.css";
import { dependantPropType, scriptPropType, detailsPropType } from "./propTypes";
import { clinicPropType } from "../../ConsumerInterface/PracticeListings/propTypes";
import { profilePropType } from "../../ConsumerInterface/MainShell/propTypes";
import { routeConfig } from "../../routes";

class RequestScript extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    removeStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    removeAppStyles: PropTypes.func.isRequired,
    fetchScriptDetails: PropTypes.func.isRequired,
    fetchCurrentRequests: PropTypes.func.isRequired,
    fetchPastRequests: PropTypes.func.isRequired,
    fetchDependants: PropTypes.func.isRequired,
    searchPractices: PropTypes.func.isRequired,
    fetchConnectedPractices: PropTypes.func.isRequired,
    fetchAllPractices: PropTypes.func.isRequired,
    fetchDoctors: PropTypes.func.isRequired,
    setInfo: PropTypes.func.isRequired,
    goToAddMedications: PropTypes.func.isRequired,
    goToBooking: PropTypes.func.isRequired,
    changeCtaFn: PropTypes.func.isRequired,
    toggleCta: PropTypes.func.isRequired,
    ctaFn: PropTypes.func.isRequired,
    showCta: PropTypes.bool.isRequired,
    ctaIcon: PropTypes.node.isRequired,
    matchedPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    isSearching: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    // allPractices: PropTypes.arrayOf(),
    // practices: PropTypes.,
    // doctors: PropTypes.,
    currentRequests: PropTypes.arrayOf(scriptPropType),
    pastRequests: PropTypes.arrayOf(scriptPropType),
    scriptDetails: detailsPropType,
    isFetchingCurrent: PropTypes.bool,
    isFetchingPast: PropTypes.bool,
    patients: PropTypes.arrayOf(PropTypes.oneOfType([profilePropType, dependantPropType])),
  }
  state = {
    showMenu: false,
    shouldChangeCta: false,
    ctaText: "Request Prescription",
    cardIsOpen: false,
  }
  componentDidMount() {
    const token = this.props.token;
    this.props.fetchCurrentRequests(token);
    this.props.fetchPastRequests(token);
    this.props.fetchDependants(token);
    this.props.fetchConnectedPractices(token);
    this.props.fetchAllPractices(token);
    this.props.changeCtaFn(this.toggleMenu);
  }
  setCtaText = (ctaText) => {
    this.setState({ ctaText });
  }
  toggleOpenCardState = () => {
    this.setState({ cardIsOpen: !this.state.cardIsOpen }, this.changeCta);
  }
  changeCta = () => {
    if (!this.state.cardIsOpen) {
      this.props.changeCtaFn(this.toggleMenu);
    }
  }
  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu }, this.toggleStyles);
  }
  toggleStyles = (shouldAddStyles) => {
    if ((this.state.showMenu || shouldAddStyles)) {
      this.props.addStyles([styles.absolute]);
      if (this.state.showMenu) {
        this.props.addAppStyles([styles.app]);
      }
    } else {
      this.props.removeStyles([styles.absolute]);
      this.props.removeAppStyles([styles.app]);
    }
  }
  handleNoScriptClick = () => {
    if (this.cta) {
      this.cta.handleClick();
    }
  }
  render() {
    return (
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <RequestList
            isFetching={this.props.isFetchingCurrent}
            fetchScriptDetails={this.props.fetchScriptDetails(this.props.token)}
            requests={this.props.currentRequests}
            scriptDetails={this.props.scriptDetails}
            toggleShouldChangeCta={this.toggleShouldChangeCta}
            changeCtaFn={this.props.changeCtaFn}
            toggleCta={this.props.toggleCta}
            setCtaText={this.setCtaText}
            goToBooking={this.props.goToBooking}
            toggleStyles={this.toggleStyles}
            toggleMenu={this.handleNoScriptClick}
            toggleOpenCardState={this.toggleOpenCardState}
          />
          <div className={styles.pastRequestsTitle}>PAST REQUESTS</div>
          <RequestList
            isPast
            isFetching={this.props.isFetchingPast}
            fetchScriptDetails={this.props.fetchScriptDetails(this.props.token)}
            requests={this.props.pastRequests}
            scriptDetails={this.props.scriptDetails}
            toggleShouldChangeCta={this.toggleShouldChangeCta}
            changeCtaFn={this.props.changeCtaFn}
            toggleCta={this.props.toggleCta}
            setCtaText={this.setCtaText}
            goToBooking={this.props.goToBooking}
            toggleStyles={this.toggleStyles}
            toggleMenu={this.handleNoScriptClick}
            toggleOpenCardState={this.toggleOpenCardState}
          />
        </div>
        {
          this.props.showCta &&
            <CtaMenuButton
              ref={c => { this.cta = c; }}
              buttonStyles={styles.ctaButton}
              iconStyles={styles.buttonIcon}
              textIconStyles={styles.textButtonIcon}
              text={this.state.ctaText}
              onClick={this.props.ctaFn}
              icon={this.props.ctaIcon}
            />
        }
        <CSSTransitionGroup
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
              patients={this.props.patients}
              search={this.props.searchPractices}
              allPractices={this.props.allPractices}
              matchedPractices={this.props.matchedPractices}
              isSearching={this.props.isSearching}
              token={this.props.token}
              practices={this.props.practices}
              goToAddMedications={this.props.goToAddMedications}
              fetchDoctors={this.props.fetchDoctors}
              doctors={this.props.doctors}
              setInfo={this.props.setInfo}
            />
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ctaFn: state.appointmentsCTAReducer.ctaFn,
  ctaIcon: state.appointmentsCTAReducer.ctaIcon,
  showCta: state.appointmentsCTAReducer.showCta,
  patients: [
    state.profileReducer.profile,
    ...state.fetchDependantsReducer.dependants,
  ],
  allPractices: state.scriptMenuReducer.allPractices,
  matchedPractices: state.scriptMenuReducer.matchedPractices,
  isSearching: state.scriptMenuReducer.isSearching,
  token: state.loginReducer.token,
  practices: state.scriptMenuReducer.connectedPractices,
  doctors: state.scriptMenuReducer.doctors,
  currentRequests: state.scriptReducer.currentRequests,
  isFetchingCurrent: state.scriptReducer.isFetchingCurrent,
  pastRequests: state.scriptReducer.pastRequests,
  isFetchingPast: state.scriptReducer.isFetchingPast,
  scriptDetails: state.scriptReducer.scriptDetails,
});
const mapDispatchToProps = (dispatch) => ({
  /* eslint-disable max-len */
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  removeStyles: bindActionCreators(headerActions.removeStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(appActions.removeAppStyles, dispatch),
  fetchScriptDetails: (token) => (id) => bindActionCreators(actions.fetchScriptDetails, dispatch)(id, token),
  fetchCurrentRequests: bindActionCreators(actions.fetchCurrentRequests, dispatch),
  fetchPastRequests: bindActionCreators(actions.fetchPastRequests, dispatch),
  fetchDependants: bindActionCreators(depActions.fetchDependants, dispatch),
  searchPractices: bindActionCreators(searchActions.searchPractices, dispatch),
  fetchConnectedPractices: bindActionCreators(menuActions.fetchConnectedPractices, dispatch),
  fetchAllPractices: bindActionCreators(searchActions.fetchAllPractices, dispatch),
  fetchDoctors: bindActionCreators(menuActions.fetchDoctors, dispatch),
  setInfo: bindActionCreators(menuActions.setInfo, dispatch),
  goToAddMedications: () => bindActionCreators(push, dispatch)(routeConfig.addMedication.getBrowserPath()),
  goToBooking: (id) => () => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
  changeCtaFn: bindActionCreators(apptActions.changeCtaFn, dispatch),
  toggleCta: bindActionCreators(apptActions.toggleCta, dispatch),
  /* eslint-enable max-len */
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestScript);
export {
  styles,
};
