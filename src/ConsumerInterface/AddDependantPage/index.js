import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import { actions } from "../DependantsPage/actions/actions";
import { actions as preLoadDependantDataAction } from "../AddDependantPage/actions/actions";
import ImageUploader from "../../components/ImageUploader";
import DependantForm from "../DependantsPage/components/DependantForm";
import Pending from "../DependantsPage/components/Pending";
import styles from "./addDependantPage.css";
import Alert from "../../libs/Alert";
import { routeConfig } from "../../routes";

class AddDependantPage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    removeStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    removeAppStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    addDependant: PropTypes.func.isRequired,
    addAvatar: PropTypes.func.isRequired,
    goToDependants: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    success: PropTypes.bool,
    isAdding: PropTypes.bool,
    dependant: PropTypes.object,
    clearDependantData: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.setHeading(<div>New dependant</div>);
    this.props.addAppStyles([styles.app]);
    this.props.addStyles([styles.header]);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      Alert.success("A new dependant has been added to your profile.");
      this.props.goToDependants();
    }
  }
  componentWillUnmount() {
    this.props.removeAppStyles([styles.app]);
    this.props.clearHeading();
    this.props.clearStyles();
    this.props.displayHeaderIcons();
    this.props.clearDependantData();
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <ImageUploader
            onSubmit={this.props.addAvatar(this.props.token)}
          />
          <DependantForm
            ref={c => { this.form = c; }}
            addCta
            dependant={this.props.dependant}
            addDependant={this.props.addDependant}
            token={this.props.token}
          />
        </div>
        {this.props.isAdding ? <Pending /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  success: state.addDependantReducer.success,
  isAdding: state.addDependantReducer.isAdding,
  dependant: state.preLoadDependantReducer.dependant,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  removeStyles: bindActionCreators(headerActions.removeStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(appActions.removeAppStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addDependant: bindActionCreators(actions.addDependant, dispatch),
  addAvatar: (token) => (file) => bindActionCreators(actions.addAvatar, dispatch)(file, token),
  goToDependants: () => bindActionCreators(push, dispatch)(routeConfig.dependants.getBrowserPath()),
  clearDependantData: bindActionCreators(preLoadDependantDataAction.clearDependantData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDependantPage);
export {
  styles,
};
