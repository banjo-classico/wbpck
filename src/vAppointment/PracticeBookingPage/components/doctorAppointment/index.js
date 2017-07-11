import React, { Component, PropTypes } from "react";
import EventListener from "react-event-listener";
import { map, defer, debounce } from "lodash/fp";
import moment from "moment";
import classnames from "classnames";

import styles from "./doctorAppointment.css";
import Arrow from "../../../../svgs/leftarrow.svg";
import NextAvailableSlot from "../NextAvailableSlot";
import { SelectedTimePropType, SlotPropType } from "../../propTypes";

class DoctorAppointment extends Component {
  static propTypes = {
    appointmentSlots: PropTypes.arrayOf(SlotPropType).isRequired,
    doctorId: PropTypes.string.isRequired,
    selectedTime: SelectedTimePropType,
    setTime: PropTypes.func.isRequired,
    nextAvailableSlot: PropTypes.string.isRequired,
    goToDate: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.checkLeftScroll = this.checkLeftScroll.bind(this);
    this.checkRightScroll = this.checkRightScroll.bind(this);
    this.scrollContainer = this.scrollContainer.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
  }
  state = {
    right: false,
    left: false,
  }
  componentDidMount() {
    defer(this.onScroll);
  }
  componentWillReceiveProps() {
    if (this.container.children[0]) {
      this.container.children[0].scrollIntoView();
    }
    defer(this.onScroll);
  }
  onScroll() {
    if (this.container) {
      this.setState({
        right: this.checkRightScroll(),
        left: this.checkLeftScroll(),
      });
    }
  }
  checkLeftScroll() {
    return this.container && this.container.scrollLeft > 5;
  }
  checkRightScroll() {
    // eslint-disable-next-line max-len
    return this.container && this.container.scrollWidth - (this.container.scrollLeft + this.container.offsetWidth) > 5;
  }
  createSlot(time, selectedTime, doctorId, appointmentId, setTime) {
    const selected =
      doctorId === selectedTime.doctorId &&
      time === selectedTime.time &&
      appointmentId === selectedTime.appointmentId;
    return (
      <button
        key={time}
        className={classnames(styles.item, { [styles.selected]: selected })}
        onClick={() => setTime(doctorId, appointmentId, time)}
      >
        {moment(time).format("h:mm")}
      </button>
    );
  }
  scrollContainer(goRight, distance) {
    const speed = 3;
    const stopPoint = goRight ?
      this.container.scrollLeft + distance :
      this.container.scrollLeft - distance;
    const shouldKeepScrolling = goRight ? this.checkRightScroll : this.checkLeftScroll;
    const hasReachedStopPoint = () => (
      goRight ? this.container.scrollLeft >= stopPoint : this.container.scrollLeft <= stopPoint
    );
    const intervalId = setInterval(() => {
      if (goRight) {
        this.container.scrollLeft += 1;
      } else {
        this.container.scrollLeft -= 1;
      }
      if (hasReachedStopPoint() || !shouldKeepScrolling()) {
        clearInterval(intervalId);
      }
    }, speed);
  }
  scrollRight() {
    this.scrollContainer(true, 100);
  }
  scrollLeft() {
    this.scrollContainer(false, 100);
  }
  render() {
    return (
      <EventListener target="window" onResize={debounce(250, this.onScroll)}>
        <div className={styles.container}>
          {
            this.state.left ?
              <div onClick={this.scrollLeft} className={styles.arrowContainerLeft}>
                <Arrow className={styles.left} />
              </div> : null
          }
          <div
            className={styles.inner}
            onScroll={debounce(250, this.onScroll)}
            ref={c => (this.container = c)}
          >
            {
              (() => {
                if (this.props.appointmentSlots.length) {
                  return map(slot => this.createSlot(
                    slot.Time,
                    this.props.selectedTime,
                    this.props.doctorId,
                    slot.Guid,
                    this.props.setTime))(this.props.appointmentSlots);
                } else if (!this.props.nextAvailableSlot) {
                  return (
                    <div className={styles.notAvailable}>
                        Currently not available for online booking.
                      </div>
                  );
                }
                return (<NextAvailableSlot
                  nextAvailableDate={this.props.nextAvailableSlot}
                  onClickAction={this.props.goToDate(this.props.nextAvailableSlot)}
                />);
              })()
            }
          </div>
          {
            this.state.right ?
              <div onClick={this.scrollRight} className={styles.arrowContainerRight}>
                <Arrow className={styles.right} />
              </div> : null
          }
        </div>
      </EventListener>
    );
  }

}

export default DoctorAppointment;
