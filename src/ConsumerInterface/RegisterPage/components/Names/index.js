import React, { Component } from "react";
import PropTypes from "prop-types";

import ScrollingInput from "../scrollingInput";
import CtaButton from "../../../../components/CtaButton";
import styles from "./names.css";

class Names extends Component {
  static propTypes = {
    setFirstName: PropTypes.func.isRequired,
    setSurname: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    setHeaderText: PropTypes.func.isRequired,
    surname: PropTypes.string,
    firstName: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateSurname = this.updateSurname.bind(this);
  }
  state = {
    firstName: this.props.firstName,
    surname: this.props.surname,
  }
  componentWillMount() {
    this.props.setHeaderText();
  }
  updateFirstName(firstName) {
    this.setState({ firstName });
  }
  updateSurname(surname) {
    this.setState({ surname });
  }
  handleClick() {
    if (this.state.firstName.length > 1 && this.state.surname.length > 1) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <ScrollingInput
            onChange={this.updateFirstName}
            generateLabel={() => "First Name"}
            generateErrorLabel={() => "Your first name can not be empty."}
            onSuccess={this.props.setFirstName}
            valueIsValid={e => e.length}
            defaultValue={this.props.firstName}
          />
          <ScrollingInput
            onChange={this.updateSurname}
            defaultValue={this.props.surname}
            generateErrorLabel={() => "Your surname can not be empty."}
            generateLabel={() => "Surname"}
            onSuccess={this.props.setSurname}
            valueIsValid={e => e.length}
          />
        </div>
        <CtaButton className={styles.button} white onClick={this.handleClick} />
      </div>
    );
  }
}

export default Names;
