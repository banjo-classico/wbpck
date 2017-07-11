/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import styles from "./termsandConditions.css";
import Close from "../../svgs/close.svg";

const TermsandConditions = ({ handleClick }) => (
  <div className={styles.container}>
    <div className={styles.headerContainer}>
      <div className={styles.header}>Terms and conditions</div>
      <hr className={styles.hr} />
    </div>
    <div className={styles.textContainer}>
      <div>Welcome to Vensa.com</div>
      <div>Vensa offers you access and use of Vensa’s Services on these Terms. By registering your details or your Dependant’s details with Vensa you are agreeing to these Terms, our Website Terms of Use and our Privacy Policy, and entering into a legally binding agreement with us.</div>
      <div className={styles.heading}>1. OUR SERVICES</div>
      <div className={styles.heading}>1.1 Description of our Services</div>
      <div>Through our Website, Application and Services, we provide an online platform to enable:</div>
      <div>(a) you to make appointments with Health Providers for yourself or your Dependants;</div>
      <div>(b) Health Providers to contact you about your appointments and health;</div>
      <div>(c) you to store information about your Health Provider appointments and health;</div>
      <div>(d) health information to be collected.</div>
      <div className={styles.heading}>1.2 Vensa is not a Health Provider</div>
      <div>Vensa facilitates communication between you and your Health Provider and provides a platform for you to store information related to your health and your Health Provider.</div>
      <div>Vensa is not a Health Provider and:</div>
      <div>(a) does not provide any advice or recommendations about your health, prescriptions or Health Provider;</div>
      <div>(b) does not verify information provided to you by any Health Provider;</div>
      <div>(c) is not authorised to make any representations about or for any Health Provider; or</div>
      <div>(d) is not responsible for any representations, content, advice or act or omission of any Health Provider.</div>
      <div className={styles.heading}>2. REGISTRATION AND ELIGIBILITY</div>
      <div className={styles.heading}>2.1 User Account or Guest access</div>
      <div>If you wish to access and receive the Services you can do so by:</div>
      <div>(a) creating a User Account; or</div>
      <div>(b) providing the information required to access the Website or Application as a Guest.</div>
      <div className={styles.heading}>2.2 Guest access</div>
      <div>You may use the Website and Application and receive the Services as a Guest if you:</div>
      <div>(a) are at least 18 years old;</div>
      <div>(b) provide accurate, complete and truthful information, and complete the details requested;</div>
      <div>(c) provide a valid mobile phone number and date of birth; and</div>
      <div>(d) subject to the provisions contained in our Privacy Policy, consent to us contacting you about the Services.</div>
      <div className={styles.heading}>2.3 Creating your User Account</div>
      <div>Creating a User Account is free.</div>
      <div>You may only create a User Account if you:</div>
      <div>(a) are at least 18 years old;</div>
      <div>(b) provide accurate, complete and truthful information, and complete the details requested under the User Account creation process;</div>
      <div>(c) provide a valid email address, mobile number, and date of birth;</div>
      <div>(d) create a password for the Website or Application;</div>
      <div>(e) subject to the provisions contained in our Privacy Policy, consent to us contacting you about your User Account (including to verify the details you have provided to us in your User Account) or the Services; and</div>
      <div>(f) keep information relating to your User Account up to date (including but not limited to your contact details).</div>
      <div className={styles.heading}>2.4 Your User Account security</div>
      <div>It is your responsibility to maintain the confidentiality and security of any information that may be used to access your User Account, including your password.</div>
      <div>Importantly, you agree that you will:</div>
      <div>(a) not share your password, login information or other security related information with any other person that may allow them to access your User Account;</div>
      <div>(b) not permit any other person to use or access your User Account or login information;</div>
      <div>(c) notify us if there has been, or you suspect there will be any unauthorised use of your User Account; and</div>
      <div>(d) only create one User Account, you will not register as a User under multiple personas (whether false or not).</div>
      <div className={styles.heading}>3. USE RULES</div>
      <div className={styles.heading}>3.1 Your obligations</div>
      <div>When you access and use our Services, and our Website and Application, you agree that you will:</div>
      <div>(a) comply at all times with New Zealand law;</div>
      <div>(b) not infringe on the rights of any person or entity, including without limitation Intellectual Property Rights, privacy, and/or contractual rights;</div>
      <div>(c) not interfere with or attempt to impair our computer systems or transit software viruses, worms, other harmful files or other malware;</div>
      <div>(d) not use a robot, spider, scraper or other unauthorised automated means to access the Website or the Services or any content shown on the Website; and</div>
      <div>(e) not attempt to gain unauthorised access to any part of the Website or the Services, including attempting to gain access to a User Account other than yours.</div>
      <div className={styles.heading}>4. APPOINTMENTS AND PAYMENTS</div>
      <div className={styles.heading}>4.1 Appointment requests</div>
      <div>To request an Appointment with a Health Provider you must:</div>
      <div>(a) complete the booking information; and</div>
      <div>(b) complete any verification processes required by us.</div>
      <div className={styles.heading}>4. APPOINTMENTS AND PAYMENTS</div>
      <div className={styles.heading}>4.1 Appointment requests</div>
      <div>To request an Appointment with a Health Provider you must:</div>
      <div>(a) complete the booking information; and</div>
      <div>(b) complete any verification processes required by us.</div>
      <div className={styles.heading}>4.2 Health Provider Terms</div>
      <div>In addition to these Terms, Health Provider Terms will also apply to any service provided to you by your Health Provider. By booking an Appointment you acknowledge that you have read, understand and accept any relevant Health Provider Terms that apply to you.</div>
      <div className={styles.heading}>4.2 Health Provider Terms</div>
      <div>In addition to the requirements set out at clause 4.1, to request an Appointment with a Health Provider for a Dependant you must:</div>
      <div>(a) complete the booking through the Website or Application as a Guest;</div>
      <div>(b) get prior permission from the Dependant to use the Website, Application, and Services on their behalf; and</div>
      <div>(c) get prior permission from the Dependant in relation to the collection, use, disclosure, storage and retention of their personal and health information in accordance with our Privacy Policy.</div>
      <div className={styles.heading}>5. CANCELLATIONS</div>
      <div className={styles.heading}>5.1 Health Provider cancellation of Appointments</div>
      <div>If a Health Provider cancels an Appointment in accordance with the Health Provider Terms, you will be notified by text message and/or email.</div>
      <div className={styles.heading}>5.2 User cancellation of Appointments</div>
      <div>You may cancel an Appointment by following the cancellation process on the Website or Application.</div>
      <div>Health Provider Terms may set out specific time frames in which you can cancel an appointment without penalty.</div>
      <div className={styles.heading}>6. CANCELLATION FEES</div>
      <div>It is free to use the Website, Application and Services. However, if you (or your Dependant):</div>
      <div>(a) cancel an Appointment without giving the Health Provider any required notice set out in the Health Provider Terms; or</div>
      <div>(b) fail to attend an Appointment without notifying the Health Provider in accordance with any Health Provider Terms,</div>
      <div>you may be charged a fee by the Health Provider in accordance with the Health Provider’s Terms.</div>
      <div className={styles.heading}>7. TERMINATING YOUR USER ACCOUNT</div>
      <div className={styles.heading}>7.1 Termination by you</div>
      <div>You may at any time, for any reason, close your User Account by following the process set out on the Website or Application.</div>
      <div className={styles.heading}>7.2 Termination by us</div>
      <div>We may refuse to create a User Account for you, close your User Account, or terminate, suspend or modify your access to our Website, Applications and/or Services without giving any prior notice to you in the following circumstances:</div>
      <div>(a) we receive a serious complaint or multiple complaints about you from any Health Provider, User or any other person;</div>
      <div>(b) you breach these Terms;</div>
      <div>(c) you impersonate another person or provide any false information when creating a User Account or using our Website, Application and/or the Services;</div>
      <div>(d) we consider any conduct by you puts our Website, Application, the Services or any person at risk;</div>
      <div>(e) we, in our reasonable opinion deem your behaviour to be unacceptable; and/or</div>
      <div>(f) your conduct may, in our reasonable opinion, bring Vensa or any Health Provider into disrepute or adversely affect either Vensa’s or any Health Provider’s reputation or image.</div>
      <div className={styles.heading}>8. INTELLECTUAL PROPERTY</div>
      <div className={styles.heading}>8.1 Intellectual property owned by us</div>
      <div>Vensa (and/or its suppliers and licensors) own all Intellectual Property Rights in and to the Website, the Application, the Services and the software and other material underlying and forming part of the Website, Application or the Services.</div>
      <div>Unless you obtain our prior written approval, you must not use, adapt, reproduce, store, distribute, publish, broadcast, display or create derivative works from any part of the Website, Application or the Services.</div>
      <div className={styles.heading}>8.2 Your licence for use of the Services</div>
      <div>We grant you a limited, non-exclusive, non-transferable licence to access and use the Services, Website or Application only as required for your use of the Services and as expressly permitted in these Terms.</div>
      <div>We reserve all right, title and interest not expressly granted under this licence to the fullest extent possible under applicable laws.</div>
      <div className={styles.heading}>9. SERVICE LIMITS, DISCLAIMERS AND LIMITATIONS OF LIABILITY</div>
      <div className={styles.heading}>9.1 No agency</div>
      <div>Vensa provides an online platform for Health Providers and Users, and except as expressly provided for under these Terms, Vensa is not acting as an agent for any party. A Health Provider is an independent operator and is not an employee, contractor or agent for Vensa.</div>
      <div className={styles.heading}>9.2 No responsibility or liability for conduct of Health Providers</div>
      <div>Vensa is not a Health Provider or medical professional. Any information that you rely on, or transactions you enter into using the Website, Application and/or the Services are entirely at your own risk. You are solely responsible for the actions you take in reliance of the information available on or accessed through the Website, Application and/or the Services.</div>
      <div>Vensa has no responsibility and liability for:</div>
      <div>(a) any representations, information, recommendations, treatment, or medical opinions provided by any Health Provider;</div>
      <div>(b) any acts, omissions, negligence, misconduct, or breach of any duty or law by any Health Provider;</div>
      <div>(c) the availability of any Health Provider and/or any cancelled or unfulfilled Appointments;</div>
      <div>(d) any qualifications, skills, experience, or licences required by any Health Provider;</div>
      <div>(e) the accuracy, reliability, completeness and correctness of any information (including any data, images, opinions, advice, representations and descriptions about any Service, Appointment, or Health Provider) displayed, stored, described or contained on the Website or Application, or provided during the course of using the Services;</div>
      <div>(f) any personal injuries, property damage or any other damages or expenses resulting from:</div>
      <div className={styles.minor}>(i) your use of the Website, Application or Services; or</div>
      <div className={styles.minor}>(ii) any act, omission or advice of a Health Provider.</div>
      <div>(g) any product or service that is provided or recommended to you by a Health Provider.</div>
      <div className={styles.heading}>9.3 No endorsement or verification of Health Providers</div>
      <div>Vensa does not:</div>
      <div>(a) endorse any information or advice provided by any Health Provider, including information contained on the Website or Application and/or provided in the course of using the Service; or</div>
      <div>(b) verify the identity of, or conduct any background or reference checks on any Health Provider.</div>
      <div className={styles.heading}>9.4 No warranties</div>
      <div>The Website, the Application and the Services are provided on an “as is” and “as available” basis. To the maximum extent permitted at law, Vensa disclaims and excludes all implied conditions or warranties as to the Website, Application, and the Services. Without limiting the foregoing Vensa does not:</div>
      <div>(a) make any warranties regarding the quality or standard or the abilities, skill or experience of any Health Provider;</div>
      <div>(b) warrant that the Website, Application and/or the Services will be compatible with your equipment; or</div>
      <div>(c) warrant that the Website, Application, and/or the Services will be free from errors, loss, destruction, interruption, corruption (including corruption of data), or that the Website, Application and/or the Services will be timely or secure.</div>
      <div className={styles.heading}>9.5 No liability for your use of the Website, Application, and Services</div>
      <div>Except as required by law, Vensa will not be liable or responsible for any damages arising from the use (or inability to use) the Website, Application and/or the Services, including any loss, costs or damages arising from any:</div>
      <div>(a) corruption or loss of data or other information;</div>
      <div>(b) malware that may be transmitted to your computer by use of the Website, Application and/or the Services; or</div>
      <div>(c) interruption, suspension or discontinuance of the Website, Application and/or the Services.</div>
      <div>To the maximum extent allowed under law, this limitation of liability applies to damages of any kind, including direct, indirect, consequential, incidental, loss of income, profit, data, property and claims by third parties.</div>
      <div>Nothing in these Terms is intended to limit or exclude Vensa’s liability or your rights if you are a consumer for the purposes of the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.</div>
      <div className={styles.heading}>10. PRIVACY</div>
      <div>These Terms are subject to our Privacy Policy, which governs our use of your information and your Dependant’s information. By using our Website, Application and/or the Services, you and your Dependant agree and consent to the collection, use, storage, disclosure and distribution of personal information in accordance with our Privacy Policy.</div>
      <div className={styles.heading}>11. AUDITING AND MONITORING</div>
      <div>Vensa reserves the right to:</div>
      <div>(a) review, audit and monitor (manually or through automated means) your use of the Website, Application and/or the Services;</div>
      <div>(b) take any action we deem appropriate in our sole discretion in accordance with our policies, including suspending or terminate your User Account, editing, removing or blocking any content that we deem inappropriate or unacceptable, and in the case of any illegal or suspected illegal activity, reporting any matters to the appropriate authority; and</div>
      <div>(c) access, collect, preserve or disclose information about your use of the Website, Application, and/or the Services (including your communications and content you submit) as is necessary to:</div>
      <div className={styles.minor}>(i) comply with any legal process;</div>
      <div className={styles.minor}>(ii) enforce these Terms;</div>
      <div className={styles.minor}>(iii) respond to any claims or complaints about any content you submit, or act or omissions by you;</div>
      <div className={styles.minor}>(iv) respond to your customer service requests; and</div>
      <div className={styles.minor}>(v) protect the rights, property, safety of us, any User or the public.</div>
      <div className={styles.heading}>12. GENERAL TERMS</div>
      <div className={styles.heading}>12.1 Force majeure</div>
      <div>Vensa has no liability to you for any lack of performance, unavailability or failure of the Website, Application, and/or the Services, or failure to comply with these Terms where the same arises from any cause reasonably beyond the control of Vensa.</div>
      <div className={styles.heading}>12.2 Notification of changes to these Terms</div>
      <div>VWe may amend these Terms from time to time by posting the revised version on our Website and Application. We will provide you with reasonable notice of any changes by push notification or email. If you continue to use the Website, Application and Services following the effective date of any amendments, you will be deemed to have accepted the amendments. If you do not accept the amendment, you will not be penalised but you must stop using our Website, Application and the Services and close your User Account.</div>
      <div className={styles.heading}>12.3 Notices and electronic communications</div>
      <div>We may provide you with notices, including notices relating to these Terms by way of electronic communications, including by email or other electric communication on the Website, Application, or through the Services.</div>
      <div className={styles.heading}>12.4 No waiver</div>
      <div>If we do not exercise or enforce any rights available to us under these Terms that does not constitute a waiver of those rights.</div>
      <div className={styles.heading}>12.5 No assignment</div>
      <div>You may not assign, transfer and/or subcontract any of your rights under these Terms.</div>
      <div className={styles.heading}>12.6 Severability</div>
      <div>If any provision contained in these Terms is held to be invalid or unenforceable by any judicial or other competent authority, all other provisions of these Terms will remain in full force and effect and will not in any way be impaired.</div>
      <div className={styles.heading}>12.7 Contact us</div>
      <div>For any questions about the Website, Application or the Services, please contact us:</div>
      <div>Email: support@vensa.com</div>
      <div>Phone: 0800 736 463</div>
      <div className={styles.heading}>12.8 Governing law</div>
      <div>These Terms are governed by New Zealand law, and you agree that the courts of New Zealand shall have non-exclusive jurisdiction to settle any dispute which may arise out of or in connection with these Terms.</div>
      <div className={styles.heading}>13. DEFINITIONS</div>
      <div>In these Terms, the following expressions have the meanings set out below:</div>
      <div>(a) Application means the Vensa application that is available on Apple and Android App stores.</div>
      <div>(b) Appointment means an appointment with a Health Provider which is booked through the Website or Application.</div>
      <div>(c) Dependant means a person who:</div>
      <div className={styles.minor}>(i) is the child or under the legal guardianship of a User; or</div>
      <div className={styles.minor}>(ii) has given a User permission to use the Website, Application and/or the Services on their behalf.</div>
      <div>(d) Guest means a person or other entity who is a user of the Website, Application and/or the Services but has not created a User Account, including users who use the Website, Application and/or Services on behalf of a Dependant.</div>
      <div>(e) Health Provider means a healthcare provider.</div>
      <div>(f) Health Provider’s Terms means the terms and conditions and any policies that a Health Provider has in place in relation to any products or services it provides to you. The Health Provider’s Terms form a contract between the User and the Health Provider, and are separate from and in addition to these Terms.</div>
      <div>(g) Intellectual Property Rights means any current and future intellectual property rights whether registered or unregistered, including copyrights, design rights, trade marks, trade names, domain names, rights in logos and get-up, patents, inventions, confidential information and know-how, all rights in computer software, privacy, data and databases.</div>
      <div>(h) Privacy Policy means our Privacy Policy available on the Website and the Application.</div>
      <div>(i) Services means any tools, applications, or other services available to Users via the Website or Application.</div>
      <div>(j) Terms means these terms and conditions, and includes any amendments made in accordance with these terms and conditions.</div>
      <div>(k) User means a person or other entity who is a user of the Website, Application and/or the Services.</div>
      <div>(l) User Account means an account created in accordance with the requirements of the Website or Application by a User.</div>
      <div>(m) Vensa, us, we, our means Vensa Limited.</div>
      <div>(n) Website means any Vensa website including www.vensa.com and any other website, internet property or application (including any applications for mobile devices) that are owned or operated by Vensa.</div>
      <div>(o) You and your is a reference to any User.</div>
    </div>
    <button className={styles.button} onClick={handleClick}><Close className={styles.closeIcon} /></button>
  </div>
);
TermsandConditions.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default TermsandConditions;
export {
  styles,
};
/* eslint-enable max-len */
