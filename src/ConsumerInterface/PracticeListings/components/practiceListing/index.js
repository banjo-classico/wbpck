import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./practiceListing.css";
import Ellipsis from "../../../../svgs/ellipsis.svg";
import ListingMenu from "../ListingMenu/";
import { clinicPropType } from "../../propTypes";

const getClinicStatus = (isOnline, isUsingVensa, name) => {
  if (!isUsingVensa) {
    // eslint-disable-next-line max-len
    return `${name} is not yet signed up to vensa.com for online bookings. Please let them know you'd like to book your appointments online.`;
  }
  if (!isOnline) return "Offline for bookings";
  return "Online for bookings";
};
class PracticeListing extends Component {
  static propTypes = {
    bookAtPractice: PropTypes.func.isRequired,
    clinic: clinicPropType.isRequired,
    toggleMenuActive: PropTypes.func.isRequired,
    parentIsActive: PropTypes.bool.isRequired,
    unlinkPractice: PropTypes.func.isRequired,
    goToSupport: PropTypes.func.isRequired,
  }

  state = { menuActive: false }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.parentIsActive) {
      this.setState({ menuActive: false });
    }
  }
  toggleMenuActive = () => {
    this.setState({ menuActive: !this.state.menuActive });
    this.props.toggleMenuActive();
  }
  render() {
    const clinic = this.props.clinic;
    const bookAtPractice = this.props.bookAtPractice;
    return (
      <div className={styles.listing}>
        <div className={styles.menuContainer}>
          <Ellipsis
            className={styles.ellipsis}
            onClick={() => this.toggleMenuActive()}
          />
        </div>
        { this.state.menuActive ?
          <ListingMenu
            toggleMenuActive={this.toggleMenuActive}
            unlinkPractice={this.props.unlinkPractice}
            goToSupport={this.props.goToSupport}
          />
          : null }
        <div
          className={styles.innerContainer}
          onClick={() => clinic.IsOnline && clinic.IsUsingVensa && bookAtPractice(clinic.UrlName)}
        >
          {
            clinic.IsUsingVensa ?
              <img className={styles.img} src={clinic.PictureUrl} alt={clinic.Name} /> :
              <div className={styles.notAvailable}>
                <span className={styles.notAvailableText}>Picture not available</span>
              </div>
          }
          <div className={styles.profile}>
            <div
              className={classnames(styles.name, { [styles.notClickable]: !clinic.IsUsingVensa })}
            >
              {clinic.Name}
            </div>
            <span className={styles.address}>{clinic.Address || "No address available"}</span>
            <span
              className={classnames(styles.status,
                { [styles.online]: clinic.IsOnline && clinic.IsUsingVensa },
                { [styles.notOnline]: !clinic.IsOnline || !clinic.IsUsingVensa },
              )}
            >
              {getClinicStatus(clinic.IsOnline, clinic.IsUsingVensa, clinic.Name)}
            </span>
          </div>
        </div>
      </div>

    );
  }
}

export default PracticeListing;
