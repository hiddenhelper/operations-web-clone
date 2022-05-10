// @ts-nocheck
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    inactiveIcon: {
      '& path': {
        fill: STYLE.COLOR.INACTIVE,
      },
    },
    filledInput: {
      '& svg': {
        fill: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    errorIcon: {
      '& svg': {
        fill: STYLE.COLOR.ERROR_ICON,
      },
    },
    inputSubtitle: {
      color: STYLE.COLOR.LIGHT_GRAY6,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      fontWeight: 400,
      marginBottom: 0,
      paddingBottom: `${toREM(18)}`,
      lineHeight: `${toREM(15)}`,
    },
    inputSubtitleError: {
      color: STYLE.COLOR.ERROR_FORM,
    },
    errorLoginMessage: {
      '&.MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
        fontWeight: 600,
        marginBottom: 0,
        lineHeight: `${toREM(15)}`,
        position: 'relative',
      },
    },
  })
);
