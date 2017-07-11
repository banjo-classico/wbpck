import React from "react";
import PropTypes from "prop-types";

import styles from "./scriptdisabled.css";
import Arrow from "../../../../svgs/rightarrow2.svg";
import icon from "../../../../images/notEnrolled.png";
import CallPractice from "../../../../components/CallPractice";

const ScriptDisabled = ({
  practice,
  arrowClick,
 }) => (
   <div className={styles.container}>
     <Arrow className={styles.arrow} onClick={arrowClick} />
     <div className={styles.whoops}>Whoops!</div>
     <div className={styles.popUpContainer}>
       <div className={styles.popUp}>
         <img src={icon} alt="hospital" className={styles.icon} />
         <div className={styles.message}>
           {practice.Name} hasn&#39;t enabled this service for you at this moment. <br />
           <br />
          If you wish to request your prescriptions online, you can help us to enable it
          for you by calling your practice and asking them to activate their Vensa
           Online Script Request.<br />
           <br />
          It&#39;s FREE, forever.
        </div>
         <CallPractice practice={practice} />
       </div>
     </div>
   </div>
);

ScriptDisabled.propTypes = {
  // practice:
  arrowClick: PropTypes.func.isRequired,
};

export default ScriptDisabled;
