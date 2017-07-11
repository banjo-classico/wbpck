import React, { Component, PropTypes } from "react";
import { findDOMNode } from "react-dom";
import SliderTab from "../SliderTab/index";
import styles from "./slider.css";

class Slider extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    setRenderedComponent: PropTypes.func.isRequired,
    selectedTab: PropTypes.object.isRequired,
  };
  state = {
    selectedTab: this.props.selectedTab,
  };
  scrollToTab = (tabText) => {
    const tab = findDOMNode(this[tabText]);
    const slider = findDOMNode(this.slider);
    const tabDimensions = tab.getBoundingClientRect();
    const sliderDimensions = slider.getBoundingClientRect();

    let difference = 0;
    if (tabDimensions.right > sliderDimensions.right) {
      difference = tabDimensions.right - sliderDimensions.right;
    } else if (tabDimensions.left < sliderDimensions.left) {
      difference = tabDimensions.left - sliderDimensions.left;
    }
    slider.scrollLeft += difference;
  };
  handleClick = (tab, index) => () => {
    this.setState({
      selectedTab: tab,
    });
    this.props.setRenderedComponent(tab, index);
    this.scrollToTab(tab.text);
  }
  render() {
    return (
      <div
        ref={(slider) => { this.slider = slider; }}
        className={styles.container}
      >
        {this.props.tabs.map((tab, i) =>
          <SliderTab
            tab={tab}
            ref={c => { this[`${tab.text}`] = c; }}
            selectedTab={this.state.selectedTab}
            onClick={this.handleClick(tab, i)}
            key={tab.text}
          />
        )}
      </div>
    );
  }
}

export default Slider;
