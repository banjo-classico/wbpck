import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as headerActions } from "../../../../components/header/actions/actions";
import { actions as appStyleActions } from "../../../../App/actions/actions";
import RequestNewPasswordPage from "../../index";
import Logo from "../../../../svgs/logo.svg";
import styles from "./desktopWrapper.css";

class DesktopWrapper extends Component {
  static propTypes = {
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    setAppClassNames: PropTypes.func.isRequired,
    clearAppClassNames: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.addStyles([styles.hidden]);
    this.props.setAppClassNames([styles.app]);
  }
  componentWillUnmount() {
    this.props.clearStyles();
    this.props.clearAppClassNames();
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.desktopHeader}><Logo className={styles.logo} /></div>
        <div className={styles.innerContainer}>
          <RequestNewPasswordPage />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({
});
const mapDispatchToProps = (dispatch) => ({
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  setAppClassNames: bindActionCreators(appStyleActions.addAppStyles, dispatch),
  clearAppClassNames: bindActionCreators(appStyleActions.clearAppStyles, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopWrapper);
