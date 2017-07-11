import React from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";

import styles from "./addPracticeButton.css";
import StethoscopeIcon from "../../svgs/stethoscope.svg";
import AddIcon from "../../svgs/add.svg";
import { routeConfig } from "../../routes";

const AddPracticeButton = ({ onClick, className }) => (
  <a className={classnames(styles.button, className)} onClick={onClick}>
    <div className={styles.container}>
      <StethoscopeIcon className={styles.icon} />
      <span className={styles.text}>Add new practice</span>
      <AddIcon className={styles.addIcon} />
    </div>
  </a>
);
AddPracticeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const mapStateToProps = () => ({
});
const mapDispatchToProps = (dispatch) => ({
  onClick: () => bindActionCreators(push, dispatch)(routeConfig.practiceSelection.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPracticeButton);
