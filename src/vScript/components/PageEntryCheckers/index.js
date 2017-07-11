import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { replace } from "react-router-redux";

import ProtectedComponent from "../../../components/protectedComponent";
import { routeConfig } from "../../../routes";


// ADD MEDICATION CHECK
const addMedicationMapStateToProps = (state) => ({
  predicate: state.loginReducer.token.length &&
    state.scriptDetailsReducer.patient.Id &&
    state.scriptDetailsReducer.practice.Name &&
    state.scriptDetailsReducer.doctor.Name && true,
});
const addMedicationMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const AddMedicationCheck = connect(
  addMedicationMapStateToProps,
  addMedicationMapDispatchToProps,
)(ProtectedComponent);

// REASON PAGE CHECK
const reasonPageMapStateToProps = (state) => ({
  predicate: state.loginReducer.token &&
    state.scriptDetailsReducer.medications.length > 0,
});
const reasonPageMapDispatchToProps = (dispatch) => ({
  protectorFn:
    () => bindActionCreators(replace, dispatch)(routeConfig.addMedication.getBrowserPath()),
});
const ReasonPageCheck = connect(
  reasonPageMapStateToProps,
  reasonPageMapDispatchToProps,
)(ProtectedComponent);

// PICK UP SELECTION CHECK
const pickUpSelectionMapStateToProps = (state) => ({
  predicate: state.loginReducer.token &&
    state.scriptDetailsReducer.medications.length > 0,
});
const pickUpSelectionMapDispatchToProps = (dispatch) => ({
  protectorFn:
    () => bindActionCreators(replace, dispatch)(routeConfig.reason.getBrowserPath()),
});
const PickUpSelectionCheck = connect(
  pickUpSelectionMapStateToProps,
  pickUpSelectionMapDispatchToProps,
)(ProtectedComponent);

export {
  AddMedicationCheck,
  ReasonPageCheck,
  PickUpSelectionCheck,
};
