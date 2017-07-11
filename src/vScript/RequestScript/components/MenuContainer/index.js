import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { find } from "lodash/fp";

import Switcheroo from "../../../../components/Switcheroo";
import Arrow from "../../../../svgs/rightarrow2.svg";
import List from "../List";
import PracticeAutoComplete from "../../../../ConsumerInterface/AddNewPracticePage/components/PracticeAutoComplete";
import ScriptDisabled from "../ScriptDisabled";
import { actions as scriptActions } from "../../actions/actions";
import { isSaf } from "../../../../libs/BrowserDetection";
import { clinicPropType } from "../../../../ConsumerInterface/PracticeListings/propTypes";
import { profilePropType } from "../../../../ConsumerInterface/MainShell/propTypes";
import { dependantPropType } from "../../propTypes";
import styles from "./menuContainer.css";

class MenuContainer extends Component {
  static propTypes = {
    isSearching: PropTypes.bool.isRequired,
    matchedPractices: PropTypes.arrayOf(clinicPropType).isRequired,
    isSearching: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    patients: PropTypes.arrayOf(PropTypes.oneOfType([profilePropType, dependantPropType]))
  }
  state = {
    showError: false,
    isFetchingDoctors: false,
  }
  handleSwitcheroo = (next, last) => {
    if (this.switcheroo) {
      this.switcheroo.setItemToShow(next, last);
    }
  }
  toggleErrorPopUp = () => {
    this.setState({
      showError: !this.state.showError,
    });
  }
  handleNoScript = (practice) => {
    this.toggleErrorPopUp();
    this.setState({
      practiceNoScript: practice,
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
            <div className={styles.listContainer}>
              <List
                heading="Who for?"
                options={this.props.patients}
                optionOnClick={(o) => {
                  this.props.setInfo("patient", o);
                  this.handleSwitcheroo(2, 1);
                }}
                dontShowArrow
              />
            </div>
          }
          secondItem={
            <div className={styles.listContainer}>
              <List
                lastOption="Other Practice"
                lastOptionFn={() => this.handleSwitcheroo(3, 2)}
                heading="Where?"
                options={this.props.practices}
                arrowFn={() => this.handleSwitcheroo(1, 2)}
                optionOnClick={(o) => {
                  this.props.setInfo("practice", o)
                  this.props.fetchDoctors(o.Id, this.props.token)
                  this.handleSwitcheroo(4, 2)
                }}
              />
            </div>
          }
          thirdItem={
            <div className={styles.otherPracticeContainer}>
              <Arrow className={styles.backArrow} onClick={() => this.handleSwitcheroo(2, 3)} />
              <div className={styles.where}>Where?</div>
              <PracticeAutoComplete
                search={this.props.search}
                allPractices={this.props.allPractices}
                matchedPractices={this.props.matchedPractices}
                isSearching={this.props.isSearching}
                errorAction={this.handleNoScript}
                arrowFn={() => this.handleSwitcheroo(2, 3)}
                successAction={(o) => {
                  this.props.setInfo("practice", o);
                  this.props.fetchDoctors(o.Id, this.props.token);
                  this.handleSwitcheroo(4, 3);
                }}
                condition="ScriptEnabled"
              />
            </div>
          }
          fourthItem={
            <div className={styles.listContainer}>
              <List
                lastOption="Any Doctor"
                lastOptionFn={() => {
                  this.props.setInfo("doctor", { Name: "Any Doctor", Id: "0" });
                  this.props.goToAddMedications();
                }}
                heading="Which doctor?"
                options={this.props.doctors}
                arrowFn={() => this.handleSwitcheroo(2, 4)}
                optionOnClick={(o) => {
                  this.props.setInfo("doctor", o);
                  this.props.goToAddMedications();
                }}
              />
            </div>
          }
        />
        {this.state.showError &&
          <ScriptDisabled
            practice={this.state.practiceNoScript}
            arrowClick={this.toggleErrorPopUp}
          />
        }
      </ReactCSSTransitionGroup>
    );
  }
}

export default MenuContainer;
