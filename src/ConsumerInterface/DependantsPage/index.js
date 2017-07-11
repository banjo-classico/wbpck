import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { map } from "lodash/fp";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions as deleterActions } from "../Deleter/actions/actions";
import { actions } from "./actions/actions";
import PlusIcon from "../../svgs/plus.svg";
import LoadingSpinner from "../../components/loadingSpinner";
import CtaMenuButton from "../../components/CtaMenuButton";
import DependantCard from "./components/DependantCard";
import NoDependantsCard from "./components/NoDependantsCard";
import Alert from "../../libs/Alert";
import styles from "./dependantsPage.css";
import { dependantPropType } from "./propTypes";
import { routeConfig } from "../../routes";

const mapConverted = map.convert({ cap: false });

const getMinHeight = (length) => `calc(${length} * (6.4705rem + 15px) + 150px)`;

class DependantsPage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    removeStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    overrideBackArrow: PropTypes.func.isRequired,
    clearBackArrow: PropTypes.func.isRequired,
    addCustomIcon: PropTypes.func.isRequired,
    clearCustomIcon: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    removeAppStyles: PropTypes.func.isRequired,
    fetchDependants: PropTypes.func.isRequired,
    addDependant: PropTypes.func.isRequired,
    removeDependant: PropTypes.func.isRequired,
    clearRemoveDependant: PropTypes.func.isRequired,
    addAvatar: PropTypes.func.isRequired,
    toggleCta: PropTypes.func.isRequired,
    toggleDeleter: PropTypes.func.isRequired,
    goToAddDependant: PropTypes.func.isRequired,
    goToHome: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    dependants: PropTypes.arrayOf(dependantPropType).isRequired,
    showCta: PropTypes.func.isRequired,
    hideCta: PropTypes.func.isRequired,
    ctaIsShown: PropTypes.bool.isRequired,
    openDeleter: PropTypes.bool.isRequired,
    updateSuccess: PropTypes.bool,
    updateError: PropTypes.bool,
    isAdding: PropTypes.bool,
    isRemoving: PropTypes.bool,
    removeSuccess: PropTypes.bool,
    removeError: PropTypes.bool,
    isFetching: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.changeHeader = this.changeHeader.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
  }
  state = {
    cardIsOpen: false,
  }
  componentDidMount() {
    this.props.fetchDependants(this.props.token);
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.setHeading(<div>Dependants</div>);
    this.props.addAppStyles([styles.app]);
    this.props.addStyles([styles.header]);
    this.props.showCta();
    this.props.overrideBackArrow(this.props.goToHome);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.removeSuccess) {
      Alert.success("Your dependant has been removed.");
      this.props.clearRemoveDependant();
      this.props.toggleDeleter();
      this.onCardClick();
      this.changeHeader("Dependants");
      this.props.clearBackArrow();
    }
  }
  componentWillUnmount() {
    this.props.removeAppStyles([styles.app]);
    this.props.clearStyles();
    this.props.clearHeading();
    this.props.clearBackArrow();
    this.props.displayHeaderIcons();
  }
  onCardClick() {
    this.setState({ cardIsOpen: !this.state.cardIsOpen });
  }
  changeHeader(name) {
    this.props.setHeading(<div className={styles.headerName}>{name}</div>);
  }
  render() {
    return (
      <LoadingSpinner
        isFetching={this.props.isAdding}
        containerClassName={styles.container}
        iconClassName={styles.spinner}
        overlayClassName={styles.overlay}
      >
        <div
          className={styles.dependants}
          style={{ minHeight: getMinHeight(this.props.dependants.length) }}
        >
          {!this.props.dependants.length && !this.props.isFetching ? <NoDependantsCard /> : null}
          {mapConverted((d, i) =>
            <DependantCard
              key={d.Id}
              index={i}
              dependant={d}
              token={this.props.token}
              addAvatar={this.props.addAvatar}
              addDependant={this.props.addDependant}
              isAdding={this.props.isAdding}
              updateSuccess={this.props.updateSuccess}
              removeDependant={this.props.removeDependant}
              isRemoving={this.props.isRemoving}
              fetchDependants={this.props.fetchDependants}
              changeHeader={this.changeHeader}
              overrideBackArrow={this.props.overrideBackArrow}
              goToHome={this.props.goToHome}
              addCustomIcon={this.props.addCustomIcon}
              clearCustomIcon={this.props.clearCustomIcon}
              toggleCta={this.props.toggleCta}
              showCta={this.props.showCta}
              hideCta={this.props.hideCta}
              someCardOpen={this.state.cardIsOpen}
              onCardClick={this.onCardClick}
              toggleDeleter={this.props.toggleDeleter}
              openDeleter={this.props.openDeleter}
            />
          )(this.props.dependants)}
        </div>
        {
          this.props.ctaIsShown ?
            <CtaMenuButton
              text="Add Dependant"
              icon={PlusIcon}
              buttonStyles={styles.cta}
              textIconStyles={styles.textCtaIcon}
              onClick={this.props.goToAddDependant}
            /> : null
        }
      </LoadingSpinner>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.fetchDependantsReducer.isFetching,
  token: state.loginReducer.token,
  dependants: state.fetchDependantsReducer.dependants,
  updateSuccess: state.addDependantReducer.success,
  updateError: state.addDependantReducer.error,
  isAdding: state.addDependantReducer.isAdding || state.addDependantReducer.isProcessingFile,
  isRemoving: state.removeDependantReducer.isRemoving,
  removeSuccess: state.removeDependantReducer.success,
  removeError: state.removeDependantReducer.error,
  ctaIsShown: state.dependantsCTAReducer.showCta,
  openDeleter: state.deletionReducer.isOpen,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  removeStyles: bindActionCreators(headerActions.removeStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  overrideBackArrow: bindActionCreators(headerActions.overrideBackArrow, dispatch),
  clearBackArrow: bindActionCreators(headerActions.clearBackArrow, dispatch),
  addCustomIcon: bindActionCreators(headerActions.addCustomIcon, dispatch),
  clearCustomIcon: bindActionCreators(headerActions.clearCustomIcon, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(appActions.removeAppStyles, dispatch),
  fetchDependants: bindActionCreators(actions.fetchDependants, dispatch),
  addDependant: bindActionCreators(actions.addDependant, dispatch),
  removeDependant: bindActionCreators(actions.removeDependant, dispatch),
  clearRemoveDependant: bindActionCreators(actions.clearRemoveDependant, dispatch),
  // eslint-disable-next-line max-len
  addAvatar: (token, id) => (file) => bindActionCreators(actions.addAvatar, dispatch)(file, token, id),
  toggleCta: bindActionCreators(actions.toggleCta, dispatch),
  showCta: bindActionCreators(actions.showCta, dispatch),
  hideCta: bindActionCreators(actions.hideCta, dispatch),
  toggleDeleter: bindActionCreators(deleterActions.toggleDeleter, dispatch),
  // eslint-disable-next-line max-len
  goToAddDependant: () => bindActionCreators(push, dispatch)(routeConfig.addDependant.getBrowserPath()),
  goToHome: () => bindActionCreators(push, dispatch)(routeConfig.home.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DependantsPage);
export {
  styles,
};
