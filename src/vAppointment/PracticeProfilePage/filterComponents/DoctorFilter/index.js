import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash/fp";

import Icon from "../../../../svgs/searchIcon.svg";
import { filterDoctors } from "../../filterFunctions";
import styles from "./doctorFilter.css";

class DoctorFilter extends Component {
  static propTypes = {
    filterDoctors: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.onChange = debounce(300, this.onChange.bind(this));
  }
  onChange() {
    this.props.filterDoctors(filterDoctors(this.input.value), this.input.value);
  }
  render() {
    return (
      <div className={styles.outerContainer}>
        <div>Practitioner:</div>
        <div className={styles.container}>
          <input
            ref={c => { this.input = c; }}
            className={styles.input}
            type="text"
            placeholder="Name"
            onChange={this.onChange}
          />
          <Icon className={styles.icon} />
        </div>
      </div>
    );
  }
}

export default DoctorFilter;
