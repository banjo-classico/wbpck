import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

import styles from "./hoverButton.css";

class HoverButton extends Component {
  static propTypes = {
    styles: PropTypes.string.isRequired,
    hoveredStyles: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    selectedDay: PropTypes.instanceOf(moment),
    handleDateClick: PropTypes.func,
    datePicker: PropTypes.bool,
    maxDays: PropTypes.number,
    monthIndex: PropTypes.number,
    setMainDay: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.filterDate = this.filterDate.bind(this);
    this.increaseMonth = this.increaseMonth.bind(this);
  }
  state = {
    isHovered: false,
    timesToRun: this.props.monthIndex,
  }
  increaseMonth() {
    if (this.state.timesToRun > 0) {
      this.datepicker.refs.calendar.refs.instance.increaseMonth();
      this.setState({ timesToRun: this.state.timesToRun - 1 });
    }
  }
  changeMonth() {
    this.datepicker.refs.calendar.refs.instance.changeMonth("July");
  }
  handleMouseEnter() {
    this.setState({ isHovered: true }, this.increaseMonth);
  }
  handleMouseLeave() {
    this.setState({ isHovered: false });
    this.setState({ timesToRun: this.props.monthIndex });
  }
  filterDate(date) {
    return date.isSameOrAfter(moment(), "days") &&
      date.isSameOrBefore(moment().add(this.props.maxDays, "days"), "days");
  }
  handleDateClick(date) {
    this.props.handleDateClick(date);
    this.props.setMainDay(date);
  }
  render() {
    return (
      <button
        className={classnames(
          styles.container, this.props.styles,
          { [this.props.hoveredStyles]: this.state.isHovered }
        )}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.props.onClick}
      >
        <div>
          {this.props.label}
        </div>
        {
          this.state.isHovered && this.props.datePicker ?
            <ReactDatePicker
              ref={c => { this.datepicker = c; }}
              inline
              onChange={this.handleDateClick}
              onMonthChange={this.increaseMonth}
              selected={this.props.monthIndex === 0 ? moment(this.props.selectedDay) : null}
              filterDate={this.filterDate}
            /> : null
        }
      </button>
    );
  }
}

export default HoverButton;
