import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import MessagesIcon from "../../../../svgs/envelope.svg";
import styles from "./messages.css";

const Messages = ({ onClick, className }) => (
  <div className={classnames(styles.container, className)}>
    <MessagesIcon className={styles.icon} onClick={onClick} />
  </div>
);

Messages.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.arrayOf(PropTypes.string),
};

export default Messages;
