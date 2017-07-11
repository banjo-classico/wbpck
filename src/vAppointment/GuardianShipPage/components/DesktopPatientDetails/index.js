import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import FormTitle from "../FormTitle";
import InputWithError from "../../../../components/inputError";
import { isValidName, isValidBasicInfo } from "../../../../libs/ValidBasicInfo";
import { isValidDate, getErrorMessage } from "../../../../libs/Dates";
import { patientPropType } from "../../propTypes";
import styles from "./desktopPatientDetails.css";

class DesktopPatientDetails extends Component {
  static propTypes = {
    details: patientPropType.isRequired,
    onClick: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    onlyUnderAge: PropTypes.bool,
    allowUnderage: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidFirstName = this.isValidFirstName.bind(this);
    this.isValidLastName = this.isValidLastName.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.clearNameError = this.clearNameError.bind(this);
    this.clearSurnameError = this.clearSurnameError.bind(this);
    this.clearBirthdayError = this.clearBirthdayError.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  state = {
    nameError: null,
    surnameError: null,
    birthdayError: null,
  }
  isValid() {
    return isValidBasicInfo(
      this.props.details.name || "",
      this.props.details.surname || "",
      this.props.details.birthday || "",
      this.props.details.phone || "",
      this.props.allowUnderage,
      this.props.onlyUnderAge,
      true, // nameRequired,
      true, // surnameRequired,
      true, // birthdayRequired,
      false, //phoneRequired
    );
  }
  isValidDate() {
    return isValidDate(
      this.props.details.birthday,
      this.props.allowUnderage,
      this.props.onlyUnderAge,
      true,
    );
  }
  isValidFirstName() {
    return isValidName(this.props.details.name, true);
  }
  isValidLastName() {
    return isValidName(this.props.details.surname, true);
  }
  clearNameError() {
    this.setState({ nameError: null });
  }
  clearSurnameError() {
    this.setState({ surnameError: null });
  }
  clearBirthdayError() {
    this.setState({ birthdayError: null });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.isValidFirstName()) {
      this.setState({ nameError: "Invalid First Name." });
    } else if (!this.isValidLastName()) {
      this.setState({ surnameError: "Invalid Last Name." });
    } else if (!this.isValidDate()) {
      this.setState({
        birthdayError: getErrorMessage(this.props.details.birthday, this.props.onlyUnderAge),
      });
    } else {
      if (this.props.submit) {
        this.props.submit(
        this.props.details.name,
        this.props.details.surname,
        this.props.details.birthday
      );
      }
      return true;
    }
    return false;
  }
  render() {
    return (
      <div className={styles.container} ref={c => { this.form = c; }} onClick={this.props.onClick}>
        <FormTitle title="Patient Details" isValid={this.isValid()} />
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.nameContainer}>
            <InputWithError
              required
              readOnly
              className={styles.firstName}
              value={this.props.details.name}
              onErrorClick={this.clearNameError}
              isError={this.state.nameError}
              errorMessage={this.state.nameError}
            />
            <InputWithError
              required
              readOnly
              className={styles.surname}
              value={this.props.details.surname}
              onErrorClick={this.clearSurnameError}
              isError={this.state.surnameError}
              errorMessage={this.state.surnameError}
            />
          </div>
          <div className={styles.birthdayContainer}>
            <InputWithError
              required
              readOnly
              className={styles.birthday}
              value={moment(this.props.details.birthday, "YYYY-MM-DD").format("DD / MM / YYYY")}
              onErrorClick={this.clearBirthdayError}
              isError={this.state.birthdayError}
              errorMessage={this.state.birthdayError}
            />
          </div>
        </form>
      </div>
    );
  }
}


export default DesktopPatientDetails;
