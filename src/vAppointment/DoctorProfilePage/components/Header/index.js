import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { actions as headerActions } from "../../../../components/header/actions/actions";
import { actions as appScrollActions } from "../../../../App/actions/scrollActions";
import DoctorBanner from "../DoctorBanner";
import Logo from "../../../../components/header/components/Logo";
import styles from "./header.css";

class Header extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    removeStyles: PropTypes.func.isRequired,
    setTrackScrollPosition: PropTypes.func.isRequired,
    contentScrollTop: PropTypes.number,
    currentHeading: PropTypes.node.isRequired,
  }
  state = {
    shouldShow: false,
  }
  componentDidMount() {
    this.props.addStyles([styles.header]);
    this.props.setTrackScrollPosition(true);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.contentScrollTop < 400
    ) {
      this.setState({ shouldShow: false });
      this.props.removeStyles([styles.banner]);
    }
    if (
      nextProps.contentScrollTop >= 400 &&
      (!nextProps.currentHeading || nextProps.currentHeading.type !== DoctorBanner)
    ) {
      this.setState({ shouldShow: true });
      this.props.addStyles([styles.banner]);
    }
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        className={styles.container}
        component="div"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={700}
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
      >
        {
      this.state.shouldShow ? <DoctorBanner key="1" /> : <Logo key="2" />
    }
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  contentScrollTop: state.appScrollReducer.scrollTop,
  currentHeading: state.headerReducer.heading,
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  removeStyles: bindActionCreators(headerActions.removeStyles, dispatch),
  setTrackScrollPosition: bindActionCreators(appScrollActions.setTrackScrollPosition, dispatch),
  clearScrollPosition: bindActionCreators(appScrollActions.clearScrollPosition, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
export {
  styles,
};
