import React, { Component } from "react";
import PropTypes from "prop-types";

import AltImage from "../AltImage";
import styles from "./imageUploader.css";

class ImageUploader extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    file: "",
    imagePreviewUrl: "",
  }
  handleChange(e) {
    e.preventDefault();
    const reader = new window.FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.props.onSubmit(file);
    };
    reader.readAsDataURL(file);
  }
  upload() {
    document.getElementById("upload-avatar").click();
  }
  render() {
    return (
      <div className={styles.container}>
        {
          this.props.avatar ?
            <img
              src={this.props.avatar}
              alt="avatar"
              className={styles.avatar}
              onClick={this.upload}
            /> :
            <AltImage className={styles.altImg} onClick={this.upload} />
        }
        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <label htmlFor="upload-avatar" className={styles.label}>Change photo</label>
          <input
            type="file"
            className={styles.input}
            id="upload-avatar"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}


export default ImageUploader;
