import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants/style';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'center',
      height: 360,
      width: 290,
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
      position: 'relative',
      minWidth: 290,
      marginRight: 40,
      border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3} !important`,
    },
    leftContainerTemplate: {
      left: 0,
    },
    secondaryContainerBackground: {
      backgroundColor: STYLE.COLOR.INACTIVE,
    },
    badgeDivider: {
      width: '100%',
      maxWidth: 80,
      height: '6px',
      backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
      marginTop: 10,
      borderRadius: 6,
      zIndex: 2,
    },
    secondaryBadgeBackground: {
      backgroundColor: STYLE.COLOR.WHITE,
    },
    dataContainer: {
      display: 'flex',
      width: '100%',
      height: 250,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: STYLE.COLOR.WHITE,
      position: 'absolute',
      bottom: 0,
      maxWidth: '100%',
    },
    dataContainerOverlap: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '100%',
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      zIndex: 1,
      width: '100%',
      borderRadius: '4px',
    },
    badgeContainerBorderRadius: {
      borderRadius: 4,
    },
    badgeBorderRadius: {
      borderRadius: '0px 0px 4px 4px',
    },
    avatarPosition: {
      position: 'relative',
      bottom: 64,
      zIndex: 1,
    },
    badgeTextWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      bottom: 55,
    },
    summaryBadgeTextWrapper: {
      bottom: '40px !important',
    },
    badgeTitle: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING)}`,
      fontWeight: 600,
      maxWidth: 270,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    badgeSubtitle: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 400,
      maxWidth: 270,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    badgePosition: {
      '& .MuiBadge-badge': {
        position: 'absolute',
        right: 22,
        bottom: 20,
      },
    },
    summaryBarcodePosition: {
      left: '73px !important',
    },
    barcodePosition: {
      position: 'absolute',
      bottom: 30,
      left: 92,
    },
    dropdownWrapper: {
      display: 'flex',
      position: 'relative',
      left: 55,
      bottom: 26,
      opacity: 0.5,
    },
    dropdownStatus: {
      color: STYLE.COLOR.SECONDARY_LIGHTER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    dropdownIcon: {
      marginLeft: '10px',
      '& .MuiButton-root': {
        minWidth: 0,
      },
      '& .MuiButtonBase-root': {
        padding: 0,

        '& .MuiButton-label': {
          '& .MuiButton-startIcon': {
            margin: 0,
          },
        },
      },

      '& .MuiIconButton-root': {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },

      '& svg': {
        opacity: '0.3',
        height: '17px',
        width: '17px',
      },
    },
    logoWrapper: {
      position: 'relative',
      bottom: 72,
      '& svg': {
        width: 112,
        '& path': {
          fill: STYLE.COLOR.ACCENT_PRIMARY_DARKER,
        },
      },
    },
    emergencyAccent: {
      fontWeight: 600,
    },
    emergencyWrapper: {
      textAlign: 'center',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      bottom: 20,
      '& p': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      },
    },
    emergencySpecialText: {
      width: '52%',
      textAlign: 'end',
      whiteSpace: 'initial',
    },
    emergencyQrRow: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexDirection: 'row',
      maxWidth: 212,
      bottom: 0,
      top: 18,
    },
    qrWrapper: {
      width: 85,
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: -25,
      width: '100%',
      maxWidth: 34,
      '& .Mui-checked:hover': {
        backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      },
      '& .Mui-focusVisible': {
        border: `1px solid ${STYLE.COLOR.SECONDARY_LIGHTER}`,
      },
    },
    circleButton: {
      display: 'block',
      height: 12,
      width: 12,
      borderRadius: '50%',
      minWidth: 0,
      padding: 0,
      '& svg': {
        display: 'none',
      },
    },
    circleButtonActive: {
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      '&:hover': {
        backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      },
    },
    circleButtonInactive: {
      backgroundColor: STYLE.COLOR.UNCOMPLETED,
      '&:hover': {
        backgroundColor: STYLE.COLOR.UNCOMPLETED,
      },
    },
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  })
);

export const BadgeLayoutStyles = makeStyles(theme =>
  createStyles({
    badgeCode: {
      minHeight: '24px',
    },
    badgeLayoutContainer: {
      height: 420,
      width: 262,
      minWidth: 262,
      marginRight: 0,
      boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
      borderRadius: '7px',
      backgroundColor: 'transparent',
    },
    badgeLayoutTitle: {
      fontSize: `${toREM(20)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    badgeLayoutSubtitle: {
      fontSize: `${toREM(16)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
    badgeSmallParagraph: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      fontWeight: 'bold',
    },
    emergencyWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: 115,
    },
    emergencyWrapperPosition: {
      position: 'relative',
      top: 32,
    },
    badgeEmergencyText: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
      fontWeight: 'bold',
    },
    badgeEmergencyTitle: {
      color: STYLE.COLOR.EMERGENCY_CONTACT,
      marginBottom: 15,
    },
    FCLogo: {
      width: 146,
      height: 56,
    },
    badgeGeneralRadius: {
      borderRadius: '7px',
    },
    badgeInfoRadius: {
      borderBottomLeftRadius: '6px',
      borderBottomRightRadius: '6px',
    },
    buttonWrapperPosition: {
      bottom: -32,
    },
    placeholderWrapper: {
      color: STYLE.COLOR.WHITE,
      border: '1px dashed',
      borderRadius: '2px',
      display: 'flex',
      alignItems: 'center',
      padding: '0px 10px',
      fontWeight: 600,
    },
    fullHeight: {
      height: '100%',
    },
    badgeIssuedWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      '& p': {
        marginBottom: 16,
      },
    },
    badgeIssuedPosition: {
      position: 'relative',
      top: 60,
    },
    badgeBarcodePosition: {
      position: 'relative',
      top: 98,
    },
  })
);

export const BadgeLayoutOneStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: 237,
    },
    subDataContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '80%',
      position: 'absolute',
      bottom: 67,
    },
    badgeTextPosition: {
      bottom: 42,
    },
    imageWrapper: {
      position: 'absolute',
      top: -130,
      height: '100%',
      maxWidth: 144,
      maxHeight: 54,
    },
    placeholderColor: {
      color: STYLE.COLOR.WHITE,
    },
    badgeFCCopy: {
      textAlign: 'center',
      position: 'relative',
      top: 140,
    },
  })
);

export const BadgeLayoutTwoStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: 256,
    },
    subDataContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '80%',
      position: 'absolute',
      bottom: 67,
    },
    badgeTextPosition: {
      bottom: 73,
    },
    imageWrapper: {
      position: 'absolute',
      top: -110,
      height: '100%',
      maxWidth: 144,
      maxHeight: 54,
    },
    placeholderColor: {
      color: STYLE.COLOR.BLACK,
    },
    badgeFCCopy: {
      position: 'relative',
      top: 84,
    },
    dataContainerSecondaryBg: {
      backgroundColor: `${STYLE.COLOR.WHITE} !important`,
    },
    avatarPosition: {
      position: 'relative',
      bottom: 30,
      zIndex: 1,
    },
    nameBackground: {
      height: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingTop: '35px',

      '& p': {
        color: '#fff',
      },
    },
  })
);

export const BadgeLayoutThreeStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: 295,
      paddingTop: 15,
    },
    subDataContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '80%',
      position: 'absolute',
      bottom: 67,
    },
    badgeTextPosition: {
      bottom: -1,
    },
    imageWrapper: {
      position: 'absolute',
      top: -72,
      height: '100%',
      maxWidth: 144,
      maxHeight: 54,
    },
    placeholderColor: {
      color: STYLE.COLOR.WHITE,
    },
    badgeFCCopy: {
      position: 'relative',
      top: 84,
    },
    avatarPosition: {
      position: 'relative',
      bottom: 6,
      zIndex: 1,
    },
    nameBackground: {
      height: 301,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',

      '& p': {
        color: '#fff',
      },
    },
  })
);

export const VisitorLayoutStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: 280,
    },
    subDataContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '80%',
      position: 'relative',
      bottom: -16,
      minHeight: 24,
    },
    badgeTextPosition: {
      bottom: 20,
    },
    imageWrapper: {
      position: 'absolute',
      top: -88,
      height: '100%',
      maxWidth: 144,
      maxHeight: 54,
    },
    placeholderColor: {
      color: STYLE.COLOR.BLACK,
    },
    badgeIssuedPosition: {
      position: 'relative',
      top: 131,
    },
    badgeFCCopy: {
      textAlign: 'center',
      position: 'relative',
      top: 260,
    },
    badgeBarcodePosition: {
      position: 'relative',
      top: 213,
    },
    avatarPosition: {
      position: 'relative',
      bottom: 30,
      zIndex: 1,
    },
    nameBackground: {
      height: 170,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      textAlign: 'center',

      '& p': {
        color: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    dataContainerSecondaryBg: {
      backgroundColor: STYLE.COLOR.WHITE,
    },
    visitorTitle: {
      fontSize: `${toREM(40)}`,
      fontWeight: 'bold',
      maxWidth: 260,
      wordBreak: 'break-word',
      padding: '0 30px',
    },
  })
);
