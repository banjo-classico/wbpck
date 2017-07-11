import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./ctaMenuButton.css";

class CtaMenuButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    iconStyles: PropTypes.string,
    textIconStyles: PropTypes.string,
    buttonStyles: PropTypes.string,
    text: PropTypes.string,
    isOpen: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    isOpen: this.props.isOpen,
  }
  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  handleClick() {
    this.toggleOpen();
    this.props.onClick();
  }
  render() {
    return (
      <div className={classnames(styles.container, this.props.buttonStyles)}>
        <button
          className={classnames(styles.button, { [styles.open]: this.state.isOpen })}
          onClick={this.handleClick}
        >
          <this.props.icon
            className={classnames(
              this.props.iconStyles,
              { [styles.openIcon]: this.state.isOpen },
              { [this.props.textIconStyles]: this.props.text && !this.state.isOpen },
            )}
          />
          {
            !this.state.isOpen && this.props.text ?
              <div className={styles.text}>{this.props.text}</div> :
            null
          }
        </button>
      </div>
    );
  }
}

export default CtaMenuButton;
