import React, { Component } from "react";
import PropTypes from "prop-types";
import isMobilePhone from "validator/lib/isMobilePhone";

import CtaButton from "../../../../components/CtaButton";
import InputWithError from "../../../../components/inputError";
import styles from "./addPharmacyForm.css";

class AddPharmacyForm extends Component {
  static propTypes = {
    addPharmacy: PropTypes.func.isRequired,
  }
  state = {
    name: "",
    address: "",
    fax: "",
    phone: "",
    pharmacyNameError: null,
    addressError: null,
    faxError: null,
    phoneError: null,
  }
  clearPharmacyNameError = () => {
    this.setState({ pharmacyNameError: null });
  }
  clearLocationError = () => {
    this.setState({ addressError: null });
  }
  clearFaxError = () => {
    this.setState({ faxError: null });
  }
  clearPhoneError = () => {
    this.setState({ phoneError: null });
  }
  handleChange = (id) => (e) => {
    this.setState({
      error: null,
      [id]: e.target.value,
    });
  }
  formComplete = () => {
    if (!this.isValidPharmacyName()) {
      this.setState({ pharmacyNameError: "Invalid Pharmacy Name." });
    } else if (!this.isValidLocation()) {
      this.setState({ addressError: "Invalid Location" });
    } else if (!this.isValidPhone(this.state.fax, false)) {
      this.setState({ faxError: "Invalid Fax Number" });
    } else if (this.state.phone && !this.isValidPhone(this.state.phone, true)) {
      this.setState({ phoneError: "Invalid Phone Number" });
    } else {
      this.props.addPharmacy({
        Name: this.state.name,
        Address: this.state.address,
        Phone: this.state.phone,
        Fax: this.state.fax,
      });
    }
  }
  isValidPharmacyName = () => this.state.name
  isValidLocation = () => this.state.address
  isValidPhone = (number, allowMobile) => (
    /^(0[93647]{1}[1-9]{1}[0-9]{6,7})$/.test(number.split(" ").join("")) ||
    allowMobile && isMobilePhone(number.split(" ").join(""), "en-NZ")
  )
  render() {
    return (
      <div className={styles.container}>
        <form className={styles.form}>
          <span className={styles.label}>Pharmacy Name</span>
          <InputWithError
            required
            onChange={this.handleChange("name")}
            className={styles.input}
            onFocus={this.clearPharmacyNameError}
            errorMessage={this.state.pharmacyNameError}
            isError={this.state.pharmacyNameError}
            onErrorClick={this.clearPharmacyNameError}
          />
          <span className={styles.label}>Location</span>
          <InputWithError
            required
            onChange={this.handleChange("address")}
            className={styles.input}
            onFocus={this.clearLocationError}
            errorMessage={this.state.addressError}
            isError={this.state.addressError}
            onErrorClick={this.clearLocationError}
          />
          <span className={styles.label}>Fax number</span>
          <InputWithError
            required
            onChange={this.handleChange("fax")}
            className={styles.input}
            onFocus={this.clearFaxError}
            errorMessage={this.state.faxError}
            isError={this.state.faxError}
            onErrorClick={this.clearFaxError}
          />
          <span className={styles.label}>Other Phone Number ( Optional )</span>
          <InputWithError
            onChange={this.handleChange("phone")}
            className={styles.input}
            onFocus={this.clearPhoneError}
            errorMessage={this.state.phoneError}
            isError={this.state.phoneError}
            onErrorClick={this.clearPhoneError}
          />
        </form>
        <div className={styles.buttons}>
          <CtaButton active className={styles.cta} onClick={this.formComplete} />
        </div>
      </div>
    );
  }
}

export default AddPharmacyForm;
export {
  styles,
};
