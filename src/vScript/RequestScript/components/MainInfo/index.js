import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";

import CardHeading from "../CardHeading";
import Medications from "../Medications";
import styles from "./mainInfo.css";
import { scriptPropType } from "../../propTypes";

const formatPrice = (price) => {
  const dollars = price.slice(0, 2);
  const cents = price.slice(2);
  return `${dollars}.${cents}`;
};
const MainInfo = ({ script, isOpen, past }) => (
  <div
    className={classnames(
      styles.container,
      { [styles.pastContainer]: past && !isOpen },
      { [styles.openContainer]: isOpen },
    )}
  >
    {!isOpen && <div className={styles.date}>{moment(script.DateTime).format("DD/MM/YY")}</div>}
    <CardHeading script={script} isOpen={isOpen} />
    <Medications meds={script.FreeFormMedications} isOpen={isOpen} />
    {
      isOpen && script.Pricing &&
        <div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Pick up location:</div>
            <div className={styles.place}>{script.Pricing.Name}</div>
            <div className={styles.place}>{script.Pricing.Address}</div>
            <div className={styles.contact}>
              {`Fax: ${script.Pricing.Fax} - Phone: ${script.Pricing.Phone}`}
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Payment details:</div>
            <div className={styles.priceTime}>
              <div>Prescription request</div>
              <div>{`$ ${formatPrice(script.Pricing.Price.toString())}`}</div>
            </div>
            {
              script.IsRed &&
                <div className={styles.discount}>
                  <div>Discount ( Request declined )</div>
                  <div>{`- $ ${formatPrice(script.Pricing.Price.toString())}`}</div>
                </div>
            }
            <div className={styles.totalPayment}>
              <div>Pay at the practice:</div>
              <div>
                {script.IsRed ? "$ 0.00" : `$ ${formatPrice(script.Pricing.Price.toString())}`}
              </div>
            </div>
          </div>
        </div>
    }
  </div>
);

MainInfo.propTypes = {
  script: scriptPropType,
  isOpen: PropTypes.bool.isRequired,
};

export default MainInfo;
