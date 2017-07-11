import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions } from "./actions/actions";
import { actions as headerActions } from "../../components/header/actions/actions";
import MainPageLayout from "../components/MainPageLayout";
import AddPharmacyForm from "./components/AddPharmacyForm";
import styles from "./addPharmacy.css";

class AddPharmacy extends Component {
  static propTypes = {
    setHeading: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    addPharmacy: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, arrow: true });
    this.props.setHeading("Add Pharmacy");
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.displayHeaderIcons();
  }
  render() {
    return (
      <MainPageLayout>
        <div className={styles.container}>
          <AddPharmacyForm
            addPharmacy={this.props.addPharmacy(this.props.token)}
          />
        </div>
      </MainPageLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  /* eslint-disable max-len*/
  addPharmacy: (token) => (details) => bindActionCreators(actions.addPharmacy, dispatch)(details, token),
  /*eslint-enable max-len*/
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPharmacy);
export {
  styles,
};
