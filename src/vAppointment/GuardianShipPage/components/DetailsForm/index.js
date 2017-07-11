import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./detailsForm.css";
import FormTitle from "../FormTitle";
import BasicInfoForm from "../../../../components/BasicInfoForm";
import { isValidBasicInfo } from "../../../../libs/ValidBasicInfo";
import { patientPropType } from "../../propTypes";

class DetailsForm extends Component {
  static propTypes = {
    details: patientPropType.isRequired,
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    nameRequired: PropTypes.bool,
    surnameRequired: PropTypes.bool,
    birthdayRequired: PropTypes.bool,
    phoneRequired: PropTypes.bool,
    onlyUnderAge: PropTypes.bool,
    allowUnderage: PropTypes.bool,
    onValid: PropTypes.func,
    isValid: PropTypes.bool,
  }
  static defaultProps = {
    nameRequired: true,
    surnameRequired: true,
    birthdayRequired: true,
    phoneRequired: true,
  }
  constructor(props) {
    super(props);
    this.isValid = this.isValid.bind(this);
    this.update = this.update.bind(this);
  }
  isValid() {
    return this.form ?
      this.form.validateForm() :
      isValidBasicInfo(
        this.props.details.name || "",
        this.props.details.surname || "",
        this.props.details.birthday || "",
        this.props.details.phone || "",
        this.props.allowUnderage,
        this.props.onlyUnderAge,
        this.props.nameRequired,
        this.props.surnameRequired,
        this.props.birthdayRequired,
        this.props.phoneRequired
      );
  }
  update() {
    this.forceUpdate();
  }
// TODO:   fix state changes requiring force update
  render() {
    return (
      <div className={classnames(styles.form, { [styles.shadow]: !this.props.isValid })}>
        <FormTitle title={this.props.title} isValid={this.props.isValid} />
        <BasicInfoForm
          ref={c => { this.form = c; }}
          onStateChange={this.update}
          firstName={this.props.details.name}
          lastName={this.props.details.surname}
          birthday={this.props.details.birthday}
          phone={this.props.details.phone}
          submit={this.props.onSubmit}
          onlyUnderAge={this.props.onlyUnderAge}
          allowUnderage={this.props.allowUnderage}
          firstNameRequired={this.props.nameRequired}
          lastNameRequired={this.props.surnameRequired}
          birthdayRequired={this.props.birthdayRequired}
          phoneRequired={this.props.phoneRequired}
          onValid={this.props.onValid}
        />
      </div>
    );
  }
}

export default DetailsForm;
