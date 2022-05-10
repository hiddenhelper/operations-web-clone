import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    selectLabel: {
      marginTop: toREM(28),
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(15)}`,
    },
    divider: {
      marginBottom: '8px',
      backgroundColor: STYLE.COLOR.DIVIDER,
    },
    badgeCheckbox: {
      padding: '19.5px 0px',
    },
    badgeModelReprintPrice: {
      marginBottom: 20,
    },
    boxShadow: {
      boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
    },
    popperWrapper: {
      border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      borderRadius: `${toREM(5)}`,
      color: STYLE.COLOR.ACCENT_QUINARY,
      '& .MuiPaper-root': {
        padding: 0,
        margin: 0,
        marginTop: '4px',
        boxShadow: 'transparent',
      },

      '& .MuiAutocomplete-listbox': {
        padding: 0,

        '& li': {
          borderBottom: `1px solid ${STYLE.COLOR.QUINARY_LIGHTER}`,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: STYLE.COLOR.ACCENT_QUINARY,
          alignItems: 'flex-end',

          '&:first-child': {
            '& .MuiListSubheader-root': {
              borderBottom: `1px solid ${STYLE.COLOR.QUINARY_LIGHTER}`,
            },
          },

          '& .MuiButtonBase-root': {
            position: 'relative',
            top: '7px',
          },

          '& .MuiListSubheader-root': {
            height: `${toREM(39)}`,
            display: 'flex',
            alignItems: 'center',
            fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
            color: STYLE.COLOR.ACCENT_QUINARY,
            fontWeight: 600,
            borderBottom: `1px solid ${STYLE.COLOR.QUINARY_LIGHTER}`,
            paddingTop: '4px',
          },

          '& span': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },

        '& .MuiAutocomplete-option': {
          height: `${toREM(42)}`,
          fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
          borderBottom: `1px solid ${STYLE.COLOR.QUINARY_LIGHTER}`,
          paddingTop: '2px',
        },

        '& .MuiAutocomplete-option[aria-selected="true"]': {
          backgroundColor: '#F5F5F5 !important',
        },

        '& li:last-child': {
          borderBottom: 'none',
        },

        '& [data-testid="search-option-item"]': {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          color: STYLE.COLOR.ACCENT_QUINARY,
        },
      },
      '& .MuiButton-root:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiChip-root': {
        height: '17px',
        fontSize: `${toREM(12)}`,
        color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
        fontWeight: 600,
        backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_BACKGROUND,
        marginLeft: '3px',
      },
    },
    editFieldWrapper: {
      position: 'relative',
    },
    fieldError: {
      bottom: 0,
    },
    billedCompanyWrapper: {
      width: '100%',
    },
    reviewCardBody: {
      paddingTop: `${toREM(9)}`,
      '@media (max-width:960px)': {
        'MuiGrid-item:nth-child(even)': {
          paddingLeft: `${toREM(40)}`,
          borderLeft: `1px solid ${STYLE.COLOR.DIVIDER}`,
        },
      },
      '& > .cardBody-row': {
        paddingTop: `${toREM(20)}`,
        paddingBottom: `${toREM(20)}`,
        borderBottom: `1px solid ${STYLE.COLOR.DIVIDER}`,
        '&:first-child': {
          paddingTop: 0,
        },
        '&:last-child': {
          paddingBottom: 0,
          borderBottom: 0,
        },
        '& > .cardBody-item:nth-child(even)': {
          '@media (min-width:960px)': {
            borderLeft: `1px solid ${STYLE.COLOR.DIVIDER}`,
          },
        },
      },
    },
    mapWrapper: {
      width: '100%',
      height: '340px',
      display: 'flex',
      marginTop: '20px',
    },
    rowsWrapper: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      marginBottom: '25px',
      display: 'flex',
      flexWrap: 'nowrap',
    },
    projectOwnerCard: {
      paddingBottom: '24px !important',
    },
    rowsWrapperWithoutButton: {
      display: 'flex',
      flexWrap: 'nowrap',
    },
    optionalWrapper: {
      maxWidth: '70%',
      '& .MuiTypography-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },

    informationBlock: {
      width: '100%',
      height: 'auto',
      paddingBottom: `${toREM(26)}`,
      paddingRight: `${toREM(16)}`,
      overflow: 'hidden',
    },
    uncompletedLabel: {
      color: 'gray',
    },

    informationMiddleBlock: {
      backgroundColor: STYLE.COLOR.WHITE,
      borderLeft: '1px solid #EBEBEB',
      padding: '0.5px 41px',
      minWidth: 0,
    },

    fullWidth: {
      maxWidth: '100%',
    },
    halfMapWidth: {
      maxWidth: '49%',
    },
    addressCheckbox: {
      padding: '19.5px 0px',
    },
    userAction: {
      color: STYLE.COLOR.ACCENT_TERTIARY,
      fontSize: `${toREM(13)}`,
      position: 'relative',

      '& svg': {
        height: '15.7px',
        position: 'relative',
        bottom: '1.5px',
        width: 'auto',
        marginRight: '4px',
        '& path': {
          fill: STYLE.COLOR.ACCENT_TERTIARY,
        },
      },
    },
    userActionError: {
      color: STYLE.COLOR.ERROR,

      '& svg': {
        '& path': {
          fill: STYLE.COLOR.ERROR,
        },
      },
    },
    addressWrapper: {
      '& .MuiFormControlLabel-label': {
        position: 'relative',
        top: '1px',
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    billingRadioContainer: {
      width: '100%',

      '& .MuiFormControlLabel-root': {
        marginRight: 33,

        '&:last-child': {
          marginRight: 0,
        },
      },
    },
    billingModelTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY,
      fontWeight: 'bold',
    },
    billingModelTitleMarginTop: {
      marginTop: 30,
    },
    billingModelTitleMarginBottom: {
      marginBottom: 18,
    },
    responsibleBillingMarginBottom: {
      marginBottom: 10,
    },
    billingRadio: {
      width: '100%',

      '& .MuiFormControlLabel-root': {
        width: '50%',
        margin: 0,
      },

      '& .MuiFormControlLabel-root:nth-child(2)': {
        position: 'relative',
        left: 32,
      },

      '& .MuiFormControlLabel-root:nth-child(1)': {
        borderRight: 'solid 1px #E0E0E0',
      },

      '& .MuiButtonBase-root:nth-child(1)': {
        paddingLeft: 0,
      },
    },
    billingModelsWrapper: {
      display: 'flex',
      width: '100%',

      '& .MuiGrid-item': {
        width: '50%',
      },
    },
    billingDollarSign: {
      '& .MuiTypography-root': {
        fontSize: toREM(17),
        fontWeight: 'bold',
      },
    },
    billingTextField: {
      fontSize: toREM(17),
      fontWeight: 'bold',
      backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,

      '& .MuiInputBase-input': {
        paddingLeft: 0,
      },

      '& .MuiOutlinedInput-input': {
        backgroundColor: 'transparent',
      },

      '& .MuiInputBase-input::placeholder': {
        fontSize: toREM(17),
        lineHeight: toREM(26),
        fontWeight: 'bold',
      },
    },
    numberTextField: {
      fontSize: toREM(17),
      fontWeight: 'bold',

      '& .MuiInputBase-input::placeholder': {
        fontSize: toREM(17),
        lineHeight: toREM(26),
        fontWeight: 'bold',
      },
    },
    billingBadgePrice: {},
    billingWorkersEstimated: {
      marginBottom: 0,
      width: '95% !important',
    },
    billableClientCheckbox: {
      marginBottom: 0,

      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    taxExemptCheckbox: {
      marginTop: 10,
      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    fixedSeatPriceCheckbox: {
      marginBottom: 0,
      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    totalPrice: {
      padding: 13,
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      fontSize: toREM(STYLE.FONT.SIZE.PARAGRAPH),
      fontWeight: 600,
      width: '100%',
      borderTop: 'solid 1px #E6E6E6',
      marginTop: 40,
      marginBottom: 23,
    },
    totalPriceValue: {
      float: 'right',
    },
    billingResponsible: {
      marginBottom: 20,

      '& .MuiSelect-root': {
        fontSize: toREM(17),
        bottom: 0,
      },
    },
    billingInfoText: {
      color: STYLE.COLOR.ACCENT_TERTIARY,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      letterSpacing: 0,
      position: 'relative',
      bottom: 2,
    },
    billingReprintingInfoLabel: {
      fontWeight: 400,
      color: STYLE.COLOR.ACCENT_TERTIARY,
      marginBottom: 20,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      display: 'flex',

      '& svg': {
        width: '15px',
        height: '15px',
        marginRight: 10,
        flexShrink: 0,

        '& path': {
          transform: 'scale(1.000)',
          fill: STYLE.COLOR.ACCENT_TERTIARY,
        },
      },
    },
    descriptionFont: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      lineHeight: '21px',
      whiteSpace: 'break-spaces',
    },
    descriptionTitle: {
      paddingBottom: '8px',
    },
    activeSelectOption: {
      '& .MuiInputBase-root': {
        color: STYLE.COLOR.LIGHT_GRAY4,
        fontWeight: 500,
      },
    },
    middleInput: {
      width: '95.8% !important',
    },
    descriptionInput: {
      '& .MuiInputBase-root': {
        padding: 0,
        height: '147px',
      },
      '& .MuiInputBase-input': {
        height: '110px !important',
        padding: '12px 16px 25px 16px',

        '&::placeholder': {
          textTransform: 'none',
        },
      },
    },
    topInput: {
      paddingTop: '6px',
    },
    dateInput: {
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
    hideDeleteButton: {
      display: 'none',
    },
    showDeleteButton: {
      display: 'flex',
      marginLeft: '21px',
    },
    formControlWrapper: {
      justifyContent: 'space-between',
      '& .MuiInputBase-input': {
        paddingRight: '21px',
      },
    },
    inputWrapper: {
      maxWidth: '100%',
      flexBasis: '100%',
    },
    entityResponse: {
      color: STYLE.COLOR.ACCENT_TERTIARY,
      fontSize: `${toREM(12)}`,
      paddingTop: '8px',
      '& a': {
        textDecoration: 'none',
      },
    },
    accent: {
      fontWeight: 600,
    },
    editAccentColor: {
      color: STYLE.COLOR.ACCENT_PRIMARY,
    },
    activeOption: {
      '& input': {
        color: STYLE.COLOR.BLACK,
        fontWeight: 500,
      },
    },
    billingModelFirstItem: {
      paddingRight: 40,
      paddingTop: 37,
    },
    billingModelSecondItem: {
      paddingLeft: 40,
      paddingTop: 37,
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    errorPosition: {
      position: 'relative',
    },
    descriptionErrorPosition: {
      bottom: 0,
    },
    spanEllipsis: {
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    workerConsentFormPosition: {
      paddingTop: 32,
      overflow: 'auto',
    },
    billingInputMarginBottom: {
      marginBottom: 18,
    },
    badgesDivider: {
      height: '50%',
      position: 'relative',
      top: 38,
    },
    seatsDivider: {
      height: '61%',
      position: 'relative',
      top: 38,
    },
    noMarginBottom: {
      marginBottom: 0,
    },
    cardContainer: {
      paddingTop: 30,
    },
    createGroupButton: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      marginTop: 30,
    },
    spacedInputs: {
      '&.MuiGrid-spacing-xs-10': {
        width: 'calc(100% + 20px)',
        margin: -10,
        '&  > .MuiGrid-item': {
          padding: 10,
        },
      },
    },
  })
);
