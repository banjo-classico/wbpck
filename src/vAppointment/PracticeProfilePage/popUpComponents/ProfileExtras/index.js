import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Arrow from "../../../../svgs/leftarrow.svg";
import Languages from "../../components/Languages";
import Education from "../../../DoctorProfilePage/components/Education";
import { doctorPropType } from "../../../DoctorProfilePage/propTypes";
import styles from "./profileExtras.css";

class ProfileExtras extends Component {
  static propTypes = {
    showProfileExtras: PropTypes.bool.isRequired,
    doctor: doctorPropType.isRequired,
    blurb: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.toggleExtras = this.toggleExtras.bind(this);
  }
  state ={
    isOpen: this.props.showProfileExtras,
  }
  toggleExtras() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    return (
      <div className={styles.container}>
        <ReactCSSTransitionGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive,
          }}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {this.state.isOpen ?
            <div className={styles.innerContainer}>
              <div className={styles.blurb}>{this.props.blurb}</div>
              {
                this.props.doctor.Education.length && this.props.doctor.Language.length ?
                  <div className={styles.extrasContainer}>
                    <Education education={this.props.doctor.Education} />
                    <Languages
                      languages={this.props.doctor.Language}
                      title="Languages"
                      className={styles.languages}
                    />
                  </div> : null
              }
            </div>
        : null
      }
        </ReactCSSTransitionGroup>
        <div className={styles.bottomContainer}>
          <button className={styles.button} onClick={this.toggleExtras}>
            {
            this.state.isOpen ?
              <div>Hide Profile <Arrow className={styles.upArrow} /></div> :
              <div>View Profile <Arrow className={styles.downArrow} /></div>
          }

          </button>
        </div>
      </div>
    );
  }
}

export default ProfileExtras;
