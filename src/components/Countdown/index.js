import React, { Component, PropTypes } from "react";

class Countdown extends Component {
  static defaultProps = {
    interval: 1000,
  }
  static propTypes = {
    milliSecondsRemaining: PropTypes.number.isRequired,
    className: PropTypes.string,
    formatTime: PropTypes.func,
    completedCallback: PropTypes.func,
    interval: PropTypes.number,

  }
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }
  state = {
    milliSecondsRemaining: this.props.milliSecondsRemaining || 0,
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, this.props.interval);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    this.setState(
      { milliSecondsRemaining: Math.max(this.state.milliSecondsRemaining - this.props.interval, 0) }
    );
    if (this.state.milliSecondsRemaining <= 0) {
      clearInterval(this.interval);
      if (this.props.completedCallback) {
        this.props.completedCallback();
      }
    }
  }
  render() {
    const formattedTime = this.props.formatTime
      ? this.props.formatTime(this.state.milliSecondsRemaining)
      : this.state.milliSecondsRemaining;
    return (
      <div className={this.props.className}>{formattedTime}</div>
    );
  }
}

export default Countdown;
