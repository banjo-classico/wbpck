import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import { compose, map, filter, concat } from "lodash/fp";

import Arrow from "../../../../svgs/rightarrow.svg";
import HoverButton from "../../filterComponents/HoverButton";
import { doctorProfilePropType } from "../../propTypes";
import styles from "./doctorSelector.css";

const getOptions = (current, doctors) => {
  const optionsArray = compose(
    concat([{ name: "Any Doctor", id: 0 }]),
    map(d => ({ name: d.Name, id: d.PmsUserId }))
  )(doctors);
  return filter(option => option.name !== current)(optionsArray);
};

class DoctorSelector extends Component {
  static propTypes = {
    doctors: PropTypes.arrayOf(doctorProfilePropType).isRequired,
  }
  constructor(props) {
    super(props);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }
  state = {
    currentFilter: "Any Practitioner",
    showOptions: false,
  }
  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }
  handleOptionClick(option) {
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
              key={option.id}
              onClick={() => this.handleOptionClick(option.name)}
              label={option.name}
              styles={styles.option}
              hoveredStyles={styles.optionHovered}
            />, getOptions(this.state.currentFilter, this.props.doctors))}
          </div>
          : null
        }
      </ReactCSSTransitionGroup>
    );
  }
}

export default DoctorSelector;
// for Testing
export {
  getOptions,
};
