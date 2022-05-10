import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    emptyCardItem: {
      width: 580,
      height: 280,
      border: `dashed 1px ${STYLE.COLOR.SEPTENARY}`,
      borderRadius: 5,
      display: 'flex',
    },
    cardItem: {
      width: 580,
      height: 280,
      borderRadius: 12,
      padding: 20,
      border: `solid 1px ${STYLE.COLOR.LIGHT_GRAY3}`,
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      display: 'flex',
      marginBottom: 37,
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
    },
    cardItemClickable: {
      cursor: 'pointer',
    },
    compactCardItem: {
      backgroundColor: STYLE.COLOR.SECONDARY_WHITE,
      height: 150,
    },
    newCardContainer: {
      width: '100%',
    },
    newCardFormContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20,
    },
    cardFormTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING_1)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 600,
      lineHeight: `${toREM(28)}`,
      marginLeft: 40,
      marginBottom: 20,
    },
    cardFormSubtitle: {
      marginLeft: 40,
      marginBottom: 40,
    },
    cardItemSelected: {
      border: `solid 3px ${STYLE.COLOR.PRIMARY}`,
    },
    cardSelectedIcon: {
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    creditCardIconImage: {
      height: 48,
      width: 72,
    },
    creditCardTitle: {
      fontWeight: 600,
    },
    creditCardHolder: {
      fontWeight: 500,
    },
    creditCardNumber: {
      fontWeight: 600,
      fontSize: 24,
    },
    creditCardLogo: {
      width: 72,
      height: 48,
    },
    creditCardLogoContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginLeft: 30,
      borderRadius: '50%',
      width: 18,
      height: 18,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: STYLE.COLOR.WHITE,
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',

      '$root.Mui-focusVisible &': {
        outline: `2px auto ${STYLE.COLOR.ACCENT_PRIMARY}`,
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
    },
    activeIcon: {
      'input:disabled ~ &': {
        boxShadow: 'none',
      },
    },
    inactiveIcon: {
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY,
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 18,
        height: 18,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: STYLE.COLOR.ACCENT_PRIMARY,
      },
    },
    cardNumberWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    formCardItem: {
      width: '100%',
      border: `dashed 1px ${STYLE.COLOR.SEPTENARY}`,
      borderRadius: 5,
      display: 'flex',
      paddingTop: 20,
      justifyContent: 'center',
      position: 'relative',
    },
    addNewCardButton: {
      margin: 'auto',
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 600,

      '&:hover': {
        backgroundColor: 'initial',
      },

      '&:focus': {
        outline: 'none',
        border: 'none',
      },

      '& .MuiButton-label:focus': {
        outline: 'none',
        border: 'none',
      },

      '& svg': {
        marginRight: 5,
        position: 'relative',
        bottom: 1,
      },

      '& path': {
        fill: STYLE.COLOR.ACCENT_PRIMARY,
      },
    },
    closeButton: {
      position: 'absolute',
      right: 0,
    },
  })
);
