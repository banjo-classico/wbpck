import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";

import ClosedInfo from "../ClosedInfo";
import DependantForm from "../DependantForm";
import Pending from "../Pending";
import ImageUploader from "../../../../components/ImageUploader";
import Deleter from "../../../Deleter";
import Alert from "../../../../libs/Alert";
import styles from "./dependantCard.css";

const getTopPosition = (index) => {
  if (index === 0) {
    return "0";
  }
  return `calc(${index * 6.4705}rem + ${15 * index}px)`;
};

class DependantCard extends Component {
  static propTypes = {
    dependant: PropTypes.object.isRequired,
    removeDependant: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
    overrideBackArrow: PropTypes.func.isRequired,
    addDependant: PropTypes.func.isRequired,
    addAvatar: PropTypes.func.isRequired,
    fetchDependants: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    addCustomIcon: PropTypes.func.isRequired,
    clearCustomIcon: PropTypes.func.isRequired,
    updateSuccess: PropTypes.bool.isRequired,
    toggleCta: PropTypes.func.isRequired,
    onCardClick: PropTypes.func.isRequired,
    toggleDeleter: PropTypes.func.isRequired,
    goToHome: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    someCardOpen: PropTypes.bool,
    isAdding: PropTypes.bool,
    isRemoving: PropTypes.bool,
    openDeleter: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.toggleCard = this.toggleCard.bind(this);
    this.changeBackArrow = this.changeBackArrow.bind(this);
  }
  state = {
    isOpen: false,
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isOpen &&
      nextProps.updateSuccess &&
      nextProps.updateSuccess !== this.props.updateSuccess
    ) {
      this.props.fetchDependants(this.props.token);
      Alert.success(`${this.props.dependant.FirstName}'s details have been updated.`);
    }
    if (nextProps.dependant !== this.props.dependant && this.state.isOpen) {
      this.props.changeHeader(`${nextProps.dependant.FirstName} ${nextProps.dependant.LastName}`);
    }
  }
  toggleCard() {
    this.props.onCardClick();
    this.setState({ isOpen: !this.state.isOpen });
    this.props.toggleCta();
    if (this.state.isOpen) {
      this.props.changeHeader("Dependants");
      this.props.overrideBackArrow(this.props.goToHome);
    } else {
      this.props.changeHeader(`${this.props.dependant.FirstName} ${this.props.dependant.LastName}`);
      this.changeBackArrow();
    }
  }
  changeBackArrow() {
    this.props.overrideBackArrow(this.toggleCard);
  }
  render() {
    const fullName = `${this.props.dependant.FirstName} ${this.props.dependant.LastName}`;
    return (
      <div
        className={classnames(
          styles.outerContainer,
          { [styles.hide]: !this.state.isOpen && this.props.someCardOpen },
          { [styles.openOuter]: this.state.isOpen },
        )}
        onClick={this.state.isOpen ? () => {} : this.toggleCard}
        style={{
          top: `${this.state.isOpen ? "0" : getTopPosition(this.props.index)}`,
          zIndex: `${this.state.isOpen ? 99 : 10 - this.props.index}`,
        }}
      >
        <div className={classnames({ [styles.midContainer]: this.state.isOpen })}>
          <div className={classnames(styles.container, { [styles.openCard]: this.state.isOpen })}>
            {!this.state.isOpen ? <ClosedInfo dependant={this.props.dependant} /> : null}
            {
              this.state.isOpen ?
                <ImageUploader
                  avatar={this.props.dependant.AvatarUrl}
                  onSubmit={this.props.addAvatar(this.props.token, this.props.dependant.Id)}
                /> :
                null
            }
            {
              this.state.isOpen ?
                <DependantForm
                  token={this.props.token}
                  dependant={this.props.dependant}
                  addDependant={this.props.addDependant}
                  addCustomIcon={this.props.addCustomIcon}
                  clearCustomIcon={this.props.clearCustomIcon}
                /> : null
            }
            {
              this.state.isOpen ?
                <button
                  className={styles.removeButton}
                  onClick={this.props.toggleDeleter}
                >
                    Remove dependant
                </button> : null
            }
          </div>
        </div>
        {
          this.props.openDeleter ?
            <Deleter
              headerText="remove this dependant?"
              headerFn={this.props.toggleDeleter}
              ctaFn={() => this.props.removeDependant(this.props.dependant.Id, this.props.token)}
              secondaryCtaFn={this.props.toggleDeleter}
              secondaryCtaText="No, don't remove this dependant."
              otherNote={
                <div>
                  The history of appointments made to <br />
                  <span className={styles.deleterName}>{fullName}</span>
                  will be deleted permanently and you won&#39;t be able to retrieve it later.
                </div>
              }
              detailsComponent={
                <div className={styles.deleterInfo}>
                  <div>{fullName}</div>
                  <div>{moment(this.props.dependant.DateOfBirth).format("DD / MM / YYYY")}</div>
                </div>
              }

            /> : null}
        {this.props.isRemoving ? <Pending /> : null}
      </div>
    );
  }
}

export default DependantCard;
