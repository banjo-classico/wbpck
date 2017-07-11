import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";
import classnames from "classnames";

import renderOnResolutionChange from "../../../../components/RenderOnResolutionChange";
import SectionTitle from "../SectionTitle";
import DoctorImage from "../DoctorImage";
import styles from "./ourTeam.css";
import { doctorPropType } from "../../propTypes";

const OurTeam = ({ title = "Book an appointment", className, team, pushProp, onBookNow }) => (
  <div className={classnames(styles.container, className)} >
    <SectionTitle
      title={title}
      className={styles.sectionTitle}
    />
    <div className={styles.doctorContainer}>
      {team ? map(
        ({ Name, Picture, PmsUserId, Type }) =>
          <DoctorImage
            name={Name}
            src={Picture}
            id={PmsUserId}
            type={Type}
            key={PmsUserId}
            onBookNow={onBookNow}
            onClick={(id) => pushProp(id)}
          />, team
      ) : null}
    </div>
  </div>
);

OurTeam.propTypes = {
  team: PropTypes.arrayOf(doctorPropType.isRequired),
  pushProp: PropTypes.func.isRequired,
  onBookNow: PropTypes.func.isRequired,
  orgid: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};
export default renderOnResolutionChange(OurTeam);
