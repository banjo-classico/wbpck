import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as deleterActions } from "../Deleter/actions/actions";
import { actions as cancelApptActions } from "../Deleter/actions/cancelAppointmentActions";
import { actions as appointmentActions } from "../Appointments/actions/actions";
import FullPagePopUp from "../../components/FullPagePopUp";
import CtaButton from "../../components/CtaButton";
import Header from "./components/Header";
import InfoDisplay from "./components/InfoDisplay";
import Reason from "./components/Reason";
import CancelPolicy from "./components/CancelPolicy";
import CancelNotAllowed from "./components/CancelNotAllowed";
import Checkout from "./components/Checkout";
import Spinner from "../../svgs/spinner.svg";
import styles from "./deleter.css";

class Deleter extends Component {
  static propTypes = {
    ctaFn: PropTypes.func.isRequired,
    secondaryCtaFn: PropTypes.func.isRequired,
    headerFn: PropTypes.func.isRequired,
    clearCancelState: PropTypes.func.isRequired,
    clearCancelCheckState: PropTypes.func.isRequired,
    detailsComponent: PropTypes.node.isRequired,
    secondaryCtaText: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    policyFn: PropTypes.func,
    otherNote: PropTypes.node,
    reason: PropTypes.string,
    cancelNote: PropTypes.string,
    practiceName: PropTypes.string,
    includeReason: PropTypes.bool,
    setReason: PropTypes.func,
    hasReason: PropTypes.bool,
    appointmentIsBusy: PropTypes.bool,
    appointmentError: PropTypes.bool,
    appointmentCancelled: PropTypes.bool,
    isCheckingAbleToCancel: PropTypes.bool,
    isAbleToCancel: PropTypes.bool,
    cancelData: PropTypes.shape({
      Name: PropTypes.string,
      Phone: PropTypes.string,
      CancellationNote: PropTypes.string,
      CancellationHour: PropTypes.number,
    }).isRequired,
  }
  state = {
    redReason: false,
    showCheckout: false,
    showPolicy: false,
    showCancelError: false,
  }
  componentWillMount() {
    this.props.clearCancelState();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAbleToCancel) {
      this.togglePolicy()();
      this.props.clearCancelCheckState();
    }
    if (nextProps.isNotAbleToCancel) {
      this.toggleCancelError()();
      this.props.clearCancelCheckState();
    }
  }
  setRed = (bool) => {
    this.setState({ redReason: bool });
  }
  toggleCheckout = () => {
    this.setState({ showCheckout: !this.state.showCheckout });
  }
  togglePolicy = (withHeader) => () => {
    if (withHeader) {
      this.setState({ showPolicy: !this.state.showPolicy });
      this.props.headerFn();
    } else {
      this.setState({ showPolicy: !this.state.showPolicy });
    }
  }
  toggleCancelError = (withHeader) => () => {
    if (withHeader) {
      this.setState({ showCancelError: !this.state.showCancelError });
      this.props.headerFn();
    } else {
      this.setState({ showCancelError: !this.state.showCancelError });
    }
  }
  handleCtaClick = () => {
    if (this.props.includeReason) {
      if (this.props.hasReason) {
        this.props.ctaFn(this.props.reason);
      } else {
        this.setRed(true);
      }
    } else {
      this.props.ctaFn();
    }
  }
  handleCancel = () => {
    this.props.policyFn(this.props.reason);
    this.togglePolicy()();
    this.toggleCheckout();
  }
  render() {
    return (
      <FullPagePopUp>
        {
          this.props.isCheckingAbleToCancel && <Spinner className={styles.spinner} />
        }
        {
        this.state.showCheckout ?
          <Checkout
            confirmed={this.props.appointmentCancelled}
            error={this.props.appointmentError}
            isBusy={this.props.appointmentIsBusy}
            toggleCheckout={this.toggleCheckout}
          /> :
          <div className={styles.container}>
            <div>
              <Header
                text={this.props.headerText}
                onClick={this.props.headerFn}
              />
              <InfoDisplay details={this.props.detailsComponent} />
              {
              this.props.includeReason &&
                <Reason
                  setReason={this.props.setReason}
                  red={this.state.redReason}
                  setRed={this.setRed}
                />
              }
              {
                this.props.otherNote &&
                  <div className={styles.otherNote}>{this.props.otherNote}</div>
              }
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.secondaryCta} onClick={this.props.secondaryCtaFn}>
                {this.props.secondaryCtaText}
              </button>
              <CtaButton
                onClick={this.handleCtaClick}
                active={this.props.hasReason || !this.props.includeReason}
              />
            </div>
            {
              this.state.showPolicy &&
                <CancelPolicy
                  practiceName={this.props.practiceName}
                  note={this.props.cancelData.CancellationNote}
                  togglePolicy={this.togglePolicy}
                  cancelFn={this.handleCancel}
                />
            }
            {
              this.state.showCancelError &&
                <CancelNotAllowed
                  data={this.props.cancelData}
                  toggleError={this.toggleCancelError(true)}
                />
            }
          </div>
        }
      </FullPagePopUp>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.loginReducer.token,
  reason: state.deletionReducer.reason,
  hasReason: state.deletionReducer.reason.length > 5,
  appointmentCancelled: state.confirmCancellationReducer.cancelled,
  appointmentIsBusy: state.confirmCancellationReducer.isBusy,
  appointmentError: state.confirmCancellationReducer.error || state.submitCancellationReducer.error,
  appointmentCanceled: state.confirmCancellationReducer.cancelled,
  isAbleToCancel: state.submitCancellationReducer.ableToCancel,
  isNotAbleToCancel: state.submitCancellationReducer.ableToCancelError,
  isCheckingAbleToCancel: state.submitCancellationReducer.isChecking,
  cancelData: state.submitCancellationReducer.cancelData,
});
const mapDispatchToProps = (dispatch) => ({
  setReason: bindActionCreators(deleterActions.setReason, dispatch),
  // eslint-disable-next-line max-len
  getConfirmedAppointments: bindActionCreators(appointmentActions.getConfirmedAppointments, dispatch),
  clearCancelState: bindActionCreators(cancelApptActions.clearConfirmCancelState, dispatch),
  clearCancelCheckState: bindActionCreators(cancelApptActions.clearCancelCheckState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deleter);
export {
  styles,
};
