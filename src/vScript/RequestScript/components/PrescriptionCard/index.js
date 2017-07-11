import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";

import MainInfo from "../MainInfo";
import Pending from "../Pending";
import Arrow from "../../../../svgs/rightarrow2.svg";
import Ellipsis from "../../../../svgs/ellipsis.svg";
import styles from "./prescriptionCard.css";
import { scriptPropType, detailsPropType } from "../../propTypes";

class PrescriptionCard extends Component {
  static propTypes = {
    fetchScriptDetails: PropTypes.func.isRequired,
    toggleCta: PropTypes.func.isRequired,
    setCtaText: PropTypes.func.isRequired,
    changeCtaFn: PropTypes.func.isRequired,
    goToBooking: PropTypes.func.isRequired,
    toggleStyles: PropTypes.func.isRequired,
    toggleOpenCardState: PropTypes.func.isRequired,
    script: scriptPropType,
    scriptDetails: detailsPropType,
    past: PropTypes.bool,
  }
  state = {
    isOpen: false,
  }
  toggleCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.toggleOpenCardState();
    this.props.toggleStyles(!this.state.isOpen);
    this.props.setCtaText("Request Prescription");
    this.props.toggleCta();
  }
  handleCardClick = () => {
    if (!this.state.isOpen) {
      this.toggleCard();
      this.props.fetchScriptDetails(this.props.script.Id);
      if (this.props.script.Status === "Denied") {
        this.props.changeCtaFn(this.props.goToBooking(this.props.script.PracticeId));
        this.props.setCtaText("New Appointment");
      }
    }
  }
  render() {
    const { script, past, scriptDetails } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        className={classnames(
          styles.outerContainer,
          { [styles.open]: isOpen },
          { [styles.pastOuter]: past && !isOpen },
        )}
      >
        {
          isOpen &&
            <div className={styles.openHeader}>
              <Arrow onClick={this.toggleCard} className={styles.arrow} />
              <div className={styles.headerInner}>
                <div>
                  {`Requested on: ${moment(this.props.script.DateTime).format("DD/MM/YY")}`}
                </div>
                <Ellipsis className={styles.ellipsis} />
              </div>
            </div>
        }
        <div
          className={classnames(
            { [styles.container]: !isOpen },
            { [styles.pastContainer]: past && !isOpen },
            { [styles.openContainer]: isOpen }
          )}
          onClick={this.handleCardClick}
        >
          {
            (!past || isOpen) &&
              <Pending
                status={script.Status}
                isRed={script.IsRed}
                details={{ ...scriptDetails, OrganisationName: script.OrganisationName }}
                isOpen={isOpen}
              />
          }
          <MainInfo script={{ ...script, ...scriptDetails }} isOpen={isOpen} past={past} />
        </div>
      </div>
    );
  }
}

export default PrescriptionCard;
