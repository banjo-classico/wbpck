import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Alert from "react-s-alert";
import classnames from "classnames";
import { debounce } from "lodash/fp";

import { actions } from "../ConsumerInterface/EntryPage/actions/actions";
import { actions as scrollActions } from "./actions/scrollActions";
import { isV2 } from "./helpers/tokenHelper";
import styles from "./app.css";
import Header from "../components/header";
import Menu from "../components/Menu";
import ExpiredSession from "../components/ExpiredSession";
import MyCustomContentTemplate from "../components/Alerts";
import { isDesktop } from "../config";

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setScrollPosition: PropTypes.func.isRequired,
    shouldTrackScroll: PropTypes.bool.isRequired,
    showExpiredSession: PropTypes.bool.isRequired,
    displayMenu: PropTypes.bool.isRequired,
    shrink: PropTypes.bool.isRequired,
    appClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  constructor(props) {
    super(props);
    this.onContentScroll = this.onContentScroll.bind(this);
  }
  componentWillMount() {
    const loginInfo = JSON.parse(window.localStorage.getItem("token"));
    if (loginInfo) {
      if (!isV2(loginInfo)) {
        this.props.logout();
      } else {
        this.props.loginSuccess(loginInfo.token, loginInfo.expiryTime, loginInfo.email);
      }
    }
  }
  onContentScroll() {
    if (this.props.shouldTrackScroll) {
      this.props.setScrollPosition(this.content.scrollTop);
    }
  }
  render() {
    return (
      <div className={styles.outerApp}>
        {!isDesktop() && this.props.displayMenu ? <Menu /> : null}
        <div
          className={classnames(
          styles.app, this.props.appClassNames,
          { [styles.shrink]: this.props.shrink && !isDesktop() }
        )}
        >
          {this.props.showExpiredSession ? <ExpiredSession /> : null}
          <Header />
          <div
            ref={c => { this.content = c; }}
            className={styles.content}
            onScroll={debounce(300, this.onContentScroll)}
          >
            <div className={styles.contentInner}>
              {this.props.children}
            </div>
          </div>
          <Alert
            contentTemplate={MyCustomContentTemplate}
            position="bottom"
            html
            stack
            effect="scale"
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  appClassNames: state.appStylesReducer.classNames,
  showExpiredSession: state.expiredSessionReducer.showExpiredSession,
  shouldTrackScroll: state.appScrollReducer.shouldTrack,
  shrink: state.appStylesReducer.shrink,
  displayMenu: state.menuReducer.isShowing,
});
const mapDispatchToProps = (dispatch) => ({
  loginSuccess: bindActionCreators(actions.loginSuccess, dispatch),
  logout: bindActionCreators(actions.logout, dispatch),
  setScrollPosition: bindActionCreators(scrollActions.setScrollPosition, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {
  styles,
};
