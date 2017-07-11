import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import AutoCompleteList from "../autoCompleteList";
import styles from "./practiceAutoComplete.css";
import { clinicPropType } from "../../../PracticeListings/propTypes";

class AutoComplete extends Component {
  static propTypes = {
    matchedPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    allPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    search: PropTypes.func.isRequired,
    successAction: PropTypes.func.isRequired,
    errorAction: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired,
    isWhiteBackground: PropTypes.bool,
    condition: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  state = {
    value: "",
  }
  onChange(e) {
    this.setState(
      { value: e.target.value },
      () => this.props.search(this.props.allPractices, this.state.value)
    );
  }
  render() {
    return (
      <div
        className={classnames(
        styles.container,
        { [styles.whiteContainer]: this.props.isWhiteBackground },
      )}
      >
        <input
          className={classnames(
            styles.input,
            { [styles.blackInput]: this.props.isWhiteBackground }
          )}
          placeholder="Type the practice name"
          value={this.state.value}
          onChange={this.onChange}
        />
        <AutoCompleteList
          practices={this.props.matchedPractices}
          allPractices={this.props.allPractices}
          value={this.state.value}
          isSearching={this.props.isSearching}
          successAction={this.props.successAction}
          listItemStyle={this.props.isWhiteBackground ? styles.blackItemStyle : ""}
          errorAction={this.props.errorAction}
          condition={this.props.condition}
        />
      </div>
    );
  }
}
export default AutoComplete;
