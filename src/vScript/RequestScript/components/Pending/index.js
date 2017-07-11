import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";

import CardBanner from "../CardBanner";
import styles from "./pending.css";
import { detailsPropType } from "../../propTypes";

const getBorderStyle = (isOpen, isMessage, isRed) => {
  if (isOpen && isMessage) {
    if (isRed) return { borderLeft: "3px solid #FF6A65" };
    return { borderLeft: "3px solid #23C373" };
  }
  return {};
};

const Pending = ({ details, status, isRed, isOpen }) => (
  <div
    className={classnames(styles.container, { [styles.openContainer]: isOpen })}
    style={getBorderStyle(isOpen, details.Message, isRed)}
  >
    <CardBanner
      status={status}
      isRed={isRed}
    />
    {
        details &&
          <div>
            {isOpen && <div className={styles.description}>{details.Message}</div>}
            {
              isOpen &&
                <div className={styles.practice}>
                  {`From ${details.OrganisationName} on ${moment(details.Time).format("DD/MM/YY")}`}
                </div>
            }
          </div>
      }
  </div>
  );

Pending.propTypes = {
  status: PropTypes.string,
  isRed: PropTypes.bool,
  details: detailsPropType,
  isOpen: PropTypes.bool,
};

export default Pending;
