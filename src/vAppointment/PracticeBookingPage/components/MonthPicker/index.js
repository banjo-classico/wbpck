import React, { Component } from "react";
import PropTypes from "prop-types";
import { times } from "lodash/fp";
import moment from "moment";
import classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import CalendarIcon from "../../../../svgs/calendar.svg";
import styles from "./monthPicker.css";

const getNumDisplayMonths = (sourceMonth, destinationMonth) => {
  if (sourceMonth <= destinationMonth) {
    return (destinationMonth - sourceMonth) + 1;
  }
  return (13 - sourceMonth) + destinationMonth;
};

const getNumMonthsToMove = (sourceMoment, destinationMoment) => {
  if (destinationMoment.year() === sourceMoment.year()) {
    return destinationMoment.month() - sourceMoment.month();
  } else if (destinationMoment.year() > sourceMoment.year()) {
    return (12 - sourceMoment.month()) + destinationMoment.month();
  }
  return -(sourceMoment.month() + (12 - destinationMoment.month()));
};

class MonthPicker extends Component {
  static propTypes = {
    onMonthChanged: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    isShown: PropTypes.bool.isRequired,
    selectedDate: PropTypes.instanceOf(moment).isRequired,
    maxDays: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.onMonthClicked = this.onMonthClicked.bind(this);
  }
  state = {
    currentMonth: moment(),
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isShown) this.setState({ currentMonth: nextProps.selectedDate });
  }
  onMonthClicked(clickedMonth) {
    return () => {
      if (clickedMonth.month() === this.state.currentMonth.month()) {
        this.props.onClick();
      } else {
        this.props.onMonthChanged(getNumMonthsToMove(this.state.currentMonth, clickedMonth));
        this.setState({ currentMonth: clickedMonth });
      }
    };
  }
  render() {
    const currentMonth = moment().month();
    const maxMonth = moment().add(this.props.maxDays, "days").month();
    return (
      <div className={styles.outer}>
        <div className={styles.container}>
          <ReactCSSTransitionGroup
            className={classnames(styles.months, { [styles.centre]: this.props.isShown })}
            component="div"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionName={{
              enter: styles.enter,
              enterActive: styles.enterActive,
              leave: styles.leave,
              leaveActive: styles.leaveActive,
            }}
          >
            {
              this.props.isShown ?
              times(e =>
                <span
                  className={classnames(styles.month, {
                    [styles.selected]:
                      this.state.currentMonth.month() === moment().add(e, "months").month(),
                  })}
                  onClick={this.onMonthClicked(moment().add(e, "months"))}
                  key={e}
                >
                  {moment().add(e, "months").format("MMMM")}
                </span>
              )(getNumDisplayMonths(currentMonth, maxMonth)) :
              <span
                className={classnames(styles.month, styles.bright)}
                onClick={this.props.onClick}
                key={0}
              >
                {this.props.selectedDate.format("MMMM")}
              </span>
            }
          </ReactCSSTransitionGroup>
          <a onClick={this.props.onClick}><CalendarIcon className={styles.icon} /></a>
        </div>
      </div>
    );
  }
}


export default MonthPicker;
