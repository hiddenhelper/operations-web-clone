import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../utils/generalUtils';
import { STYLE } from '../../../constants';

export const formGlobalStyles = makeStyles(theme =>
  createStyles({
    userWrapper: {
      '& .MuiTypography-caption': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    entityField: {
      width: '98% !important',
    },
    badgeInput: {
      width: '97% !important',
    },
    modalForm: {
      '& .MuiInputBase-root': {
        backgroundColor: `${STYLE.COLOR.WHITE} !important`,
      },
    },
    middleDateInput: {
      width: '97.3% !important',
    },
    userInput: {
      margin: '0',
      width: '93% !important',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      '& .MuiInputBase-input': {
        color: STYLE.COLOR.SECONDARY_DARKER,
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '27px',
        padding: '13.5px 14px',
        position: 'relative',
      },
      '& .MuiInputBase-root': {
        height: `${toREM(49)}`,
      },
      '& .MuiSelect-root': {
        padding: '0px 14px',
      },
      '& .MuiSelect-select': {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },
    userInputControl: {
      marginTop: 15,
    },
    invitationWrapper: {
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      marginTop: `${toREM(17)}`,
      '& .MuiTypography-root': {
        width: `${toREM(268)}`,
        maxWidth: '100%',
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        color: STYLE.COLOR.LIGHT_GRAY4,
      },
    },
    rowsWrapper: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      marginBottom: '35px',
      justifyContent: 'space-between',
      '& .MuiGrid-item': {
        marginBottom: '10px',
      },
    },
    optionalWrapper: {
      maxWidth: '70% !important',
      '& .MuiTypography-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    informationBlock: {
      width: '100%',
      height: 'auto',
      overflow: 'hidden',
    },
    reviewGeneralInformation: {
      display: 'flex',
      paddingTop: `${toREM(12)}`,
    },
    radioWrapper: {
      width: '100%',
      maxWidth: 320,
      '& .MuiFormControlLabel-root': {
        height: 50,
        marginLeft: 0,
        marginRight: 20,
        marginBottom: 0,

        '&:first-child': {
          '& .MuiRadio-root': {
            paddingLeft: 0,
          },
        },
        '&:last-child': {
          marginRight: 0,
        },
      },
    },
    informationBlocksWrapper: {
      display: 'flex',
      width: '100%',
    },
    reviewGeneralInformationDirection: {
      flexDirection: 'column',
    },
    informationMiddleBlock: {
      backgroundColor: STYLE.COLOR.WHITE,
      borderLeft: `1px solid ${STYLE.COLOR.DIVIDER}`,
      padding: '0.5px 30px',
      minWidth: 0,
    },
    lastInformationBlock: {
      borderTop: `1px solid ${STYLE.COLOR.DIVIDER}`,
      marginTop: `${toREM(23)}`,
    },
    lastInformationTitle: {
      marginTop: `${toREM(16)}`,
    },
    cardFont: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY,
      lineHeight: '24px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    cardAccent: {
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    cardTitle: {
      marginBottom: `${toREM(16)}`,
    },
    cardTrades: {
      display: 'flex',
      '& span': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        color: STYLE.COLOR.SECONDARY,
        lineHeight: '24px',
      },
    },
    cardData: {
      display: 'flex',
    },
    cardDataTitle: {
      minWidth: `${toREM(81)}`,
      marginRight: `${toREM(9)}`,
    },
    tableWrapper: {
      overflowX: 'auto',
      '& th': {
        color: STYLE.COLOR.SECONDARY,
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    mapWrapper: {
      width: '100%',
      height: '340px',
      display: 'flex',
      paddingTop: '24px',
      paddingBottom: '20px',
    },
    mapWithAttentionField: {
      height: '430px',
    },
    mapWithCounty: {
      height: '430px',
      paddingBottom: '8px',
    },
    mailingWrapper: {
      '& .MuiFormControlLabel-label': {
        position: 'relative',
        top: '1px',
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    addressCheckbox: {
      padding: '19.5px 0px',
    },
    mailingAddressDivider: {
      marginBottom: '12px',
    },
    enableUserButton: {
      opacity: '1',
    },
    disableUserButton: {
      opacity: '0.5',
      color: 'Gray',
      cursor: 'not-allowed !important',
    },
    addressesWrapper: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '8px',
      paddingTop: '13px',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
      '& .MuiDivider-root': {
        margin: '0 auto',
      },
    },
    addressInformationBlock: {
      marginBottom: '25px',
    },
    addressItem: {
      minWidth: '48%',
      width: '420px',
      height: 'auto',
      [theme.breakpoints.down('md')]: {
        minWidth: '100%',
      },
      '& #map': {
        maxWidth: '100%',
      },
    },
    cardAddressTitle: {
      marginBottom: '6px',
    },
    cardFontAccent: {
      fontWeight: 600,
    },
    inactiveAdd: {
      color: STYLE.COLOR.UNCOMPLETED,
    },
    userAction: {
      color: STYLE.COLOR.LIGHT_GRAY5,
      fontSize: `${toREM(13)}`,
      position: 'relative',
      top: '12px',
      '& svg': {
        height: '15.7px',
        position: 'relative',
        bottom: '1.5px',
        '& path': {
          fill: STYLE.COLOR.INACTIVE,
        },
      },
    },
    emailParentAccent: {
      color: `${STYLE.COLOR.ACCENT_PRIMARY} !important`,
    },
    deleteGrid: {
      maxWidth: '2.1%',
      flexBasis: '2.1%',
    },
    deleteGridLg: {
      maxWidth: '5%',
      flexBasis: '5%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    middleInput: {
      width: '95.8% !important',
    },
    lastMiddleInput: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    selectLabelGeneral: {
      position: 'relative',
      top: '14px',
    },
    selectLabel: {
      fontSize: toREM(STYLE.FONT.SIZE.PARAGRAPH),
      maxHeight: '20px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    otherTradeWrapper: {
      position: 'relative',
      top: '7px',
      left: '11px',
      paddingBottom: '26px',
      '& .MuiFormControl-root': {
        width: '100%',
        '& .MuiInputBase-root': {
          width: '25.5%',
        },
      },
    },
    tradesWrapper: {
      position: 'relative',
      right: '12px',
      '& .MuiFormGroup-root': {
        gridTemplateColumns: 'repeat( auto-fit, minmax(275px, 1fr) )',
      },
      '& .MuiFormGroup-root .MuiFormControlLabel-root:last-of-type': {
        gridColumn: 1,
      },
    },
    dividerColor: {
      backgroundColor: STYLE.COLOR.DIVIDER,
    },
    editButton: {
      '&:focus': {
        outline: 'none',
        border: 'none',
      },
      '& .MuiButton-label:focus': {
        outline: 'none',
        border: 'none',
      },
    },
    secondaryActionsIcon: {
      '& .MuiButtonBase-root': {
        borderRadius: 0,
        '&:focus': {
          border: `1px solid ${STYLE.COLOR.SECONDARY_LIGHTER}`,
        },
      },
    },
    iSecondaryAction: {
      color: STYLE.COLOR.ACCENT_TERTIARY,
      fontSize: `${toREM(13)}`,
      position: 'relative',
      // top: '12px',

      '& svg': {
        height: '15.7px',
        position: 'relative',
        bottom: '1.5px',

        '& path': {
          fill: STYLE.COLOR.ACCENT_TERTIARY,
        },
      },
      '& .MuiButtonBase-root': {
        bottom: '0 !important',
        fontWeight: 600,
      },
    },
    infoSecondaryAction: {
      color: STYLE.COLOR.LIGHT_GRAY5,
      fontSize: `${toREM(13)}`,
      position: 'relative',
      top: '12px',

      '& svg': {
        height: '15.7px',
        position: 'relative',
        bottom: '1.5px',

        '& path': {
          fill: STYLE.COLOR.INACTIVE,
        },
      },
      '& .MuiButtonBase-root': {
        bottom: '0 !important',
        fontWeight: 600,
      },
    },
    errorPosition: {
      position: 'relative',
    },
    formWrapper: {
      '&.MuiGrid-root .MuiGrid-container': {
        justifyContent: 'space-between',

        '& .MuiGrid-grid-lg-6': {
          flexBasis: '49%',
          maxWidth: '49%',
        },
        '& .MuiGrid-grid-lg-4': {
          flexBasis: '32%',
          maxWidth: '32%',
        },
      },
    },
  })
);

export const invoiceFormGlobalStyles = makeStyles(theme =>
  createStyles({
    infoContainer: {
      fontWeight: 400,
      color: STYLE.COLOR.LIGHT_GRAY5,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      display: 'flex',

      '& svg': {
        width: '15px',
        height: '15px',
        marginRight: 10,
        flexShrink: 0,

        '& path': {
          transform: 'scale(1.000)',
          fill: STYLE.COLOR.INACTIVE,
        },
      },
    },
    invoiceTotalsContainer: {
      paddingTop: '10px',
    },
    subtotalLine: {
      margin: '10px 0',
      fontWeight: 'bold',
      fontSize: 20,
    },
    totalLine: {
      margin: '10px 0',
      fontWeight: 600,
    },
    disclaimer: {
      marginTop: 10,
      fontSize: 14,
    },
    subTotView: {
      margin: '10px 0',
      fontSize: 14,
    },
    taxExemptLabel: {
      margin: '10px 0',
      fontSize: 12,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      '& .MuiTypography-root': {
        color: STYLE.COLOR.LIGHT_GRAY5,
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
        letterSpacing: 0,
        position: 'relative',
        bottom: 2,
        textAlign: 'justify',
      },
    },
  })
);
