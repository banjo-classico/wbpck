import React, { Component } from "react";
import PropTypes from "prop-types";

import Switcheroo from "../../../../components/Switcheroo";
import Arrow from "../../../../svgs/rightarrow2.svg";
import PracticeList from "../../../Appointments/components/PracticeList";
import PracticeAutoComplete from "../../../AddNewPracticePage/components/PracticeAutoComplete";
import NotWithVensa from "../NotWithVensa";
import { clinicPropType } from "../../../PracticeListings/propTypes";
import styles from "./menuContainer.css";

class MenuContainer extends Component {
  static propTypes = {
    dependantFn: PropTypes.func.isRequired,
    practiceListingFn: PropTypes.func.isRequired,
    scriptFn: PropTypes.func.isRequired,
    goToBooking: PropTypes.func.isRequired,
    goToAddPractice: PropTypes.func.isRequired,
    practices: PropTypes.arrayOf(clinicPropType).isRequired,
    allPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    matchedPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    isSearching: PropTypes.bool,
    goToPractice: PropTypes.func.isRequired,
    token: PropTypes.string,
    searchPractices: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.togglePracticeList = this.togglePracticeList.bind(this);
  }
  state = {
    showError: false,
  }
  togglePracticeList() {
    this.setState({ showPracticeList: !this.state.showPracticeList });
  }
  handleSwitcheroo = (next, current) => {
    if (this.switcheroo) {
      this.switcheroo.setItemToShow(next, current);
    }
  }
  toggleErrorPopUp = () => {
    this.setState({
      showError: !this.state.showError,
    });
  }
  handleNotWithVensa = (practice) => {
    this.toggleErrorPopUp();
    this.setState({
      practiceNotWithVensa: practice,
    });
  }
  render() {
    return (
      <div className={styles.container}>
        <Switcheroo
          ref={c => { this.switcheroo = c; }}
          firstItem={
            <PracticeList
              practices={this.props.practices}
              goToBooking={this.props.goToBooking}
              otherPractice={() => this.handleSwitcheroo(2, 1)}
            />
          }
          secondItem={
            <div className={styles.autoCompleteContainer}>
              <Arrow className={styles.arrow} onClick={() => this.handleSwitcheroo(1, 2)} />
              <div>Choose your practice:</div>
              <PracticeAutoComplete
                search={this.props.searchPractices}
                allPractices={this.props.allPractices}
                matchedPractices={this.props.matchedPractices}
                isSearching={this.props.isSearching}
                successAction={this.props.goToPractice}
                errorAction={this.handleNotWithVensa}
                condition="IsUsingVensa"
              />
            </div>
          }
        />
        {this.state.showError &&
          <NotWithVensa
            practice={this.state.practiceNotWithVensa}
            arrowClick={this.toggleErrorPopUp}
          />
        }
      </div>
    );
  }
}

MenuContainer.propTypes = {

};

export default MenuContainer;
