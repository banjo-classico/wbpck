import React from "react";
import PropTypes from "prop-types";
import times from "lodash/times";
import classnames from "classnames";

import styles from "./pageNav.css";

const PageNav = ({ total, currentIndex, className, itemClassName, selectedItemClassName }) => {
  const getItemClassNames = (cur, selected) => classnames(
    styles.item,
    itemClassName,
    {
      [styles.selected]: cur === selected,
      [selectedItemClassName]: cur === selected,
    }
  );
  return (
    <div className={classnames(styles.pageNav, className)}>
      {
        times(total, (i) =>
          <div
            key={i}
            className={getItemClassNames(i, currentIndex)}
          >&nbsp;</div>)
       }
    </div>
  );
};

PageNav.propTypes = {
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  selectedItemClassName: PropTypes.string,
  total: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export default PageNav;
export {
  styles,
};
