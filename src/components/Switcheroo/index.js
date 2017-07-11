import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";

import styles from "./switcheroo.css";

class Switcheroo extends Component {
  static propTypes = {
    firstItem: PropTypes.node.isRequired,
    secondItem: PropTypes.node.isRequired,
    thirdItem: PropTypes.node,
    fourthItem: PropTypes.node,
    fifthItem: PropTypes.node,
    className: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.setItemToShow = this.setItemToShow.bind(this);
  }
  state = {
    lastShownItem: 0,
    itemToShow: 1,
  }
  setItemToShow(itemToShow, lastShownItem) {
    this.setState({ itemToShow });
    this.setState({ lastShownItem });
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        component="div"
        className={classnames(styles.container, this.props.className)}
        transitionName={{
          leave: classnames(
            /* eslint-disable max-len*/
            { [styles.leave]: this.state.itemToShow === 1 },
            { [styles.leaveLeft]: this.state.itemToShow === 2 && this.state.lastShownItem === 1 },
            { [styles.leaveRight]: this.state.itemToShow === 2 && this.state.lastShownItem === 3 },
            { [styles.leaveLeft]: this.state.itemToShow === 3 && this.state.lastShownItem === 2 },
            { [styles.leaveRight]: this.state.itemToShow === 3 && this.state.lastShownItem === 4 },
            { [styles.leaveLeft]: this.state.itemToShow === 4 && this.state.lastShownItem === 3 },
            { [styles.leaveRight]: this.state.itemToShow === 4 && this.state.lastShownItem === 5 },
            { [styles.lastLeave]: this.state.itemToShow === 5 },
            { [styles.leaveLeft]: this.state.itemToShow === 4 && this.state.lastShownItem === 2 },
            { [styles.leaveRight]: this.state.itemToShow === 2 && this.state.lastShownItem === 4 },
          ),
          leaveActive: classnames(
            { [styles.leaveActive]: this.state.itemToShow === 1 },
            { [styles.leaveLeftActive]: this.state.itemToShow === 2 && this.state.lastShownItem === 1 },
            { [styles.leaveRightActive]: this.state.itemToShow === 2 && this.state.lastShownItem === 3 },
            { [styles.leaveLeftActive]: this.state.itemToShow === 3 && this.state.lastShownItem === 2 },
            { [styles.leaveRightActive]: this.state.itemToShow === 3 && this.state.lastShownItem === 4 },
            { [styles.leaveLeftActive]: this.state.itemToShow === 4 && this.state.lastShownItem === 3 },
            { [styles.leaveRightActive]: this.state.itemToShow === 4 && this.state.lastShownItem === 5 },
            { [styles.lastLeaveActive]: this.state.itemToShow === 5 },
            { [styles.leaveLeftActive]: this.state.itemToShow === 4 && this.state.lastShownItem === 2 },
            { [styles.leaveRightActive]: this.state.itemToShow === 2 && this.state.lastShownItem === 4 },
          ),
          enter: classnames(
            { [styles.enter]: this.state.itemToShow === 1 },
            { [styles.enterLeft]: this.state.itemToShow === 2 && this.state.lastShownItem === 1 },
            { [styles.enterRight]: this.state.itemToShow === 2 && this.state.lastShownItem === 3 },
            { [styles.enterLeft]: this.state.itemToShow === 3 && this.state.lastShownItem === 2 },
            { [styles.enterRight]: this.state.itemToShow === 3 && this.state.lastShownItem === 4 },
            { [styles.enterLeft]: this.state.itemToShow === 4 && this.state.lastShownItem === 3 },
            { [styles.enterRight]: this.state.itemToShow === 4 && this.state.lastShownItem === 5 },
            { [styles.lastEnter]: this.state.itemToShow === 5 },
            { [styles.enterLeft]: this.state.itemToShow === 4 && this.state.lastShownItem === 2 },
            { [styles.enterRight]: this.state.itemToShow === 2 && this.state.lastShownItem === 4 },
          ),
          enterActive: classnames(
            { [styles.enterActive]: this.state.itemToShow === 1 },
            { [styles.enterLeftActive]: this.state.itemToShow === 2 && this.state.lastShownItem === 1 },
            { [styles.enterEnterActive]: this.state.itemToShow === 2 && this.state.lastShownItem === 3 },
            { [styles.enterLeftActive]: this.state.itemToShow === 3 && this.state.lastShownItem === 2 },
            { [styles.enterEnterActive]: this.state.itemToShow === 3 && this.state.lastShownItem === 4 },
            { [styles.enterLeftActive]: this.state.itemToShow === 4 && this.state.lastShownItem === 3 },
            { [styles.enterEnterActive]: this.state.itemToShow === 4 && this.state.lastShownItem === 5 },
            { [styles.lastEnterActive]: this.state.itemToShow === 5 },
            { [styles.enterLeftActive]: this.state.itemToShow === 4 && this.state.lastShownItem === 2 },
            { [styles.enterEnterActive]: this.state.itemToShow === 2 && this.state.lastShownItem === 4 },
            /*eslint-enable max-len*/
          ),
        }}
        transitionLeaveTimeout={300}
        transitionEnterTimeout={300}
      >
        { this.state.itemToShow === 1 ? this.props.firstItem : null }
        { this.state.itemToShow === 2 ? this.props.secondItem : null }
        { this.state.itemToShow === 3 ? this.props.thirdItem : null }
        { this.state.itemToShow === 4 ? this.props.fourthItem : null }
        { this.state.itemToShow === 5 ? this.props.fifthItem : null }
      </ReactCSSTransitionGroup>
    );
  }
}

export default Switcheroo;
export {
  styles,
};
