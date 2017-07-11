import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { map } from "lodash/fp";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as scriptActions } from "../RequestScript/actions/actions";
import { actions } from "./actions/actions";
import Plus from "../../svgs/plus.svg";
import MainPageLayout from "../components/MainPageLayout";
import CtaButton from "../../components/CtaButton";
import PickUpOption from "./components/PickUpOption";
import Spinner from "../../svgs/spinner.svg";
import styles from "./pickUpSelection.css";
import { routeConfig } from "../../routes";
import { pricingOptionPropType } from "./propTypes";

class PickUpSelection extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    setInfo: PropTypes.func.isRequired,
    fetchPickUpOptions: PropTypes.func.isRequired,
    goToPrescriptions: PropTypes.func.isRequired,
    goToAddPharmacy: PropTypes.func.isRequired,
    goToConfirm: PropTypes.func.isRequired,
    pickUpOptions: PropTypes.arrayOf(pricingOptionPropType),
    token: PropTypes.string.isRequired,
    isFetching: PropTypes.bool,
  }
  state = {
    selectedOption: {},
  }
  componentDidMount() {
    this.props.fetchPickUpOptions(this.props.practice.Id, this.props.token);
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.setHeading(<div />);
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.displayHeaderIcons();
  }
  handleOptionClick = (option) => () => {
    this.setState({ selectedOption: option });
  }
  handleCtaClick = () => {
    this.props.setInfo("pricing", this.state.selectedOption);
    this.props.goToConfirm();
  }
  render() {
    const { isFetching, goToAddPharmacy, goToPrescriptions, pickUpOptions } = this.props;
    return (
      <MainPageLayout>
        <div className={styles.heading}>
          Where would you like to collect your prescription from?
        </div>
        <div className={styles.pickUpOptions}>
          {isFetching && <Spinner className={styles.spinner} />}
          {
            map(
              o =>
                <PickUpOption
                  key={o.Option}
                  option={o}
                  selected={this.state.selectedOption.Option === o.Option}
                  onClick={this.handleOptionClick(o)}
                />,
                pickUpOptions,
            )
          }
        </div>
        <button className={styles.addPharmacy} onClick={goToAddPharmacy}>
          <Plus className={styles.plus} />
          Add your preferred pharmacy
        </button>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={goToPrescriptions}>
            Cancel
          </button>
          <CtaButton active className={styles.cta} onClick={this.handleCtaClick} />
        </div>
      </MainPageLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  practice: state.scriptDetailsReducer.practice,
  pickUpOptions: state.pickUpOptionsReducer.options,
  isFetching: state.pickUpOptionsReducer.isFetching,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  setInfo: bindActionCreators(scriptActions.setInfo, dispatch),
  fetchPickUpOptions: bindActionCreators(actions.fetchPickUpOptions, dispatch),
  // eslint-disable-next-line max-len
  goToAddPharmacy: () => bindActionCreators(push, dispatch)(routeConfig.addPharmacy.getBrowserPath()),
  goToPrescriptions: () => bindActionCreators(push, dispatch)(routeConfig.home.getBrowserPath()),
  goToConfirm: () => bindActionCreators(push, dispatch)(routeConfig.confirmRequest.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PickUpSelection);
export {
  styles,
};
