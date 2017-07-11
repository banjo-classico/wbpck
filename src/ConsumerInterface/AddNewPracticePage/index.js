import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appStyleActions } from "../../App/actions/actions";
import { actions } from "./actions/actions";
import { actions as linkingActions } from "./actions/practiceLinkingActions";
import PracticeAutoComplete from "./components/PracticeAutoComplete";
import LoadingSpinner from "../../components/loadingSpinner";
import { clinicPropType } from "../PracticeListings/propTypes";
import { routeConfig } from "../../routes";
import styles from "./addNewPracticePage.css";

class AddNewPracticePage extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    allPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    matchedPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    isSearching: PropTypes.bool.isRequired,
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    setAppClassNames: PropTypes.func.isRequired,
    clearAppClassNames: PropTypes.func.isRequired,
    getAllPractices: PropTypes.func.isRequired,
    searchPractices: PropTypes.func.isRequired,
    clearPracticeSelection: PropTypes.func.isRequired,
    goToPreview: PropTypes.func.isRequired,
    linkToPractice: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  }
  componentWillMount() {
    this.props.setHeading(<div>Add new practice</div>);
    this.props.displayHeaderIcons({ menu: false, arrow: true });
  }
  componentDidMount() {
    this.props.addStyles([styles.header]);
    this.props.setAppClassNames([styles.app]);
    this.props.clearPracticeSelection();
    this.props.getAllPractices();
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.clearHeading();
    this.props.displayHeaderIcons();
    this.props.clearAppClassNames();
  }
  render() {
    return (
      <LoadingSpinner
        containerClassName={styles.page}
        iconClassName={styles.spinner}
        overlayClassName={styles.overlay}
        isFetching={this.props.isFetching}
      >
        <PracticeAutoComplete
          search={this.props.searchPractices}
          allPractices={this.props.allPractices}
          matchedPractices={this.props.matchedPractices}
          isSearching={this.props.isSearching}
          successAction={this.props.goToPreview}
          errorAction={this.props.linkToPractice(this.props.token)}
          isWhiteBackground
          condition="IsUsingVensa"
        />
      </LoadingSpinner>
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token,
  registerPatientId: state.registerPatientInfoReducer.id,
  isFetching: state.practiceSelectionReducer.isFetching ||
  state.practiceLinkingReducer.isFetching,
  allPractices: state.practiceSelectionReducer.practices,
  matchedPractices: state.practiceSelectionReducer.matchedPractices,
  isSearching: state.practiceSelectionReducer.isSearching,
});
const mapDispatchToProps = dispatch => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  setAppClassNames: bindActionCreators(appStyleActions.addAppStyles, dispatch),
  clearAppClassNames: bindActionCreators(appStyleActions.clearAppStyles, dispatch),
  getAllPractices: bindActionCreators(actions.getAllPractices, dispatch),
  searchPractices: bindActionCreators(actions.searchPractices, dispatch),
  // eslint-disable-next-line max-len
  linkToPractice: (token) => (practice) => bindActionCreators(linkingActions.linkPractice, dispatch)(practice, token),
  clearPracticeSelection: bindActionCreators(actions.clearPracticeSelection, dispatch),
  // eslint-disable-next-line max-len
  goToPreview: (e) => bindActionCreators(push, dispatch)(routeConfig.practicePreview.getBrowserPath(e.UrlName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPracticePage);
