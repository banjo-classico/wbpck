import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { actions } from "../../actions/actions";
import { actions as filterActions } from "../../actions/filterActions";
import { actions as pageActions } from "../../actions/pageActions";
import MonthPicker from "../MonthPicker";
import TimeOfDayPicker from "../TimeOfDayPicker";
import Calendar from "../calendar";
import styles from "./datePicker.css";

class DatePicker extends Component {
  static propTypes = {
    selectedDate: PropTypes.instanceOf(moment).isRequired,
    maxDays: PropTypes.number.isRequired,
    practiceId: PropTypes.string.isRequired,
    selectDay: PropTypes.func.isRequired,
    currentFilter: PropTypes.string.isRequired,
    practiceUrlName: PropTypes.string.isRequired,
    hasMorningAppointments: PropTypes.bool.isRequired,
    hasAfternoonAppointments: PropTypes.bool.isRequired,
    hasEveningAppointments: PropTypes.bool.isRequired,
    filterMorning: PropTypes.func.isRequired,
    filterAfternoon: PropTypes.func.isRequired,
    filterEvening: PropTypes.func.isRequired,
    setDateTimePickerIsShowing: PropTypes.func.isRequired,
    dateTimePickerIsShowing: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.toggleShown = this.toggleShown.bind(this);
    this.onMonthChanged = this.onMonthChanged.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.filterDate = this.filterDate.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  state = {
    timesToRun: 0,
    fnToRun: () => {},
  };
  componentDidMount() {
    this.onClick(moment());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      // this.calendar.scrollTo(nextProps.selectedDate);
    }
  }
  onClick(date) {
    return this.props.selectDay(this.props.practiceUrlName, date.toDate(), "first", "flu");
  }
  onMonthChanged(numMonthsChanged) {
    const numTimesRun = Math.abs(numMonthsChanged);
    const getFunctionToRun = () => {
      if (numMonthsChanged > 0) {
        return this.datepicker.refs.calendar.refs.instance.increaseMonth;
      } else if (numMonthsChanged < 0) {
        return this.datepicker.refs.calendar.refs.instance.decreaseMonth;
      }
      return () => {};
    };
    this.setState({
      timesToRun: numTimesRun,
      fnToRun: getFunctionToRun(),
    }, this.changeMonth);
  }
  changeMonth() {
    if (this.state.timesToRun > 0) {
      this.state.fnToRun();
      this.setState({ timesToRun: this.state.timesToRun - 1 });
    }
  }
  toggleShown() {
    this.props.setDateTimePickerIsShowing(!this.props.dateTimePickerIsShowing);
    if (!this.props.dateTimePickerIsShowing) {
      // this.calendar.scrollTo(this.props.selectedDate);
    }
  }
  selectDate(date) {
    this.onClick(date);
    this.toggleShown();
    // this.setState({ shown: false }, () => this.calendar.scrollTo(date));
  }
  filterDate(date) {
    return date.isSameOrAfter(moment(), "days") &&
      date.isSameOrBefore(moment().add(this.props.maxDays, "days"), "days");
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        className={styles.container}
        component="div"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
      >
        <MonthPicker
          onClick={this.toggleShown}
          isShown={this.props.dateTimePickerIsShowing}
          selectedDate={this.props.selectedDate}
          onMonthChanged={this.onMonthChanged}
          maxDays={this.props.maxDays}
        />
        {
          this.props.dateTimePickerIsShowing ?
            <div className={styles.datepickerContainer} key="1">
              <ReactDatePicker
                ref={c => { this.datepicker = c; }}
                inline
                onMonthChange={this.changeMonth}
                onChange={this.selectDate}
                selected={this.props.selectedDate}
                filterDate={this.filterDate}
                highlightDates={[
                  moment(this.props.selectedDate).add(1, "days"),
                  moment(this.props.selectedDate).add(2, "days"),
                  moment(this.props.selectedDate).add(3, "days"),
                  moment(this.props.selectedDate).add(4, "days"),
                ]}
              />
            </div> :
            <div className={styles.calendarContainer} key="2">
              <Calendar
                ref={c => { this.calendar = c; }}
                maxDays={this.props.maxDays}
                onClick={(date) => () => this.onClick(date)}
                selectedDate={this.props.selectedDate}
              />
              <TimeOfDayPicker
                currentFilter={this.props.currentFilter}
                morningDisabled={!this.props.hasMorningAppointments}
                afternoonDisabled={!this.props.hasAfternoonAppointments}
                eveningDisabled={!this.props.hasEveningAppointments}
                onMorningClick={this.props.filterMorning}
                onAfterNoonClick={this.props.filterAfternoon}
                onEveningClick={this.props.filterEvening}
              />
            </div>
        }
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  practiceId: state.practiceAppointmentReducer.practiceInfo.practice.Id,
  selectedDate: moment(state.practiceAppointmentReducer.selectedDay),
  maxDays: state.practiceAppointmentReducer.practiceInfo.practice.MaxDays || 0,
  currentFilter: state.practiceAppointmentReducer.currentFilter,
  hasMorningAppointments: state.practiceAppointmentReducer.days.first.hasMorningAppointments,
  hasAfternoonAppointments: state.practiceAppointmentReducer.days.first.hasAfternoonAppointments,
  hasEveningAppointments: state.practiceAppointmentReducer.days.first.hasEveningAppointments,
  dateTimePickerIsShowing: state.practiceBookingPageReducer.dateTimePickerIsShowing,
});

const mapDispatchToProps = (dispatch) => ({
  filterMorning: bindActionCreators(filterActions.filterMorning, dispatch),
  filterAfternoon: bindActionCreators(filterActions.filterAfternoon, dispatch),
  filterEvening: bindActionCreators(filterActions.filterEvening, dispatch),
  selectDay: bindActionCreators(actions.selectDay, dispatch),
  setDateTimePickerIsShowing: bindActionCreators(pageActions.setDateTimePickerIsShowing, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
export {
  styles,
  // for testing, can't rewire connect
  DatePicker,
};
