import React from "react";

import ReasonPage from "./vScript/ReasonPage";
import AddMedication from "./vScript/AddMedication";
import PickUpSelection from "./vScript/PickUpSelection";
import AddPharmacy from "./vScript/AddPharmacy";

import {
  AddMedicationCheck,
  ReasonPageCheck,
  PickUpSelectionCheck,
} from "./vScript/components/PageEntryCheckers";

const ProtectedAddMedication = () => (
  <AddMedicationCheck><AddMedication /></AddMedicationCheck>
);
const ProtectedReasonPage = () => (
  <ReasonPageCheck><ReasonPage /></ReasonPageCheck>
);
const ProtectedPickUpSelection = () => (
  <PickUpSelectionCheck><PickUpSelection /></PickUpSelectionCheck>
);

const vScriptRoutes = {
  addMedication: {
    component: ProtectedAddMedication,
    routerPath: "/prescription-add-medication",
    getBrowserPath: () => "/prescription-add-medication",
  },
  reason: {
    component: ProtectedReasonPage,
    routerPath: "/prescription-reason",
    getBrowserPath: () => "/prescription-reason",
  },
  pickUpSelection: {
    component: ProtectedPickUpSelection,
    routerPath: "/prescription-select-pick-up",
    getBrowserPath: () => "/prescription-select-pick-up",
  },
  addPharmacy: {
    component: AddPharmacy,
    routerPath: "/prescription-add-pharmacy",
    getBrowserPath: () => "/prescription-add-pharmacy",
  },
};

export {
  vScriptRoutes,
};
