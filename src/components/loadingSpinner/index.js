import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import styles from "./loadingSpinner.css";
import LoadingIcon from "../../svgs/spinner.svg";
import HeaderIcon from "../../svgs/headerSpinner.svg";

const Loading = ({
  isFetching,
  children,
  showAlternativeSpinner,
  containerClassName,
  iconClassName,
  overlayClassName,
  contentRef,
  component,
  style,
}) => {
  const SpinnerIcon = showAlternativeSpinner ? HeaderIcon : LoadingIcon;
  return (
    <ReactCSSTransitionGroup
      style={style}
      component={component && component}
      transitionName={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        leave: styles.leave,
        leaveActive: styles.leaveActive,
      }}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={500}
      className={classnames(styles.loadingContainer, containerClassName)}
      ref={contentRef}
    >
      { isFetching ?
        <div
          className={classnames(styles.overlayContainer, overlayClassName)}
        >
          <SpinnerIcon
            key="spinner"
            className={classnames(styles.loadingIcon, iconClassName)}
          />
        </div>
        : null
      }
      { children }
    </ReactCSSTransitionGroup>
  );
};

Loading.propTypes = {
  isFetching: PropTypes.bool,
  children: PropTypes.node,
  showAlternativeSpinner: PropTypes.bool,
  containerClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  component: PropTypes.string,
  style: PropTypes.object,
  contentRef: PropTypes.func,
  overlayClassName: PropTypes.string,
};
export default Loading;
export {
  styles,
};
