/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import styles from "./privacyPolicy.css";
import Close from "../../svgs/close.svg";

const PrivacyPolicy = ({ handleClick }) => (
  <div className={styles.container}>
    <div className={styles.headerContainer}>
      <div className={styles.header}>Privacy Policy</div>
      <hr className={styles.hr} />
    </div>
    <div className={styles.textContainer}>
      <div className={styles.div}>Please read these terms and conditions carefully. If you don&#39;t agree with them you should not use our website, applications, or our products and services.<br />We may amend this Privacy Policy from time to time by posting the revised version on our Website and Application. We will provide you with reasonable notice of any changes by email or push notification. If you do not agree to any amendments, you should notify us and we will arrange for your personal information to be removed and your User Account (if you have one) to be closed. You may no longer use our website, applications, or our products and services after the date that any amendment takes effect.</div>
      <div className={styles.heading}>1. Introduction</div>
      <div className={styles.div}>1.1 We are committed to safeguarding our customers&#39; personal information. Like all companies operating in New Zealand, we are bound by the privacy principles set out in the Privacy Act 1993, together with the requirements of the Health Information Privacy Code 1994.</div>
      <div className={styles.heading}>2. What personal information may we collect and why?</div>
      <div className={styles.div}>2.1 We collect personal information about you in order to enable you to register for our services and to use our website, applications, and any products or services that we provide to you. The personal information we collect may include your name, address, gender, job title, organisation, telephone numbers and email address.</div>
      <div className={styles.div}>2.2 We may also collect health information provided by you, such as your medical history, symptoms, lab results, medication and prescription details, and health services you are currently being or have been provided. This information enables us to provide you with information about our products, contact you about our products and services and provide our products and services to you.</div>
      <div className={styles.div}>2.3 Subject to your Health Provider’s privacy policy, we may also collect health information about you from your Health Provider. The health information that we may collect from your Health Provider includes name, date of birth, contact details and patient number.</div>
      <div className={styles.div}>2.4 In some situations, we may collect someone else’s personal information from you. For example, we may collect your child’s personal information when you book an appointment on their behalf. Before providing us any Dependant’s personal information (other than your child) you must:</div>
      <div className={styles.minor}>(a) ensure the contents of this Privacy Policy are bought to their attention; and</div>
      <div className={styles.minor}>(b) ensure you receive their prior permission to the collection, use, disclosure, storage and retention of their personal information in accordance with this Privacy Policy.</div>
      <div className={styles.div}>2.5 If you do not provide us with certain information where required, you may not be able to access our website, applications, products or services.</div>
      <div className={styles.heading}>3. How we may use that personal information</div>
      <div className={styles.div}>3.1 The personal information that we collect may be used by us to provide our products and services to you, including:</div>
      <div className={styles.minor}>(a) processing your request to use our website or other applications and registering your information on our data base;</div>
      <div className={styles.minor}>(b) providing you with demonstrations of our products as requested by you;</div>
      <div className={styles.minor}>(c) providing you with our services, including contacting you with notifications about appointments or regarding your health</div>
      <div className={styles.minor}>(d) billing you or administering your User Account and/or any other account that you hold with us;</div>
      <div className={styles.minor}>(e) responding to requests, enquiries, or complaints and other customer care related activities;</div>
      <div className={styles.minor}>(f) carrying out market and product analysis (including analyzing patterns of use in relation to our products and services, our website and applications, and your use of them) for the purposes of developing and amending marketing and business strategies;</div>
      <div className={styles.minor}>(g) subject to you providing your consent (in accordance with the Unsolicited Electronic Messages Act 2007) sending you messages to promote and market our products and services;</div>
      <div className={styles.minor}>(h) contacting you about our services;</div>
      <div className={styles.minor}>(i) carrying out any activity in connection with a legal, governmental or regulatory requirement or in connection with legal proceedings, crime, or fraud prevention, detection or prosecution; and</div>
      <div className={styles.minor}>(j) conducting research relevant to public health (provided that any information will be analyzed in an anonymous and aggregated form), and compiling and analyzing statistics relevant to public health, all in a manner permitted by New Zealand law.</div>
      <div className={styles.div}>3.2 We will not use personal information for purposes other than described above, unless:</div>
      <div className={styles.div}>(a) we have your consent (or the consent of the person whose personal information you have provided); or</div>
      <div className={styles.div}>(b) we are required to do so by law.</div>
      <div className={styles.heading}>4. Sharing your personal information</div>
      <div className={styles.div}>We will only disclose personal information in accordance with this Privacy Policy, in accordance with your specific instructions or authorization, and/or in accordance with the specific instructions or authorization of the person whose personal information you have provided. We may disclose your personal information to:</div>
      <div className={styles.minor}>(a) another company in the Vensa group of companies, who may use your information for the same purposes as us.</div>
      <div className={styles.minor}>(b) Health Providers (and any other healthcare providers and medical professionals such as doctors and pharmacies) with whom you: (i) have requested an appointment; (ii) have registered as a patient or customer; and/or (iii) requested products and services, using our services, products, website or applications.</div>
      <div className={styles.minor}>(c) our service providers that are providing a service to you or us in relation to our website, applications or services, for example, third party payment providers or our IT service providers.</div>
      <div className={styles.minor}>(d) Third parties (including as part of a data sale) in an aggregated and anonymised form.</div>
      <div className={styles.heading}>5. Security and storage of your personal information</div>
      <div className={styles.div}>We will take reasonable steps to ensure that the personal information that we hold is accurate, complete, up-to date, stored in a secure environment, and protected from unauthorized access, modification or disclosure.</div>
      <div className={styles.div}>Some information, particularly health information, must be kept for a number of years to comply with legal requirements, such as health records legislation.</div>
      <div className={styles.heading}>6. How to access and correct your personal information</div>
      <div className={styles.div}>You (or the person whose personal information you have provided) can request access to or correction of your (or their) personal information by contacting us using the details in clause 7 below. We will process such requests within a reasonable time and may require payment of reasonable charges incurred by us in complying with such requests.</div>
      <div className={styles.heading}>7. How to contact us</div>
      <div className={styles.div}>If you have any queries or concerns about our privacy policy or our handling of your personal information please contact us at Vensa Health Limited at P.O Box 8349, Symonds Street, Auckland, New Zealand, attention Vensa Privacy Officer or call us on +64 9 0800 736 463 or email us on support@vensa.com.</div>
      <div className={styles.heading}>8. DEFINED TERMS</div>
      <div className={styles.div}>Unless the context otherwise requires, in this Privacy Policy the following terms have the following meanings:</div>
      <div className={styles.minor}>(a) “personal information” means any information about an identifiable individual, including health information;</div>
      <div className={styles.minor}>(b) &quot;we&quot;, &quot;us&quot; and &quot;our&quot; means Vensa Health Limited, and may include any company within the group of companies of which Vensa Health Limited forms part, as well as its affiliates, officers and employees; and</div>
      <div className={styles.minor}>(c) &quot;you&quot; means you, whether an individual, company or other form of entity.</div>
    </div>
    <button className={styles.button} onClick={handleClick}><Close className={styles.closeIcon} /></button>
  </div>
);
PrivacyPolicy.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default PrivacyPolicy;
export {
  styles,
};
/* eslint-enable max-len */
