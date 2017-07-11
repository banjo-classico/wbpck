import React, { Component } from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";

import Arrow from "../../../../svgs/rightarrow.svg";
import styles from "./relationshipSelector.css";

const getOptionNum = (option) => {
  if (option === "Family") return 1;
  if (option === "Friend") return 2;
  if (option === "Other") return 3;
  return 0;
};
const convertToString = (num) => {
  if (num === -1) return "Please indicate the dependant's relationship to you.";
  if (num === 1) return "Family";
  if (num === 2) return "Friend";
  if (num === 3) return "Other";
  return "";
};

class RelationshipSelector extends Component {
  static propTypes = {
    relationship: PropTypes.number.isRequired,
    setRelationship: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }
  state = {
    displayedWord: convertToString(this.props.relationship),
    error: false,
    showOptions: false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.relationship === -1) {
      this.setState({ displayedWord: convertToString(nextProps.relationship), error: true });
    }
  }
  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }
  handleOptionClick(option) {
    this.toggleOptions();
    this.setState({ displayedWord: option, error: false });
    this.props.setRelationship(getOptionNum(option));
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
        <div className={classnames(styles.currentContainer, { [styles.error]: this.state.error })}>
          <div>{this.state.displayedWord}</div>
          <Arrow className={styles.arrow} />
        </div>
        {this.state.showOptions ?
          <div className={styles.options}>
            {map(option => <button
              type="button"
              key={option}
              onClick={() => this.handleOptionClick(option)}
              label={option}
              className={styles.option}
            >{option}</button>)(["Family", "Friend", "Other"])}
          </div>
          : null
        }
      </ReactCSSTransitionGroup>
    );
  }
}

export default RelationshipSelector;
