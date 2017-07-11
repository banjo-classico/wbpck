import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appActions } from "../../App/actions/actions";
import styles from "./messagesPage.css";

class MessagesPage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    removeAppStyles: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.setHeading(<div>Messages</div>);
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.addAppStyles([styles.app]);
    this.props.addStyles([styles.header]);
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.clearStyles();
    this.props.displayHeaderIcons();
    this.props.removeAppStyles([styles.app]);
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div>There are no messages in your inbox.</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addAppStyles: bindActionCreators(appActions.addAppStyles, dispatch),
  removeAppStyles: bindActionCreators(appActions.removeAppStyles, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
export {
  styles,
};
