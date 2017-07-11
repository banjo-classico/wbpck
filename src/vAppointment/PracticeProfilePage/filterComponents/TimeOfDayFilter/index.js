import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import { map, filter } from "lodash/fp";

import Arrow from "../../../../svgs/rightarrow.svg";
import HoverButton from "../HoverButton";
import styles from "./timeOfDayFilter.css";

const getOptions = (current) => {
  const optionsArray = ["Anytime", "Morning", "Afternoon", "Evening"];
  return filter(option => option !== current)(optionsArray);
};

class TimeOfDayFilter extends Component {
  static propTypes = {
    currentFilter: PropTypes.string.isRequired,
    filterMorning: PropTypes.func.isRequired,
    filterAfternoon: PropTypes.func.isRequired,
    filterEvening: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }
  state = {
    currentFilter: "Anytime",
    showOptions: false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentFilter !== this.props.currentFilter) {
      this.setState({ currentFilter: nextProps.currentFilter });
    }
  }
  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }
  handleOptionClick(option) {
    if (option !== "Anytime") this.props[`filter${option}`]();
    else this.props.filterMorning();
    this.toggleOptions();
    this.setState({ currentFilter: option });
  }
  render() {
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
          <div>{this.state.currentFilter.toLowerCase()}</div>
          <Arrow className={styles.arrow} />
        </div>
        {this.state.showOptions ?
          <div className={styles.options}>
            {map(option => <HoverButton
              key={option}
              onClick={() => this.handleOptionClick(option)}
              label={option}
              styles={styles.option}
              hoveredStyles={styles.optionHovered}
            />, getOptions(this.state.currentFilter))}
          </div>
          : null
        }
      </ReactCSSTransitionGroup>
    );
  }
}


export default TimeOfDayFilter;
// for testing
export {
  getOptions,
};
