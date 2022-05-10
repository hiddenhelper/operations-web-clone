// @ts-nocheck
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    box: {
      margin: theme.spacing(2, 0, 0, 0),
      width: '100%',
    },
    logoWrapper: {
      position: 'relative',
      margin: '0 auto',
      right: `${toREM(136)}`,
      paddingTop: `${toREM(24)}`,
      paddingBottom: `${toREM(44)}`,
    },
    loginLogo: {
      width: `${toREM(192.85)}`,
      height: `${toREM(74.79)}`,
    },
    formContainer: {
      position: 'relative',
      width: `${toREM(460)}`,
      backgroundColor: STYLE.COLOR.WHITE,
      padding: '0 40px',
      borderRadius: '6px',

      '& .MuiInputBase-root': {
        '& .MuiOutlinedInput-inputAdornedStart': {
          paddingLeft: '0 !important',
          position: 'relative',
          top: '2px',
        },
      },
    },
    formContainerWrapper: {
      paddingTop: `${toREM(44)}`,
      paddingBottom: `${toREM(34)}`,
    },
    formTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    legalLabelWrapper: {
      position: 'relative',
      top: `${toREM(40)}`,
      paddingBottom: `${toREM(40)}`,
    },
    legalLabel: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 500,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
    },
    formSubtitle: {
      color: STYLE.COLOR.LIGHT_GRAY6,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      marginBottom: 0,
      wordBreak: 'break-word',
      paddingBottom: '10px',
    },
  })
);
