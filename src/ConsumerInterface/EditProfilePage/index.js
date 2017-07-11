import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";

import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as appStyleActions } from "../../App/actions/actions";
import { actions as editActions } from "./actions/actions";
import EditProfileForm from "./components/editProfileForm";
import ImageUploader from "../../components/ImageUploader";
import LoadingSpinner from "../../components/loadingSpinner";
import styles from "./editProfilePage.css";
import { routeConfig } from "../../routes";

class EditProfilePage extends Component {
  static propTypes = {
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setDateOfBirth: PropTypes.func.isRequired,
    setMobile: PropTypes.func.isRequired,
    changeProfile: PropTypes.func.isRequired,
    changeProfileSuccess: PropTypes.bool.isRequired,
    goToChangePassword: PropTypes.func.isRequired,
    goToDeactivateAccount: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setHeading: PropTypes.func.isRequired,
    addCustomIcon: PropTypes.func.isRequired,
    clearCustomIcon: PropTypes.func.isRequired,
    addAppStyles: PropTypes.func.isRequired,
    addStyles: PropTypes.func.isRequired,
    clearAppStyles: PropTypes.func.isRequired,
    clearStyles: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    clearHeading: PropTypes.func.isRequired,
    clearEditProfile: PropTypes.func.isRequired,
    addAvatar: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    avatar: PropTypes.string,

  }
  componentDidMount() {
    this.props.addAppStyles([styles.app]);
    this.props.addStyles([styles.header]);
    this.props.setHeading(<div>{`${this.props.firstname} ${this.props.lastname}`}</div>);
    this.props.displayHeaderIcons({ menu: false, arrow: true });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.firstname !== this.props.firstname) {
      this.props.setHeading(<div>{`${nextProps.firstname} ${nextProps.lastname}`}</div>);
    }
  }
  componentWillUnmount() {
    this.props.clearHeading();
    this.props.clearAppStyles();
    this.props.clearStyles();
    this.props.clearEditProfile();
    this.props.displayHeaderIcons();
  }
  render() {
    return (
      <div className={styles.outerContainer}>
        <LoadingSpinner
          isFetching={this.props.isFetching}
          containerClassName={styles.container}
          iconClassName={styles.spinner}
          overlayClassName={styles.overlay}
        >
          <ImageUploader
            avatar={this.props.avatar}
            onSubmit={this.props.addAvatar(this.props.token)}
          />
          <EditProfileForm
            changeProfileSuccess={this.props.changeProfileSuccess}
            firstname={this.props.firstname}
            lastname={this.props.lastname}
            dateOfBirth={this.props.dateOfBirth}
            mobile={this.props.mobile}
            email={this.props.email}
            goHome={this.props.goHome}
            changeProfile={this.props.changeProfile}
            setFirstName={this.props.setFirstName}
            setLastName={this.props.setLastName}
            setDateOfBirth={this.props.setDateOfBirth}
            setMobile={this.props.setMobile}
            addCustomIcon={this.props.addCustomIcon}
            clearCustomIcon={this.props.clearCustomIcon}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={this.props.goToChangePassword}>
                change password
              </button>
            <button className={styles.button} onClick={this.props.goToDeactivateAccount}>
                deactivate account
              </button>
          </div>
        </LoadingSpinner>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  isFetching: state.profileReducer.isFetching ||
    state.editProfileReducer.isFetching ||
    state.editProfileReducer.isProcessingFile,
  changeProfileSuccess: state.editProfileReducer.success,
  firstname: state.editProfileReducer.firstname,
  lastname: state.editProfileReducer.lastname,
  dateOfBirth: state.editProfileReducer.dateOfBirth,
  mobile: state.editProfileReducer.mobile,
  email: state.editProfileReducer.email,
  avatar: state.editProfileReducer.avatar,
});
const mapDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  addStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearStyles: bindActionCreators(headerActions.clearStyles, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  addCustomIcon: bindActionCreators(headerActions.addCustomIcon, dispatch),
  clearCustomIcon: bindActionCreators(headerActions.clearCustomIcon, dispatch),
  addAppStyles: bindActionCreators(appStyleActions.addAppStyles, dispatch),
  clearAppStyles: bindActionCreators(appStyleActions.clearAppStyles, dispatch),
  setFirstName: bindActionCreators(editActions.setFirstName, dispatch),
  setLastName: bindActionCreators(editActions.setLastName, dispatch),
  setDateOfBirth: bindActionCreators(editActions.setDateOfBirth, dispatch),
  setMobile: bindActionCreators(editActions.setMobile, dispatch),
  clearEditProfile: bindActionCreators(editActions.clearEditProfile, dispatch),
  changeProfile: bindActionCreators(editActions.changeProfile, dispatch),
  addAvatar: (token) => (file) => bindActionCreators(editActions.addAvatar, dispatch)(file, token),
  // eslint-disable-next-line max-len
  goToChangePassword: () => bindActionCreators(push, dispatch)(routeConfig.passwordChange.getBrowserPath()),
  // eslint-disable-next-line max-len
  goToDeactivateAccount: () => bindActionCreators(push, dispatch)(routeConfig.deactivateAccount.getBrowserPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
