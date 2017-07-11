import React from "react";
import PropTypes from "prop-types";

import Radio from "../../../components/Radio";
import styles from "./pickUpOption.css";
import { pricingOptionPropType } from "../../propTypes";

const formatPrice = (price) => {
  const dollars = price.slice(0, 2);
  const cents = price.slice(2);
  return `${dollars}.${cents}`;
};

const PickUpOption = ({ option, selected, onClick }) => (
  <div className={styles.container}>
    <Radio onClick={onClick} selected={selected} />
    <div className={styles.details}>
      <div className={styles.name}>{option.Name}</div>
      <div className={styles.priceTime}>
        {`$${formatPrice(option.Price.toString())} - collect in ${option.Note}h`}
      </div>
    </div>
  </div>
);

PickUpOption.propTypes = {
  option: pricingOptionPropType,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PickUpOption;
