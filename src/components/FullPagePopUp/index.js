import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";

import { actions } from "../../App/actions/actions";
import { isIOS, isIE, isSaf } from "../../libs/BrowserDetection";
import { isDesktop } from "../../config";

import styles from "./fullPagePopup.css";

class FullPagePopup extends Component {
  componentDidMount() {
    this.props.addAppStyles([styles.dontScroll]);
  }
  componentWillUnmount() {
    this.props.removeAppStyles([styles.dontScroll]);
  }
  render() {
    isIE();
    return (
      <div
        className={classnames(
        styles.container,
        { [styles.ios]: isIOS() },
        { [styles.saf]: isSaf() && isDesktop() },
      )}
      >
        <div
          className={classnames(
            styles.content,
            { [styles.ios]: isIOS() },
            { [styles.ie]: isIE() },
            this.props.className
          )}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

FullPagePopup.propTypes = {
  addAppStyles: PropTypes.func.isRequired,
  removeAppStyles: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  addAppStyles: bindActionCreators(actions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(actions.removeAppStyles, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(FullPagePopup);
