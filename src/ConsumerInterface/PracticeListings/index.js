import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classnames from "classnames";
import { map } from "lodash/fp";

import styles from "./PracticeListings.css";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as listingActions } from "./actions/actions";
import PracticeListing from "./components/PracticeListing";
import LoadingSpinner from "../../components/loadingSpinner";
import CtaMenuButton from "../../components/CtaMenuButton/";
import PlusIcon from "../../svgs/plus.svg";
import { clinicPropType } from "./propTypes";
import { routeConfig } from "../../routes";

class PracticeListings extends Component {
  static propTypes = {
    bookAtPractice: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    clearBackArrow: PropTypes.func.isRequired,
    overrideBackArrow: PropTypes.func.isRequired,
    goToHome: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    getClinics: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    clinics: PropTypes.arrayOf(clinicPropType).isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    goToAddPractice: PropTypes.func.isRequired,
    unlinkPractice: PropTypes.func.isRequired,
    goToSupport: PropTypes.func.isRequired,
  }
  state = {
    menuActive: false,
  }
  componentDidMount() {
    this.props.setHeading(<div>Practices</div>);
    this.props.addAppStyles([styles.app]);
    this.props.addStyles([styles.header]);
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.getClinics(this.props.token);
    this.props.overrideBackArrow(this.props.goToHome);
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.displayHeaderIcons();
    this.props.clearStyles();
    this.props.clearAppStyles();
    this.props.clearBackArrow();
  }
  toggleMenuActive = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  render() {
    return (
      <div className={styles.outer}>
        <LoadingSpinner
          isFetching={this.props.isFetching}
          containerClassName={styles.container}
          iconClassName={styles.spinner}
          overlayClassName={styles.overlay}
        >
          {
          map(clinic =>
            <PracticeListing
              clinic={clinic}
              bookAtPractice={this.props.bookAtPractice}
              key={clinic.PracticeId}
              toggleMenuActive={this.toggleMenuActive}
              parentIsActive={this.state.menuActive}
              unlinkPractice={() => this.props.unlinkPractice(clinic, this.props.token)}
              goToSupport={this.props.goToSupport}
            />
            , this.props.clinics)
          }
        </LoadingSpinner>
        <CtaMenuButton
          text="Add Practice"
          icon={PlusIcon}
          textIconStyles={styles.buttonIcon}
          onClick={this.props.goToAddPractice}
        />
        <div
          onClick={() => this.toggleMenuActive()}
          className={classnames({ [styles.dark]: this.state.menuActive })}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isFetching: state.practiceListingReducer.isFetching || state.practiceUnlinkingReducer.isFetching,
  clinics: state.practiceListingReducer.practices,
  token: state.loginReducer.token,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  overrideBackArrow: bindActionCreators(headerActions.overrideBackArrow, dispatch),
  clearBackArrow: bindActionCreators(headerActions.clearBackArrow, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  // eslint-disable-next-line max-len
  goToAddPractice: () => bindActionCreators(push, dispatch)(routeConfig.addPractice.getBrowserPath()),
  // eslint-disable-next-line max-len
  bookAtPractice: (id) => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
  goToSupport: () => bindActionCreators(push, dispatch)(routeConfig.support.getBrowserPath()),
  goToHome: () => bindActionCreators(push, dispatch)(routeConfig.home.getBrowserPath()),
  getClinics: bindActionCreators(listingActions.getPracticeListings, dispatch),
  unlinkPractice: bindActionCreators(listingActions.unlinkPractice, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticeListings);
