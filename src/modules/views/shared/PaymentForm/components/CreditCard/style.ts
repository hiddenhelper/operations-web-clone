import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../../constants';
import { toREM } from '../../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING_1)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 600,
      lineHeight: `${toREM(28)}`,
      textAlign: 'center',
      marginBottom: '-15px',
    },
    cardInformation: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
    cardBrand: {
      textTransform: 'capitalize',
    },
    footerTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      lineHeight: `${toREM(28)}`,
    },
    inputSeparator: {
      marginBottom: '25px',
    },
    footerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '25px',
    },
    buttonDone: {
      backgroundColor: `${STYLE.COLOR.SUCCESS} !important`,
    },
  })
);
