import React from "react";
import PropTypes from "prop-types";

import BasicInfoForm from "../../../../components/BasicInfoForm";
import { isDesktop } from "../../../../config";
import CtaButton from "../../../../components/CtaButton";
import styles from "./guardianDetailsForm.css";

class GuardianDetailsForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }
  state = {
    valid: false,
  }
  isValid = (boolean) => {
    this.setState({ valid: boolean });
  }
  render() {
    const { onSubmit, onCancel } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.heading}>Guardian details</div>
        <div className={styles.subheading}>Fill in with your details</div>
        <BasicInfoForm
          onValid={this.isValid}
          submit={onSubmit}
          buttons={
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button>
              {isDesktop() ?
                <button type="submit" className={styles.add}>Next</button>
          :
                <CtaButton
                  type="submit"
                  active={this.state.valid}
                />
        }
            </div>
      }
        />
      </div>
    );
  }
}


export default GuardianDetailsForm;
