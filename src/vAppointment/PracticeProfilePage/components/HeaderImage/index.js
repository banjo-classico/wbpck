import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./headerImage.css";

const getWidth = (width) => {
  if (width !== 1440) return "1200px";
  return "100%";
};

class HeaderImage extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleOnLoad = this.handleOnLoad.bind(this);
  }
  state = {
    width: "",
    height: "",
    hideImg: false,
  }
  componentDidMount() {

  }
  handleOnLoad(e) {
    this.setState({
      width: getWidth(e.target.offsetWidth),
      height: "460px",
      hideImg: true,
    });
  }
  render() {
    return (
      <div
        style={this.state.hideImg ? {
          backgroundImage: `url(${this.props.url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: this.state.width,
          height: this.state.height,
        } : null}
        className={styles.container}
      >
        {
          this.state.hideImg ?
          null :
          <img
            style={{ width: this.state.width, height: this.state.height }}
            className={styles.img}
            src={this.props.url}
            onLoad={this.handleOnLoad}
            alt="clinic"
          />
        }
      </div>
    );
  }
}

export default HeaderImage;
