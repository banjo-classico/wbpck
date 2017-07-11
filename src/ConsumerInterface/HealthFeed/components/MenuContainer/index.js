import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Switcheroo from "../../../../components/Switcheroo";
import Arrow from "../../../../svgs/rightarrow2.svg";
import PracticeAutoComplete from "../../../AddNewPracticePage/components/PracticeAutoComplete";
import Menu from "../Menu";
import PracticeList from "../../../Appointments/components/PracticeList";
import NotWithVensa from "../../../Appointments/components/NotWithVensa";
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
    searchPractices: PropTypes.func.isRequired,
    allPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    matchedPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    isSearching: PropTypes.bool,
    goToPractice: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  }
  state = {
    showError: false,
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
      <ReactCSSTransitionGroup
        component="div"
        className={styles.container}
        transitionName={{
          leave: styles.leave,
          leaveActive: styles.leaveActive,
          enter: styles.enter,
          enterActive: styles.enterActive,
        }}
        transitionLeaveTimeout={300}
        transitionEnterTimeout={300}
      >
        <Switcheroo
          ref={c => { this.switcheroo = c; }}
          firstItem={
            <Menu
              appointmentsFn={() => this.handleSwitcheroo(2, 1)}
              dependantFn={this.props.dependantFn}
              practiceListingFn={() => this.props.goToAddPractice()}
              scriptFn={this.props.scriptFn}
            />
          }
          secondItem={
            <PracticeList
              showArrow
              arrowClick={() => this.handleSwitcheroo(1, 2)}
              practices={this.props.practices}
              goToBooking={this.props.goToBooking}
              otherPractice={() => this.handleSwitcheroo(3, 2)}
            />
          }
          thirdItem={
            <div className={styles.autoCompleteContainer}>
              <Arrow className={styles.arrow} onClick={() => this.handleSwitcheroo(2, 3)} />
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
      </ReactCSSTransitionGroup>
    );
  }
}

MenuContainer.propTypes = {

};

export default MenuContainer;
