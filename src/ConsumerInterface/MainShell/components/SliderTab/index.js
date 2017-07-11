import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./sliderTab.css";

// stateless components can't user refs
class SliderItem extends Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    selectedTab: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  render() {
    return (
      <button
        className={classnames(styles.item,
          { [styles.active]: this.props.selectedTab.text === this.props.tab.text })}
        onClick={this.props.onClick}
      >
        {this.props.tab.text}
      </button>
    );
  }
}

export default SliderItem;
