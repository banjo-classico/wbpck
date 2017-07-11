import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";

import AppointmentMain from "../AppointmentMain";
import AppointmentExtra from "../AppointmentExtra";
import AddToCalendar from "../AddToCalendar";
import Deleter from "../../../Deleter";
import CancelationDetails from "../CancelationDetails";
import Arrow from "../../../../svgs/rightarrow2.svg";
import AddCalendarIcon from "../../../../svgs/addCalendar.svg";
import PlusIcon from "../../../../svgs/plus.svg";
import { appointmentPropType } from "../../propTypes";
import { isSaf } from "../../../../libs/BrowserDetection";
import styles from "./appointmentCard.css";

const getStyleColor = (label, past) => {
  if (past) return "#DADADA";
  if (label === "CONFIRMED") return "#64E691";
  if (label === "CANCELED") return "#FF6A65";
  return "#33CCCC";
};

class AppointmentCard extends Component {
  static propTypes = {
    appointment: appointmentPropType.isRequired,
    changeCtaIcon: PropTypes.func.isRequired,
    changeCtaFn: PropTypes.func.isRequired,
    toggleCta: PropTypes.func.isRequired,
    toggleOpenCardState: PropTypes.func.isRequired,
    toggleStyles: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    goToAddDependant: PropTypes.func,
    preLoadDependant: PropTypes.func.isRequired,
    toggleDeleter: PropTypes.func,
    cancelAppointment: PropTypes.func,
    checkAbleToCancel: PropTypes.func,
    past: PropTypes.bool,
    openDeleter: PropTypes.bool,
    nonClickable: PropTypes.bool,
  }
  state = {
    isOpen: false,
    showCalendarMenu: false,
  }
  toggleCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.toggleStyles(!this.state.isOpen);
    this.props.toggleOpenCardState();
    if (this.props.appointment.Status === "CANCELED" || this.props.past) {
      this.props.toggleCta();
    }
    if (!this.state.isOpen) {
      this.props.changeCtaFn(this.toggleMenu);
      this.props.changeCtaIcon(AddCalendarIcon);
    }
  }
  toggleDeleter = () => {
    this.props.toggleDeleter();
    this.props.toggleCta();
  }
  changeIcon = () => {
    if (this.state.showCalendarMenu) {
      this.props.changeCtaIcon(PlusIcon);
    } else {
      this.props.changeCtaIcon(AddCalendarIcon);
    }
  }
  toggleMenu = () => {
    this.setState({ showCalendarMenu: !this.state.showCalendarMenu }, this.changeIcon);
  }
  handleCancel = (reason) => {
    this.props.checkAbleToCancel(this.props.appointment.SessionId, reason);
  }
  render() {
    const color = getStyleColor(this.props.appointment.Status, this.props.past);
    const lineStyles = !this.props.past ? { borderTop: `3px solid ${color}` } : null;
    // eslint-disable-next-line max-len//
    const isUser = this.props.userName ===
      `${this.props.appointment.FirstName} ${this.props.appointment.LastName}`;
    const isDependant = !!(isUser || this.props.appointment.DependantId);
    return (
      <div
        className={classnames(
        styles.outerContainer,
        { [styles.open]: this.state.isOpen },
        { [styles.pastContainer]: this.props.past && !this.state.isOpen },
        { [styles.safari]: isSaf() && this.state.isOpen },
      )}
      >
        {this.state.isOpen ?
          <div className={styles.openHeader}>
            <Arrow onClick={this.toggleCard} className={styles.arrow} />
            <div>{moment(this.props.appointment.Time).format("dddd, DD MMM h:mmA")}</div>
          </div> : null
        }
        <div className={classnames({ [styles.container]: this.state.isOpen })}>
          <div
            ref={c => { this.card = c; }}
            onClick={this.state.isOpen || this.props.nonClickable ? () => {} : this.toggleCard}
            className={classnames(
              styles.innerContainer,
              { [styles.openCard]: this.state.isOpen },
              { [styles.noBoxShadow]: this.props.past && !this.state.isOpen },
            )}
          >
            <div
              className={classnames(
                styles.card, { [styles.pastCard]: this.props.past && !this.state.isOpen }
              )}
              style={lineStyles}
            >
              {this.props.past && !this.state.isOpen ? null :
              <div className={styles.label} style={{ backgroundColor: color }}>
                {this.props.appointment.Status}
              </div>}
              <AppointmentMain
                appointment={this.props.appointment}
                isClosed={!this.state.isOpen}
                past={this.props.past}
              />
              {
              this.state.isOpen ?
                <AppointmentExtra
                  appointment={this.props.appointment}
                  toggleDeleter={this.toggleDeleter}
                  goToAddDependant={this.props.goToAddDependant}
                  preLoadDependant={this.props.preLoadDependant}
                  past={this.props.past}
                  isDependant={isDependant}
                /> : null
            }
            </div>
          </div>
        </div>
        <AddToCalendar
          appointment={this.props.appointment}
          toggleMenu={this.toggleMenu}
          show={this.state.showCalendarMenu}
        />
        {
          this.props.openDeleter && this.state.isOpen &&
            <Deleter
              headerText="cancel this appointment?"
              headerFn={this.toggleDeleter}
              secondaryCtaFn={this.toggleDeleter}
              secondaryCtaText="No, I don't want to cancel this appointment."
              includeReason
              ctaFn={this.handleCancel}
              policyFn={
                (reason) => this.props.cancelAppointment(this.props.appointment.SessionId, reason)
              }
              practiceName={this.props.appointment.PracticeName}
              detailsComponent={<CancelationDetails appointment={this.props.appointment} />}
            />
      }
      </div>
    );
  }
}

export default AppointmentCard;
