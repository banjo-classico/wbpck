import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classnames from "classnames";

import { actions } from "../../components/header/actions/actions";
import { actions as submitActions } from "./actions/actions";
import styles from "./checkoutPage.css";
import Confirmed from "./components/Confirmed";
import StillConfirming from "./components/StillConfirming";
import ErrorConfirming from "./components/ErrorConfirming";
import Transition from "../../components/Transition";
import loadingGif from "../../images/LoadingGif.gif";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";

class CheckoutPage extends Component {
  static propTypes = {
    clearStyles: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    confirmed: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isBusy: PropTypes.bool.isRequired,
    sessionId: PropTypes.string.isRequired,
    submitAppointment: PropTypes.func.isRequired,
    orgId: PropTypes.string.isRequired,
    pushProp: PropTypes.func.isRequired,
    error: PropTypes.shape({ status: PropTypes.number.isRequired }),
  }
  constructor(props) {
    super(props);
    this.noErrorOnClick = this.noErrorOnClick.bind(this);
  }
  componentDidMount() {
    if (!isDesktop()) {
      this.props.addStyles([styles.hidden]);
    }
    this.props.submitAppointment(this.props.sessionId);
  }
  componentWillUnmount() {
    this.props.clearStyles();
  }
  noErrorOnClick() {
    if (this.props.isLoggedIn) {
      this.props.pushProp(routeConfig.home.getBrowserPath());
    } else {
      this.props.pushProp(routeConfig.guestRegister.getBrowserPath());
    }
  }

  render() {
    return (
      <Transition
        className={classnames(
        styles.container,
        { [styles.containerBusy]: this.props.isBusy }
      )}
      >
        {
          !this.props.confirmed &&
          !this.props.error &&
          <img
            key="0"
            alt="confirming appointment"
            className={classnames(
              styles.loadingGif,
              { [styles.gifBusy]: this.props.isBusy }
            )}
            src={loadingGif}
          />
        }
        {(() => {
          if (this.props.confirmed) return <Confirmed key="1" />;
          if (this.props.error) return <ErrorConfirming key="2" />;
          return (<StillConfirming
            key="3"
            isBusy={this.props.isBusy}
            onClick={this.noErrorOnClick}
          />);
        })()}
      </Transition>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.loginReducer.token !== null,
  isBusy: state.appointmentConfirmationReducer.isBusy,
  confirmed: state.appointmentConfirmationReducer.confirmed,
  sessionId: state.sessionReducer.sessionId,
  error: state.appointmentConfirmationReducer.error || state.submitAppointmentReducer.error,
  orgId: state.practiceAppointmentReducer.practiceInfo.practice.Guid,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(actions.addStyles, dispatch),
  clearStyles: bindActionCreators(actions.clearStyles, dispatch),
  submitAppointment: bindActionCreators(submitActions.submitAppointment, dispatch),
  pushProp: bindActionCreators(push, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
export {
  styles,
};
