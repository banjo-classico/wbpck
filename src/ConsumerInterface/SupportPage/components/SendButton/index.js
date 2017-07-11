import React from "react";
import PropTypes from "prop-types";

import LoadingSpinner from "../../../../components/loadingSpinner";
import styles from "./sendButton.css";

const SendButton = ({ isSending }) => (
  <button type="submit" className={styles.button}>
    <LoadingSpinner
      isFetching={isSending}
      iconClassName={styles.spinner}
      containerClassName={styles.spinnerContainer}
    >
      {isSending ? null : <span>Send Message</span>}
    </LoadingSpinner>
  </button>
);

SendButton.propTypes = {
  isSending: PropTypes.bool.isRequired,
};

export default SendButton;
