import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { actions as expiredSessionActions } from "./actions/actions";
import { actions as loginActions } from "../../ConsumerInterface/EntryPage/actions/actions";
import errorKiwi from "../../images/errorKiwi.png";
import styles from "./expiredSession.css";

class ExpiredSession extends Component {
  static propTypes = {
    closePopup: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.closePopup();
    this.props.logout(this.props.token);
  }
  render() {
    return (
      <div className={styles.page}>
        <ReactCSSTransitionGroup
          transitionName={{
            leave: styles.leave,
            leaveActive: styles.leaveActive,
            enter: styles.enter,
            enterActive: styles.enterActive,
            appear: styles.enter,
            appearActive: styles.enterActive,
          }}
          transitionLeaveTimeout={500}
          transitionEnterTimeout={500}
          transitionAppearTimeout={500}
          transitionAppear
          className={styles.innerContainer}
          onSubmit={this.onSubmit}
          component="div"
        >
          <div className={styles.title}>Whoops, your session has expired</div>
          <img src={errorKiwi} className={styles.kiwi} alt="error icon" />
          <div className={styles.text}>You&#39;ve been inactive for longer than 10 minutes.</div>
          <button
            className={styles.loginButton}
            type="button"
            onClick={this.logout}
          >Log in</button>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token,
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(loginActions.logout, dispatch),
  closePopup: bindActionCreators(expiredSessionActions.expiredSessionFailure, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredSession);
