import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import ConfirmAppointmentDesktop from "../ConfirmAppointmentDesktop";
import ConfirmAppointmentMobile from "../ConfirmAppointmentMobile";
import FullPagePopup from "../../../../components/FullPagePopUp";
// eslint-disable-next-line max-len
import { DoctorProfilePropType, PracticeInfoPropType } from "../../../PracticeBookingPage/propTypes";
import { detailsPropType } from "../../propTypes";
import { isDesktop } from "../../../../config";

const ConfirmAppointment = ({
  doctor,
  time,
  practice,
  patient,
  guardian,
  onConfirmClick,
  onDoctorEditClick,
  onDetailsEditClick,
  onGuardianEditClick,
}) => (
  <FullPagePopup>
    {isDesktop() ?
      <ConfirmAppointmentDesktop
        doctor={doctor}
        time={time}
        practice={practice}
        guardian={guardian}
        patient={patient}
        onConfirmClick={onConfirmClick}
        onDetailsEditClick={onDetailsEditClick}
        onGuardianEditClick={onGuardianEditClick}
        onDoctorEditClick={onDoctorEditClick}
      /> :
      <ConfirmAppointmentMobile
        doctor={doctor}
        time={time}
        practice={practice}
        guardian={guardian}
        patient={patient}
        onConfirmClick={onConfirmClick}
        onDetailsEditClick={onDetailsEditClick}
        onGuardianEditClick={onGuardianEditClick}
        onDoctorEditClick={onDoctorEditClick}
      />
  }
  </FullPagePopup>
);

ConfirmAppointment.propTypes = {
  onConfirmClick: PropTypes.func.isRequired,
  onDoctorEditClick: PropTypes.func.isRequired,
  onDetailsEditClick: PropTypes.func.isRequired,
  onGuardianEditClick: PropTypes.func.isRequired,
  doctor: DoctorProfilePropType.isRequired,
  time: PropTypes.instanceOf(moment),
  practice: PracticeInfoPropType.isRequired,
  patient: detailsPropType.isRequired,
  guardian: detailsPropType,
};
export default ConfirmAppointment;
