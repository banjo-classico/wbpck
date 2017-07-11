import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import { times } from "lodash/fp";
import moment from "moment";

import Arrow from "../../../../svgs/rightarrow.svg";
import HoverButton from "../HoverButton";
import styles from "./dateFilter.css";


const getNumDisplayMonths = (sourceMonth, destinationMonth) => {
  if (sourceMonth <= destinationMonth) {
    return (destinationMonth - sourceMonth) + 1;
  }
  return (13 - sourceMonth) + destinationMonth;
};

class DateFilter extends Component {
  static propTypes = {
    setMainDay: PropTypes.func.isRequired,
    maxDays: PropTypes.number,
    selectedDay: PropTypes.instanceOf(Date),
  }
  constructor(props) {
    super(props);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }
  state = {
    currentFilter: "Next five days",
    showOptions: false,
  }
  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }
  handleOptionClick(option) {
    if (option === "Next five days") {
      this.props.setMainDay(moment());
      this.setState({ currentFilter: option });
    }
    this.toggleOptions();
  }
  handleDateClick(date) {
    this.toggleOptions();
    this.setState({ currentFilter: moment(date).format("MMMM YYYY") });
  }
  render() {
    const currentMonth = moment().month();
    const maxMonth = moment().add(this.props.maxDays, "days").month();
    return (
      <ReactCSSTransitionGroup
        component="div"
        className={classnames(styles.container, { [styles.shown]: this.state.showOptions })}
        onClick={this.toggleOptions}
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div className={styles.currentContainer}>
          <div>{this.state.currentFilter}</div>
          <Arrow className={styles.arrow} />
        </div>
        {this.state.showOptions ?
          <div className={styles.options}>
            {this.state.currentFilter !== "Next five days" ?
              <HoverButton
                styles={styles.option}
                hoveredStyles={styles.optionHovered}
                onClick={() => this.handleOptionClick("Next five days")}
                label="Next five days"
              /> : null
          }
            {
            times(i =>
              <HoverButton
                styles={styles.option}
                hoveredStyles={styles.optionHovered}
                onClick={
                  () => this.handleOptionClick(moment().add(i, "months").format("MMMM YYYY"))
                }
                handleDateClick={(date) => this.handleDateClick(date)}
                key={i}
                label={moment().add(i, "months").format("MMMM YYYY")}
                selectedDay={moment(this.props.selectedDay)}
                maxDays={this.props.maxDays}
                datePicker
                monthIndex={i}
                setMainDay={this.props.setMainDay}
              />
            )(getNumDisplayMonths(currentMonth, maxMonth))
          }
          </div>
          : null
        }
      </ReactCSSTransitionGroup>
    );
  }
}

export default DateFilter;
// for Testing
export {
  getNumDisplayMonths,
};
