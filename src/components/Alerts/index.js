import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import { split, map, filter, compose } from "lodash/fp";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import reactSStyles from "react-s-alert/dist/s-alert-default.css";
import Cross from "../../svgs/cross.svg";
import styles from "./alerts.css";

class Alerts extends Component {
  static propTypes = {
    classNames: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
      error: PropTypes.bool,
      warning: PropTypes.bool,
      info: PropTypes.bool,
      success: PropTypes.bool,
    }).isRequired,
    id: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }
  state = {
    closing: false,
  }
  onClose() {
    this.setState({ closing: true });
    setTimeout(() => this.props.handleClose(this.props.id), 10000);
  }
  render() {
    const alertClasses = compose(
      filter(c => c),
      map(c => reactSStyles[c]),
      split(" ")
    )(this.props.classNames);
    const statusClasses = {
      [styles.error]: this.props.customFields.error,
      [styles.warning]: this.props.customFields.warning,
      [styles.info]: this.props.customFields.info,
      [styles.success]: this.props.customFields.success,
    };
    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          appear: styles.enter,
          appearActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        className={classnames(styles.container)} id={this.props.id}
      >
        <div
          className={classnames(
            reactSStyles["s-alert-box"],
            styles.boxContainer,
            alertClasses,
            statusClasses,
            { [styles.leave]: this.state.closing }
          )}
          onClick={this.onClose}
        >
          <div className={styles.message}>
            {this.props.message}
          </div>
          <Cross className={styles.icon} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Alerts;
