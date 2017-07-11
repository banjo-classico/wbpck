import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import ScrollingInput from "../scrollingInput";
import CtaButton from "../../../../components/CtaButton";
import styles from "./dateOfBirth.css";
import {
  getMoment,
  isValidDate,
  getErrorMessage,
  dateBlurOutput,
} from "../../../../libs/Dates";

class DateOfBirth extends Component {
  static propTypes = {
    setDateOfBirth: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    dateOfBirth: PropTypes.instanceOf(Date),
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updateDateOfBirth = this.updateDateOfBirth.bind(this);
  }
  state = {
    dob: this.props.dateOfBirth,
  }
  updateDateOfBirth(dob) {
    this.setState({ dob });
  }
  handleClick() {
    if (isValidDate(dateBlurOutput(this.state.dob))) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <ScrollingInput
            date
            onChange={this.updateDateOfBirth}
            defaultValue={
              this.props.dateOfBirth ?
              moment(this.props.dateOfBirth).format("DD-MM-YYYY") : ""
            }
            mapBlurError={d => d || "Invalid date"}
            generateErrorLabel={getErrorMessage}
            generateLabel={
              () =>
                <span>
                  When is your birthday?
                  <span style={{ fontSize: "13px", marginLeft: "5px" }}>(DD-MM-YYYY)</span>
                </span>
              }
            mapValue={getMoment}
            onSuccess={this.props.setDateOfBirth}
            valueIsValid={isValidDate}
          />
        </div>
        <CtaButton className={styles.button} white onClick={this.handleClick} />
      </div>
    );
  }
}


export default DateOfBirth;
