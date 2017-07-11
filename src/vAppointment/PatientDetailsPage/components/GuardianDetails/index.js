import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { actions as appActions } from "../../../../App/actions/actions";
import { actions as guardianActions } from "../../../GuardianshipPage/actions/actions";
// import LegalRequirementPreface from "../LegalRequirementPreface";
import GuardianDetailsForm from "../GuardianDetailsForm";
import styles from "./guardianDetails.css";
import { routeConfig } from "../../../../routes";

class GuardianDetails extends Component {
  static propTypes = {
    addAppStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    addGuardianDetails: PropTypes.func.isRequired,
    goToGuardianshipPage: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,

  }
  constructor(props) {
    super(props);
    this.handleGuardianSubmit = this.handleGuardianSubmit.bind(this);
  }
  componentDidMount() {
    this.props.addAppStyles([styles.app]);
  }
  componentWillUnmount() {
    this.props.clearAppStyles();
  }
  handleGuardianSubmit(details) {
    this.props.addGuardianDetails(
      details.name,
      details.surname,
      details.birthday,
      details.phone
    );
    this.props.goToGuardianshipPage();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <GuardianDetailsForm
            onSubmit={this.handleGuardianSubmit}
            onCancel={this.props.onCancel}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({
});
const mapDispatchToProps = (dispatch) => ({
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  addGuardianDetails: bindActionCreators(guardianActions.addDetails, dispatch),
  // eslint-disable-next-line max-len
  goToGuardianshipPage: () => bindActionCreators(push, dispatch)(routeConfig.guardianship.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuardianDetails);
export {
  styles,
};
