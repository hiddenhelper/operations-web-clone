import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    bulletLabelWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    statusCircle: {
      height: 10,
      width: 10,
      borderRadius: '50%',
      marginRight: 10,
    },
    statusText: {
      color: STYLE.COLOR.SECONDARY_LIGHTER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      letterSpacing: 0.38,
    },
    Draft: {
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
    },
    Pending: {
      backgroundColor: STYLE.COLOR.ACCENT_TERTIARY,
    },
    Active: {
      backgroundColor: STYLE.COLOR.SUCCESS,
    },
    Assigned: {
      backgroundColor: STYLE.COLOR.SUCCESS,
    },
    Inactive: {
      backgroundColor: STYLE.COLOR.ERROR_ICON,
    },
    Primary: {
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY,
    },
    Secondary: {
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER2,
    },
    Tertiary: {
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER3,
    },
  })
);
