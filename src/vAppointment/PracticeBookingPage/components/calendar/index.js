import React, { Component, PropTypes } from "react";
import { times, find } from "lodash/fp";
import moment from "moment";
import classnames from "classnames";

import styles from "./calendar.css";

class Calendar extends Component {
  componentDidMount() {
    if (this.container) this.scrollTo(this.props.selectedDate);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      this.scrollTo(nextProps.selectedDate);
    }
  }
  scrollTo(date) {
    const childElement = find(child =>
      date.isSame(moment(child.id, "DD/MM/YYYY"), "day"), this.container.children);
    this.container.scrollLeft = childElement ?
      childElement.offsetLeft - ((this.container.offsetWidth - childElement.offsetWidth) / 2) :
      0;
  }
  render() {
    return (
      <div
        className={styles.container}
        ref={c => { this.container = c; }}
      >
        {times(d => {
          const date = moment().add(d, "days");
          return (<button
            id={date.format("DD/MM/YYYY")}
            key={date}
            className={classnames(
              styles.item,
              { [styles.active]: date.isSame(this.props.selectedDate, "days") }
            )}
            onClick={this.props.onClick(date)}
          >
            <div className={styles.format}>
              <div className={styles.date}>{date.format("D")}</div>
              <div className={styles.day}>{date.format("ddd")}</div>
            </div>
          </button>);
        }, this.props.maxDays + 1)}
      </div>
    );
  }
}
Calendar.propTypes = {
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  onClick: PropTypes.func.isRequired,
  maxDays: PropTypes.number.isRequired,
};

export default Calendar;
