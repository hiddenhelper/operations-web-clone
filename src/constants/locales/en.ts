export default {
  AMPLIFY: {
    ERROR: {
      defaultMessage: 'Error',
      NotAuthorizedException: 'Incorrect email or password',
    },
  },
  LOGIN: {
    TITLE: 'Sign in',
    FORM: {
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'Email',
      },
      PASSWORD: {
        LABEL: 'Password',
        PLACEHOLDER: 'Password',
      },
      BUTTON: 'Sign In',
      BUTTON_LOADING: 'Signing In',
    },
    FORGOT_PASSWORD_LINK: 'Forgot your password?',
    LEGAL_LABEL: 'Field Control Analytics © 2020. All Rights Reserved.',
  },
  NAVIGATION_TOP: {
    ACTIONS: {
      DISCARD: 'Discard Changes',
      SAVE: 'Save Changes',
      SAVING: 'Saving...',
      NEXT: 'Next',
      SEND_APPROVE: 'Send for Approval',
      SEND_APPROVE_LOADING: 'Sending for Approval',
      APPROVE: 'Approve',
      APPROVE_LOADING: 'Approving',
    },
    MESSAGE: {
      DISCARD: 'Changes have been discarded',
      SAVE: 'Changes have been saved',
    },
  },
  INVITE_MESSAGE: 'Invitation email will be sent once the Client creation gets approved',
  CONTACT_METHOD: {
    EMAIL: 'Email',
    PHONE: 'Phone',
  },
  FIELDS: {
    COMPLETE: 'All required fields completed',
    INCOMPLETE: 'Some required fields are missing',
  },
  VALIDATION: {
    REQUIRED: 'Please enter a %s.',
    INVALID: 'Please enter a valid %s.',
  },
  USERS: {
    ADMIN_REQUIRED: 'You need at least one Client Admin user role for the client to be approved',
    REVIEW_ADMIN_REQUIRED: 'Please add at least one Client Admin user role',
  },
  PROJECT: {
    CLIENT_PAY_LABEL: 'Each client pays for its own workers',
    REPRINTING_CHARGE_LABEL: 'Badge reprint will be charged to each client.',
    RESPONSIBLE_FOR_BILLING_LABEL:
      'General Contractor(s) invoices will be sent Monthly and Subcontractor(s) invoices will be sent Weekly. Due date will be upon receipt.',
  },
  ERRORS: {
    DEFAULT: 'Something went wrong.',
    STRIPE: {
      PAYMENT_FAILED: 'Unable to process payment from Stripe.',
    },
  },
  INPUT: {
    LABEL: {
      FCA_REGION: 'FCA Region',
      FCA_NAE: 'FCA NAE',
    },
  },
  SERVICE_AGREEMENT: {
    TITLE: 'Service Agreement',
    CHECKBOX_LABEL: 'By accepting the project you accept the Project Service Agreement.',
    CONTENT: `Hereinafter referred to as the “Contractor", for the considerations hereinafter expressed, agree together as follows:

    The purpose of this agreement is to allow the Contractor to use the services provided by FC Construction Services (FCA) as a risk management tool in screening workers for jobsite access.

    It is the sole responsibility of the Contractor to secure and to furnish FCA proper and correct information for each applicant sufficient for FCA to perform the services contracted. The Contractor certifies to FCA that it will comply with all applicable state and federal laws, including, but not limited to, the Fair Credit Reporting Act (15 USC 1681) and that information received from FCA will not be used in violation of any equal employment opportunity law or regulation. Contractor hereby releases FCA and its affiliated companies and the officers, agents, employees and independent contractors of FCA and its affiliated companies from liability for Contractor’s noncompliance with all applicable laws, rules and regulations.

    This agreement shall become effective on Contractor date of sign up and shall remain in force and effect until modified or suspended by either party with thirty days advance written notice.`,
  },
  SUBCONTRACTOR_SERVICE_AGREEMENT: {
    TITLE: 'Service Agreement',
    CHECKBOX_LABEL: 'By accepting the project you accept the Project Service Agreement.',
    CONTENT: `Hereinafter referred to as the “Contractor”, for the considerations hereinafter expressed, agree together as follows:

    The purpose of this agreement is to allow the Contractor to use the services provided by FC Construction Services (FCA) as a risk management tool in screening workers for jobsite access.

    FCA will invoice weekly. All invoices are due and payable upon receipt. FCA will automatically debit the credit card provided by the Contractor on the date of invoice. Invoices are made available to the Contractor via FCA website. Contractor is responsible for payment of any unpaid invoices for services utilized by Contractor’s subcontractor(s).

    It is the sole responsibility of the Contractor to secure and to furnish FCA proper and correct information for each applicant sufficient for FCA to perform the services contracted. The Contractor certifies to FCA that it will comply with all applicable state and federal laws, including, but not limited to, the Fair Credit Reporting Act (15 USC 1681) and that information received from FCA will not be used in violation of any equal employment opportunity law or regulation. Contractor hereby releases FCA and its affiliated companies and the officers, agents, employees and independent contractors of FCA and its affiliated companies from liability for Contractor’s noncompliance with all applicable laws, rules and regulations.

    This agreement shall become effective on Contractor date of sign up and shall remain in force and effect until modified or suspended by either party with thirty days advance written notice.`,
  },
  CONSENT_FORM: {
    LEGAL_TITLE:
      'Please read the User Consent portion ("User Consent", "Consent") carefully. Your access to and use of the Service is conditioned on your acceptance of and compliance with this Consent.',
    LEGAL_DISCLOSURE_CONTENT:
      'Your employer or controlling General Contractor requires Field Control Analytics ("us", "we", or "our"). We collect certain information on each individual with access to this mobile application. I understand that my digital photo will be used for identification purposes. I understand and agree to the following:',
    LEGAL_CONSENT_CONTENT_LIST: [
      'My picture may be used for identification purposes related to this mobile application.',
      'Data captured through this mobile application may be shared with General Contractor or its authorized agent.',
      'I understand and agree that certain personal data may be shared with General Contractor or its authorized agent.',
      'I understand that I may be requested to take a COVID-19 attestation survey each day prior to my entering the jobsite to assist the general contractor or jobsite manager on the job in its efforts to prevent the spread of Coronavirus on the jobsite.',
      'I understand that this survey is made available to me electronically through a mobile application offered by Field Control Analytics Inc. ("FCA"). I understand that the use of the mobile application for the survey is a requirement of maintaining my active badge status. I understand that the information I provide through this application will only be shared with the General Contractor and/or jobsite manager, and will not be stored by, retained by or otherwise used by FCA for any other purpose.',
    ],
    LEGAL_CONSENT_SUBTITLE:
      '** The Fair Credit Reporting Act (FCRA) defines Employment Purposes as follows "The term "employment purposes" when used in connection with a consumer report means a report used for the purpose of evaluating a consumer for employment, promotion, reassignment or retention as an employee." If you answered "YES" that this report is for Employment Purposes, you will have additional requirements under the FCRA. **',
  },
  ERROR_CODES: {
    WORKER_ALREADY_EXISTS: 'WORKER_ALREADY_EXISTS',
    PAYMENT_METHOD_ASSIGNED_TO_PROJECTS: 'PAYMENT_METHOD_ASSIGNED_TO_PROJECTS',
  },
  INVOICE: {
    PAYMENT_POLICY: `We accept major credit cards subject to a 3% convenience fee (plus any applicable sales and use taxes).`,
    TAXES_CALCULTAED: `Taxes are calculated based on the Jobsite Address.`,
  },
  PRIVACY_POLICY: {
    TITLE: 'PRIVACY POLICY',
    CONTENT_1: 'We care about data privacy and security. Please review our privacy policy at ',
    CONTENT_2:
      '. By using the web-platform and Mobile Application, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use.  Please be advised the web-platform and Mobile Application are hosted in the United States.',
    URL: 'https://www.fieldcontrolanalytics.com/privacy-policy',
  },
  TERMS_AND_CONDITIONS: {
    TITLE: 'FCA FREEDOM PLATFORM AND MOBILE APP TERMS & CONDITIONS',
    DATE: 'February 24, 2021',
    AGREEMENTS_TO_TERMS: {
      TITLE: 'AGREEMENT TO TERMS',
      CONTENT: `Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the web-based FCAFreedom (“web-platform”) and Mobile application (“Mobile application”, the "Service") operated by Field Control Analytics ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.

Supplemental terms and conditions or documents that may be posted online or in the mobile app from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason.  We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions and you waive any right to receive specific notice of each such change.  It is your responsibility to periodically review these Terms and Conditions to stay informed of updates.  You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the web-based and Mobile Application after the date such revised Terms are posted.`,
    },
    INTELLECTUAL_PROPERTY_RIGHTS: {
      TITLE: 'INTELLECTUAL PROPERTY RIGHTS',
      CONTENT: `Unless otherwise indicated, the web-platform and Mobile Application are our proprietary property and all source code, databases, functionality, software, data, web, Mobile Application designs, audio, video, text, photographs, and graphics on the web platform and Mobile Application (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.  The Content and the Marks are provided on the web-platform and Mobile Application “AS IS” for your information and personal use only.  Except as expressly provided in these Terms of Use, no part of the web-platform and Mobile Application and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.

Provided that you are eligible to use the web-platform and Mobile Application, you are granted a limited license to access and use the web-platform and Mobile Application and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the web-platform and Mobile Application, Content and the Marks.`,
    },
    USER_REPRESENTATIONS: {
      TITLE: 'USER REPRESENTATIONS',
      CONTENT: `By using the web-platform and Mobile Application, you represent and warrant that: [(1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;] (3) you have the legal capacity and you agree to comply with these Terms of Use; [(4) you are not under the age of 13;] (5) not a minor in the jurisdiction in which you reside[, or if a minor, you have received parental permission to use the web-platform and Mobile Application]; (6) you will not access the web-platform and Mobile Application through automated or non-human means, whether through a bot, script or otherwise; (7) you will not use the web-platform and Mobile Application for any illegal or unauthorized purpose;  and (8) your use of the web-platform and Mobile Application will not violate any applicable law or regulation.

If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the web-platform and Mobile Application (or any portion thereof).  `,
    },
    APPLE_AND_ANDROID_DEVICES: {
      TITLE: 'Apple and Android Devices',
      CONTENT: `The following terms apply when you use a mobile application obtained from either the Apple Store or Google Play (each an “App Distributor”) to access the Mobile Application: (1) the license granted to you for our mobile application is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service; (2) we are responsible for providing any maintenance and support services with respect to the mobile application as specified in the terms and conditions of this mobile application license contained in these Terms of Use or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the mobile application; (3) in the event of any failure of the mobile application to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, may refund the purchase price, if any, paid for the mobile application, and to the maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever with respect to the mobile application; (4) you represent and warrant that (i) you are not located in a country that is subject to a U.S. government embargo, or that has been designated by the U.S. government as a “terrorist supporting” country and (ii) you are not listed on any U.S. government list of prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement when using the mobile application, e.g., if you have a VoIP application, then you must not be in violation of their wireless data service agreement when using the mobile application; and (6) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application license contained in these Terms of Use, and that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile application license contained in these Terms of Use against you as a third-party beneficiary thereof.`,
    },
    WEB_PLATFORM_APP_MGMT: {
      TITLE: 'WEB PLATFORM & MOBILE APPLICATION MANAGEMENT',
      CONTENT: `We reserve the right, but not the obligation, to: (1) monitor the web-platform and Mobile Application for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the web-platform and Mobile Application or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the web-platform and Mobile Application in a manner designed to protect our rights and property and to facilitate the proper functioning of the web-platform and Mobile Application.`,
    },
    TERM_AND_TERMINATION: {
      TITLE: 'TERM AND TERMINATION',
      CONTENT: `These Terms of Use shall remain in full force and effect while you use the web-platform and Mobile Application. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE WEB-PLATFORM AND MOBILE APPLICATION (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE WEB-PLATFORM AND MOBILE APPLICATION OR DELETE [YOUR ACCOUNT] WITHOUT WARNING, IN OUR SOLE DISCRETION.

If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.`,
    },
    MODIFICATIONS_AND_INTERRUPTIONS: {
      TITLE: 'MODIFICATIONS AND INTERRUPTIONS',
      CONTENT: `We reserve the right to change, modify, or remove the contents of the web-platform and Mobile Application at any time or for any reason at our sole discretion without notice.  However, we have no obligation to update any information on our web-platform and Mobile Application.  We also reserve the right to modify or discontinue all or part of the web-platform and Mobile Application without notice at any time.  We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the web-platform and Mobile Application.

We cannot guarantee the web-platform and Mobile Application will be available at all times.  We may experience hardware, software, or other problems or need to perform maintenance related to the web-platform and Mobile Application, resulting in interruptions, delays, or errors.  We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Mobile Application at any time or for any reason without notice to you.  You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the web-platform and Mobile Application during any downtime or discontinuance of the web-platform and Mobile Application.  Nothing in these Terms of Use will be construed to obligate us to maintain and support the web-platform and Mobile Application or to supply any corrections, updates, or releases in connection therewith.`,
    },
    GOVERNING_LAW: {
      TITLE: 'GOVERNING LAW',
      CONTENT: `These Terms of Use and your use of the web-platform and Mobile Application are governed by and construed in accordance with the laws of the State of TEXAS applicable to agreements made and to be entirely performed within the State/Commonwealth of TEXAS, without regard to its conflict of law principles.`,
    },
    CORRECTIONS: {
      TITLE: 'CORRECTIONS',
      CONTENT: `There may be information on the web-platform and Mobile Application that contains typographical errors, inaccuracies, or omissions that may relate to the web-platform and Mobile Application, including descriptions, pricing, availability, and various other information.  We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the web-platform and Mobile Application at any time, without prior notice.`,
    },
    DISCLAIMER: {
      TITLE: 'DISCLAIMER',
      CONTENT: `THE WEB-PLATFORM AND MOBILE APPLICATION ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.  YOU AGREE THAT YOUR USE OF THE WEB-PLATFORM AND MOBILE APPLICATION SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE WEB-PLATFORM AND MOBILE APPLICATION AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE WEB-PLATFORM AND MOBILE APPLICATION CONTENT OR THE CONTENT OF ANY WEBMOBILE APPLICATIONS LINKED TO THIS WEB-PLATFORM AND MOBILE APPLICATION AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE WEB-PLATFORM AND MOBILE APPLICATION, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE WEB-PLATFORM AND MOBILE APPLICATION, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE WEB-PLATFORM AND MOBILE APPLICATION BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE WEB-PLATFORM AND MOBILE APPLICATION. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE WEB-PLATFORM AND MOBILE APPLICATION, ANY HYPERLINKED WEBMOBILE APPLICATION, OR ANY WEBMOBILE APPLICATION OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.  AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.`,
    },
    INDEMNIFICATION: {
      TITLE: 'INDEMNIFICATION',
      CONTENT: `You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) [your Contributions]; (2) use of the web-platform and Mobile Application;  (3) breach of these Terms of Use; (4) any breach of your representations and warranties set forth in these Terms of Use; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the web-platform and Mobile Application with whom you connected via the web-platform and Mobile Application. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.`,
    },
    USER_DATA: {
      TITLE: 'USER DATA',
      CONTENT: `We will maintain certain data that you transmit to the web-platform and Mobile Application for the purpose of managing the web-platform and Mobile Application, as well as data relating to your use of the web-platform and Mobile Application.  Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the web-platform and Mobile Application.  You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.`,
    },
    ELECTRONIC_COMMUNICATIONS_TRANSACTIONS_SIGNATURES: {
      TITLE: 'ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES',
      CONTENT: `Visiting the web-platform and Mobile Application, sending us emails, and completing online forms constitute electronic communications.  Your consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the web-platform and Mobile Application, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE MOBILE APPLICATION.  You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.`,
    },
    CALIFORNIA_USERS_AND_RESIDENTS: {
      TITLE: 'CALIFORNIA USERS AND RESIDENTS',
      CONTENT: `If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.`,
    },
    MISSELANEOUS: {
      TITLE: 'MISCELLANEOUS',
      CONTENT: `These Terms of Use and any policies or operating rules posted by us on the web-platform and Mobile Application constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision.  These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time.  We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.  If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the web-platform and Mobile Application.  You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.`,
    },
    CONTACT_US: {
      TITLE: 'CONTACT US',
      CONTENT: `In order to resolve a complaint regarding the Mobile Application or to receive further information regarding use of the Mobile Application, please contact us at:

Field Control Analytics
8350 N. Central Expressway, Suite 300
Dallas, TX 75206
(800) 388-8827`,
    },
  },
  SUPPORT_EMAIL: 'customer.support@fieldca.com',
  PAYMENT: {
    CREDIT_CARD_FORM_DESCRIPTION:
      'Please enter your Credit Card details. This card will be charged every payment cycle (weekly or monthly) as long as it is associated with a Project.',
  },
};
