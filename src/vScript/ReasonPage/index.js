import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as scriptDetailsActions } from "../RequestScript/actions/actions";
import MainPageLayout from "../components/MainPageLayout";
import ReasonForm from "./components/ReasonForm";
import CtaButton from "../../components/CtaButton";
import styles from "./reasonPage.css";
import { routeConfig } from "../../routes";

class ReasonPage extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    goToPickUpSelection: PropTypes.func.isRequired,
    addReason: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.setHeading(<div />);
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.displayHeaderIcons();
  }
  render() {
    return (
      <MainPageLayout>
        <div className={styles.heading}>
        What&#39;s the reason for<br />
        your request?
      </div>
        <div className={styles.reasonForm}>
          <ReasonForm
            addReason={this.props.addReason}
          />
        </div>
        <div className={styles.buttons}>
          <div className={styles.note}>
          Note that practice staff can<br /> view this information
        </div>
          <CtaButton active className={styles.cta} onClick={this.props.goToPickUpSelection} />
        </div>
      </MainPageLayout>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  goToPickUpSelection: () => bindActionCreators(push, dispatch)(routeConfig.pickUpSelection.getBrowserPath()),
  addReason: bindActionCreators(scriptDetailsActions.setInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReasonPage);
export {
  styles,
};
