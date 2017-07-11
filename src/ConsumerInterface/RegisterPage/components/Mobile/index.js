import React, { Component } from "react";
import PropTypes from "prop-types";
import isMobilePhone from "validator/lib/isMobilePhone";

import ScrollingInput from "../scrollingInput";
import CtaButton from "../../../../components/CtaButton";
import styles from "./mobile.css";

class Mobile extends Component {
  static propTypes = {
    setMobile: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    mobile: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updateMobile = this.updateMobile.bind(this);
  }
  state = {
    mobile: this.props.mobile,
  }
  updateMobile(mobile) {
    this.setState({ mobile });
  }
  handleClick() {
    if (isMobilePhone(this.state.mobile, "en-NZ")) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <ScrollingInput
          onChange={this.updateMobile}
          generateLabel={() => "Mobile"}
          generateErrorLabel={() => "Please enter a valid NZ mobile number"}
          onSuccess={this.props.setMobile}
          valueIsValid={e => isMobilePhone(e, "en-NZ")}
          defaultValue={this.props.mobile}
        />
        <CtaButton className={styles.button} white onClick={this.handleClick} />
      </div>
    );
  }
}


export default Mobile;
