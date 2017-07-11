import React, { Component, PropTypes } from "react";
// import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as menuActions } from "../../components/Menu/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
// eslint-disable-next-line max-len
import { actions as popUpActions } from "../../vAppointment/PracticeProfilePage/actions/popUpActions";
import { actions as listingActions } from "../PracticeListings/actions/actions";
import { actions as appointmentActions } from "../Appointments/actions/actions";
import { actions as feedActions } from "../HealthFeed/actions/actions";
import { actions } from "./actions/actions";
import Appointments from "../Appointments";
import HealthFeed from "../HealthFeed";
import RequestScript from "../../vScript/RequestScript";
import styles from "./mainShell.css";
import Slider from "./components/Slider/index";
import { isDesktop } from "../../config";
import { clearAppointmentData } from "../../selectors/appointmentSelectors";

const sliderTabs = [
  {
    text: "My Health Feed",
    component: HealthFeed,
  },
  {
    text: "Appointments",
    component: Appointments,
  },
  {
    text: "Prescriptions",
    component: RequestScript,
  }];

class MainShell extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    getConfirmedAppointments: PropTypes.func.isRequired,
    getPastAppointments: PropTypes.func.isRequired,
    getClinics: PropTypes.func.isRequired,
    getFeed: PropTypes.func.isRequired,
    hideMenu: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    setHeadingSecondLine: PropTypes.func.isRequired,
    clearSecondLine: PropTypes.func.isRequired,
    clearAppointmentData: PropTypes.func.isRequired,
    setComponentIndex: PropTypes.func.isRequired,
    closePopUp: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    sliderTabs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };
  state = {
    renderedComponent: this.props.sliderTabs[this.props.index],
  };
  componentWillMount() {
    this.props.clearAppointmentData();
    this.props.closePopUp();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getPastAppointments(this.props.id);
    this.props.getConfirmedAppointments(this.props.id);
    this.props.getFeed(this.props.id);
    this.props.getClinics(this.props.id);
    this.props.addAppStyles([styles.mainShellApp]);
    this.props.addStyles(isDesktop() ? [styles.desktopHeader] : [styles.header]);
    this.props.displayHeaderIcons({ menu: true, arrow: false, messages: true });
    this.props.setHeadingSecondLine(
      <Slider
        tabs={this.props.sliderTabs}
        selectedTab={this.state.renderedComponent}
        setRenderedComponent={this.setRenderedComponent}
      />
    );
  }
  componentWillUnmount() {
    this.props.clearSecondLine();
    this.props.clearStyles();
    this.props.clearAppStyles();
    this.props.hideMenu();
  }
  setRenderedComponent = (component, index) => {
    this.setState({
      renderedComponent: component,
    });
    this.props.setComponentIndex(index);
  }
  render() {
    return (
      <div className={styles.container}>
        <this.state.renderedComponent.component />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.loginReducer.token,
  index: state.mainShellReducer.componentIndex,
  sliderTabs,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  clearSecondLine: bindActionCreators(headerActions.clearSecondLine, dispatch),
  setHeadingSecondLine: bindActionCreators(headerActions.setSecondLine, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appActions.clearAppStyles, dispatch),
  clearAppointmentData: clearAppointmentData(dispatch),
  getClinics: bindActionCreators(listingActions.getPracticeListings, dispatch),
  hideMenu: bindActionCreators(menuActions.hideMenu, dispatch),
  // eslint-disable-next-line max-len
  getConfirmedAppointments: bindActionCreators(appointmentActions.getConfirmedAppointments, dispatch),
  getFeed: bindActionCreators(feedActions.getFeed, dispatch),
  getPastAppointments: bindActionCreators(appointmentActions.getPastAppointments, dispatch),
  closePopUp: bindActionCreators(popUpActions.closePopUp, dispatch),
  setComponentIndex: bindActionCreators(actions.setComponentIndex, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainShell);
