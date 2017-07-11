import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appScrollActions } from "../../App/actions/scrollActions";
import { actions as doctorActions } from "./actions/actions";
import { actions as practiceProfileActions } from "../PracticeProfilePage/actions/actions";
import styles from "./doctorProfilePage.css";
import Intro from "./components/Intro";
import Languages from "./components/Languages";
import OurTeam from "../PracticeProfilePage/components/OurTeam";
import Education from "./components/Education";
import PracticeMap from "./components/PracticeMap";
import IntroPlaceHolder from "./components/IntroPlaceHolder";
// import DoctorBanner from "./components/DoctorBanner";
import Header from "./components/Header";
import { doctorPropType } from "./propTypes";
import { practicePropType } from "../PracticeProfilePage/propTypes";
import { routeConfig } from "../../routes";

class DoctorProfilePage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    removeStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearScrollPosition: PropTypes.func.isRequired,
    setTrackScrollPosition: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    goToDoctorProfile: PropTypes.func.isRequired,
    fetchDoctorProfile: PropTypes.func.isRequired,
    getPracticeProfile: PropTypes.func.isRequired,
    bookNow: PropTypes.func.isRequired,
    doctor: doctorPropType.isRequired,
    isFetching: PropTypes.bool.isRequired,
    changeHeader: PropTypes.bool.isRequired,
    clinic: practicePropType.isRequired,
    routeParams: PropTypes.shape({
      id: PropTypes.string.isRequired,
      orgid: PropTypes.string.isRequired,
    }),
    doctorId: PropTypes.string,
    hideButton: PropTypes.bool,
    hideOurTeam: PropTypes.bool,
  }
  static defaultProps = {
    changeHeader: true,
    hideButton: false,
    hideOurTeam: false,
  }
  componentWillMount() {
    this.props.fetchDoctorProfile(
      this.props.routeParams.id ? this.props.routeParams.id : this.props.doctorId
    );
    if (this.props.routeParams.orgid !== this.props.clinic.Id) {
      this.props.getPracticeProfile(this.props.routeParams.orgid);
    }
  }
  componentDidMount() {
    if (this.props.changeHeader) {
      this.props.setHeading(<Header />);
      this.props.displayHeaderIcons({ menu: false, arrow: true });
      this.props.addStyles([styles.header]);
      this.props.setTrackScrollPosition(true);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.routeParams.id !== this.props.routeParams.id) {
      this.props.fetchDoctorProfile(nextProps.routeParams.id);
    }
  }
  componentWillUnmount() {
    if (this.props.changeHeader) {
      this.props.clearHeading();
      this.props.clearStyles();
      this.props.displayHeaderIcons();
      this.props.clearScrollPosition();
    }
  }
  render() {
    return (
      <div
        className={styles.container}
      >
        {this.props.isFetching ? <IntroPlaceHolder isFetching={this.props.isFetching} /> :
        <div className={styles.innerContainer}>
          <div className={styles.paddingContainer}>
            <Intro
              url={this.props.doctor.Picture}
              name={this.props.doctor.Name}
              title={this.props.doctor.Title}
              blurb={this.props.doctor.Description}
              goToPracticeBooking={this.props.bookNow}
              practiceId={this.props.routeParams.orgid}
              hideButton={this.props.hideButton}
            />
            <div className={styles.mainContent}>
              {
                this.props.doctor.Language.length ?
                  <Languages
                    className={styles.languages}
                    languages={this.props.doctor.Language}
                    title="Languages spoken"
                  /> : null
              }
              {
                this.props.doctor.Education.length ?
                  <Education education={this.props.doctor.Education} /> : null
              }
              <PracticeMap clinic={this.props.clinic} />
            </div>
          </div>
          {this.props.hideOurTeam ? null :
          <OurTeam
            team={this.props.clinic.Doctors}
            pushProp={this.props.goToDoctorProfile(this.props.routeParams.orgid)}
            orgid={this.props.routeParams.orgid}
            title={this.props.clinic.Name}
            className={styles.ourTeam}
            onBookNow={() => this.props.bookNow(this.props.routeParams.orgid)}
          />}
          <div className={styles.copyright}>&#169; 2016 Vensa Health</div>
        </div>
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.doctorProfileReducer.isFetching,
  doctor: state.doctorProfileReducer.doctor,
  clinic: state.practiceProfileReducer.profile,
  contentScrollTop: state.appScrollReducer.scrollTop,
  currentHeading: state.headerReducer.heading,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  removeStyles: bindActionCreators(headerActions.removeStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  bookNow: id => bindActionCreators(push, dispatch)(routeConfig.practiceBooking.getBrowserPath(id)),
  goToDoctorProfile: orgid => id =>
    bindActionCreators(push, dispatch)(routeConfig.doctorProfile.getBrowserPath(orgid, id)),
  fetchDoctorProfile: bindActionCreators(doctorActions.fetchDoctorProfile, dispatch),
  getPracticeProfile: bindActionCreators(practiceProfileActions.getPracticeProfile, dispatch),
  setTrackScrollPosition: bindActionCreators(appScrollActions.setTrackScrollPosition, dispatch),
  clearScrollPosition: bindActionCreators(appScrollActions.clearScrollPosition, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfilePage);
export {
  styles,
};
