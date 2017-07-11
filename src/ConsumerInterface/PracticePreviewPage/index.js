import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

/* eslint-disable max-len */
import { actions as practiceLinkingActions } from "../AddNewPracticePage/actions/practiceLinkingActions";
/* eslint-disable max-len */
import { actions as practiceProfileActions } from "../../vAppointment/PracticeProfilePage/actions/actions";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import PracticeHeader from "../../vAppointment/PracticeProfilePage/components/PracticeHeader";
import DoctorList from "./components/DoctorList";
import CtaButton from "../../components/CtaButton";
import PreviewHeader from "./components/PreviewHeader";
import styles from "./practicePreviewPage.css";
import { practicePropType } from "../../vAppointment/PracticeProfilePage/propTypes";
/* eslint-enable max-len */
class practicePreviewPage extends Component {
  static propTypes = {
    getPracticeProfile: PropTypes.func.isRequired,
    // getPracticeInfo: PropTypes.func.isRequired,
    // clearAppointmentData: PropTypes.func.isRequired,
    setHeading: PropTypes.func.isRequired,
    setSecondLine: PropTypes.func.isRequired,
    clearSecondLine: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    removeAppStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    routeParams: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    practice: practicePropType.isRequired,
    error: PropTypes.object,
    linkToPractice: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.props.getPracticeProfile(this.props.routeParams.id);
    this.props.addStyles([styles.header]);
    this.props.addAppStyles([styles.app]);
    this.props.displayHeaderIcons({ menu: false, arrow: true, help: false });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.practice.Name !== nextProps.practice.Name) {
      this.props.setHeading(
        <PreviewHeader
          practiceName={nextProps.practice.Name}
          practiceAddress={nextProps.practice.Address}
        />);
    }
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.removeAppStyles([styles.app]);
    this.props.clearHeading();
    this.props.clearSecondLine();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.practiceHeaderContainer}>
          <PracticeHeader
            practice={this.props.practice}
            isFetching={this.props.isFetching}
            showTitle={false}
          />
        </div>
        <div className={styles.doctorContainer}>
          <div className={styles.doctorsHeader}>Our Doctors</div>
          {this.props.practice.Doctors &&
          <DoctorList
            doctors={this.props.practice.Doctors}
          />
          }
          <div className={styles.buttonContainer}>
            <CtaButton
              active
              onClick={() => this.props.linkToPractice(this.props.practice, this.props.token)}
              type={"button"}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.practiceProfileReducer.isFetching,
  practice: state.practiceProfileReducer.profile,
  token: state.loginReducer.token,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  setSecondLine: bindActionCreators(headerActions.setSecondLine, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  clearSecondLine: bindActionCreators(headerActions.clearSecondLine, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  linkToPractice: bindActionCreators(practiceLinkingActions.linkPractice, dispatch),
  getPracticeProfile: bindActionCreators(practiceProfileActions.getPracticeProfile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(practicePreviewPage);
