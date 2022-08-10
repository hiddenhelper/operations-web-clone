import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../utils/generalUtils';
import { STYLE } from '../../../constants';

export const modalGlobalStyles = makeStyles(theme =>
  createStyles({
    title: {
      fontSize: toREM(20),
      fontWeight: 600,
      marginLeft: 12,
    },
    headerAdditionalInfo: {
      fontWeight: 400,
      color: STYLE.COLOR.LIGHT_GRAY5,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      position: 'absolute',
      right: 40,
      top: 25,

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
    headerAdditionalInfoLabel: {
      color: STYLE.COLOR.LIGHT_GRAY5,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
    },
    titleContainer: {
      padding: '20px 24px',
    },
    modalFilterDivider: {
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
    },
    modalBottomFooter: {
      height: 70,
    },
    modalCtaButton: {
      fontWeight: 600,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      height: 35,
      width: 120,
      '& .MuiButton-label': {
        position: 'relative',
        top: 1,
      },
    },
    modalCtaMarginRight: {
      marginRight: 31,
    },
    secondaryText: {
      color: STYLE.COLOR.SEPTENARY,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      letterSpacing: 0,
    },
    modalContainer: {
      '& .MuiDialog-paper': {
        width: '1140px',
        height: '700px',
        maxWidth: 'none !important',
      },
    },
  })
);

export const fullScreenModalGlobalStyles = makeStyles(theme =>
  createStyles({
    loadingSkeleton: {
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialogContentWrapper: {
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      padding: '20px 225px 20px 225px',
      '& .MuiPaper-root': {
        maxWidth: 960,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
      },
    },
    cardDividerMargin: {
      '& .MuiDivider-root': {
        marginBottom: 21,
      },
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '78%',
    },
    title: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(15)}`,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    subTitle: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(15)}`,
    },
    headerWrapper: {
      height: `${toREM(100)}`,
      display: 'flex',
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      justifyContent: 'space-between',
      flex: '0 0 auto',

      '& .MuiButtonBase-root': {
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
      },
    },
    headerMainContent: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: 960,
    },
    headerData: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '14%',
      height: '100px',
      marginRight: 'auto',
      paddingRight: 43,
      '@media(max-width:569px)': {
        marginLeft: '10%',
      },
      '@media(max-width:415px)': {
        marginLeft: '5px',
        paddingRight: '20px',
      },
    },
    smallDevice: {
      '@media(max-width:321px)': {
        fontSize: '12px',
      },
    },
    logoWrapper: {
      width: `${toREM(149)}`,
      height: `${toREM(59)}`,
      '@media(max-width:415px)': {
        width: '90px',
      },
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 166,
    },
    actionButtons: {
      width: 72,
      display: 'flex',
      justifyContent: 'flex-end',
      '& svg': {
        '& path': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
        '& polygon': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
      },
    },
    closeButton: {
      position: 'relative',
      paddingRight: 40,
    },
    consentFormCell: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      marginBottom: 34,
    },
    consentFormCellTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 500,
      marginBottom: 6,
    },
    consentFormCellData: {
      fontSize: `${toREM(24)}`,
      fontWeight: 'bold',
      wordBreak: 'break-word',
      marginRight: '15px',
    },
    legalWrapper: {
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
    legalTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 'bold',
    },
    legalMargin: {
      marginBottom: 20,
    },
    legalSubtitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 600,
    },
    legalParagraph: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    subtitleMargin: {
      marginBottom: 8,
    },
    consentTitleMargin: {
      marginBottom: 18,
    },
    legalList: {
      padding: 0,
      '& li': {
        listStyleType: 'none',
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        marginBottom: 9,
      },
    },
    signatureImage: {
      maxHeight: 153,
      maxWidth: '100%',
      paddingTop: 17,
      paddingBottom: 42,
    },
    workerName: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 500,
      paddingBottom: 3,
    },
    projectFormModal: {
      marginBottom: 152,
    },
    projectFormPaddingTop: {
      paddingTop: 18,
    },
    signatureWrapper: {
      display: 'flex',
      flexDirection: 'row',
    },
    signatureDate: {
      fontSize: '15px',
      fontWeight: 500,
      '&::before': {
        content: '""',
        borderLeft: `1px solid ${STYLE.COLOR.DIVIDER}`,
        margin: '0 20px 0 25px',
      },
    },
    workerConsentFormEditModal: {
      '& .contentContainer': {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '0px',
        paddingRight: '0px',
        '& > div': {
          width: '960px',
          height: 'max-content',
        },
      },
    },
  })
);
