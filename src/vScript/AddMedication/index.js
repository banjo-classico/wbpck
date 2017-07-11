import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as scriptActions } from "../RequestScript/actions/actions";
import MainPageLayout from "../components/MainPageLayout";
import CtaButton from "../../components/CtaButton";
import ScriptIcon from "../../svgs/scripts.svg";
import styles from "./addMedication.css";
import { routeConfig } from "../../routes";

class AddMedication extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    setInfo: PropTypes.func.isRequired,
    goToPrescriptions: PropTypes.func.isRequired,
    goToReason: PropTypes.func.isRequired,
    medications: PropTypes.arrayOf(PropTypes.string),
    patientName: PropTypes.string,
    practiceName: PropTypes.string,
    doctorName: PropTypes.string,
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.setHeading(<div />);
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.displayHeaderIcons();
  }
  onMedicationsChange = (medications) => {
    this.props.setInfo("medications", medications);
  }
  // styles.container is needed here for tags styles
  render() {
    return (
      <MainPageLayout>
        <div className={styles.patientDetailsContainer}>
          <ScriptIcon className={styles.scriptIcon} />
          <div className={styles.patientDetails}>
            <div className={styles.patientName}>{this.props.patientName}</div>
            <div>{`at ${this.props.practiceName}`}</div>
            <div>{this.props.doctorName}</div>
          </div>
        </div>
        <div className={styles.container}>
          <TagsInput
            value={this.props.medications}
            onChange={this.onMedicationsChange}
            onlyUnique
            addOnBlur
            inputProps={{ placeholder: "+   Add Medication" }}
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={this.props.goToPrescriptions}>
            Cancel
          </button>
          <CtaButton active className={styles.cta} onClick={this.props.goToReason} />
        </div>
      </MainPageLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  patientName: `${state.scriptDetailsReducer.patient.FirstName} ${state.scriptDetailsReducer.patient.LastName}`,
  practiceName: state.scriptDetailsReducer.practice.Name,
  doctorName: state.scriptDetailsReducer.doctor.Name,
  medications: state.scriptDetailsReducer.medications,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  setInfo: bindActionCreators(scriptActions.setInfo, dispatch),
  goToPrescriptions: () => bindActionCreators(push, dispatch)(routeConfig.home.getBrowserPath()),
  goToReason: () => bindActionCreators(push, dispatch)(routeConfig.reason.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMedication);
export {
  styles,
};
