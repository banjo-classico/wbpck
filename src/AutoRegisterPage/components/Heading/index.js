import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as headerActions } from "../../../components/header/actions/actions";
import LoadingEllipsis from "../LoadingEllipsis";
import Tick from "../../../svgs/tick.svg";
import Cross from "../../../svgs/close.svg";
import styles from "./heading.css";

class Heading extends Component {
  static propTypes = {
    error: PropTypes.any,
    clearStyles: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.addStyles = this.addStyles.bind(this);
  }
  componentDidMount() {
    this.addStyles(this.props.confirming, this.props.error);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.confirming !== this.props.confirming || nextProps.error !== this.props.error) {
      this.addStyles(nextProps.confirming, nextProps.error);
    }
  }
  addStyles(confirming, error) {
    if (confirming) {
      this.props.addStyles([styles.confirmingHeader]);
    } else if (error) {
      this.props.addStyles([styles.errorHeader]);
    } else {
      this.props.addStyles([styles.confirmedHeader]);
    }
  }
  render() {
    if (this.props.confirming) {
      return (
        <div className={styles.container}>
          <LoadingEllipsis className={styles.loader} />
          <span className={styles.text}>Confirming Appointment</span>
        </div>
      );
    }
    if (this.props.error) {
      return (
        <div className={styles.container}>
          <Cross className={styles.cross} />
          <span className={styles.text}>Booking Failed</span>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <Tick className={styles.tick} />
        <span className={styles.text}>Appointment Confirmed</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  confirming: state.appointmentConfirmationReducer.checking,
  error: state.appointmentConfirmationReducer.error,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
});

Heading.propTypes = {
  confirming: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Heading);
