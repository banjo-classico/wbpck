import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import { map } from "lodash/fp";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "./tabs.css";

Tabs.setUseDefaultStyles(false);
// need index in this file specifically
const mapWithIndex = map.convert({ cap: false });

class StormTabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    labelListClassName: PropTypes.string,
    activeLabelClassName: PropTypes.string,
    activePanelClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    activeContentClassName: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
      labelClassName: PropTypes.string,
      contentClassName: PropTypes.string,
    })),
    initialSelectedIndex: PropTypes.number,
  }
  static defaultProps = {
    initialSelectedIndex: 0,
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getPanelClassnames = this.getPanelClassnames.bind(this);
  }
  state = {
    selectedIndex: this.props.initialSelectedIndex,
    prevIndex: this.props.initialSelectedIndex,
  }
  getPanelClassnames(index, className) {
    return classnames({
      [styles.right]: this.state.prevIndex > index,
      [styles.left]: this.state.prevIndex < index,
      [styles.activePanel]: this.state.selectedIndex === index,
      // eslint-disable-next-line max-len
      [this.props.activeContentClassName]: this.state.selectedIndex === index && this.props.activePanelClassName,
    }, this.props.contentClassName, className);
  }
  handleChange(next, prev) {
    this.setState({
      selectedIndex: next,
      prevIndex: prev,
    });
  }
  render() {
    return (
      <Tabs
        onSelect={this.handleChange}
        className={classnames(this.props.className)}
        selectedIndex={this.state.selectedIndex}
      >
        <TabList
          className={classnames(styles.tabList, this.props.labelListClassName)}
          activeTabClassName={classnames(styles.selected, this.props.activeLabelClassName)}
        >
          {
            map(({ label, labelClassName }) => (
              <Tab
                className={classnames(styles.tabItem, this.props.labelClassName, labelClassName)}
                key={Math.random()}
              >{label}</Tab>
            ))(this.props.data)
          }
        </TabList>
        {
          mapWithIndex(({ content, contentClassName }, i) => (
            <TabPanel
              className={this.getPanelClassnames(i, contentClassName)}
              key={i}
            >
              {content}
            </TabPanel>
          ))(this.props.data)
        }
      </Tabs>
    );
  }
}

export default StormTabs;
