import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Textarea from "react-textarea-autosize";
import { defer, debounce } from "lodash/fp";

import styles from "./reasonForm.css";

class ReasonForm extends Component {
  static propTypes = {
    addReason: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.addReason = debounce(500, this.addReason.bind(this));
  }
  componentDidMount() {
    defer(() => this.textarea._resizeComponent());
  }
  onChange() {
    this.addReason(this.textarea.value);
  }
  addReason(reason) {
    this.props.addReason("reason", reason);
  }
  render() {
    return (
      <div className={styles.container}>
        <form className={styles.feelingForm}>
          <Textarea
            placeholder={"I'm requesting because..."}
            onChange={this.onChange}
            ref={c => { this.textarea = c; }}
            className={styles.textarea}
          />
        </form>
      </div>
    );
  }
}
export default ReasonForm;
export {
  styles,
};
