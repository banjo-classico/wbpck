import React from "react";
import PropTypes from "prop-types";
import { compose, keys, reduce, map, sortBy } from "lodash/fp";
import moment from "moment";

import styles from "./openingHours.css";
import SectionTitle from "../SectionTitle";
import { hoursPropType } from "../../propTypes";

const getFlexOrder = (order) => ({
  order,
  WebkitBoxOrdinalGroup: order + 1,
  msFlexOrder: order,
});

const mapIntegerToDOW = (int) => {
  const days = {
    1: { dow: "Mon", order: 1 },
    2: { dow: "Tue", order: 3 },
    3: { dow: "Wed", order: 5 },
    4: { dow: "Thu", order: 7 },
    5: { dow: "Fri", order: 2 },
    6: { dow: "Sat", order: 4 },
    7: { dow: "Sun", order: 6 },
  };
  return days[int];
};

const mapTimeToString = (o, c) => {
  const format = moment(o).format("mm") === "00" ? "ha" : "h:mma";
  return ((!o || !c) ? "Closed" : `${moment(o).format(format)} - ${moment(c).format(format)}`);
};

const OpeningHourLine = ({ dow, o, c, order }) =>
  <div className={styles.hourLine} style={getFlexOrder(order)} key={dow}>
    <span className={styles.dow}>{dow}</span>
    <span className={styles.time}>{mapTimeToString(o, c)}</span>
  </div>;

const OpeningHours = ({ hours, note }) => (
  <div className={styles.container}>
    <SectionTitle title="Opening hours" />
    <div className={styles.hoursContainer}>
      {compose(
        map(OpeningHourLine),
        reduce((sum, next) => [...sum, { ...hours[next], ...mapIntegerToDOW(next) }], []),
        sortBy(i => i),
        keys,
      )(hours)}
    </div>
    <div className={styles.hourNoteContainer}>
      {note}
    </div>
  </div>
);
OpeningHourLine.propTypes = {
  order: PropTypes.string.isRequired,
  dow: PropTypes.string.isRequired,
  o: PropTypes.string,
  c: PropTypes.string,
};
OpeningHours.propTypes = {
  hours: hoursPropType,
  note: PropTypes.string,
};

export default OpeningHours;
