import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    statusChip: {
      height: '22.5px',
      fontSize: `${toREM(12)}`,
      fontWeight: 600,
      marginLeft: '11px',
      color: STYLE.COLOR.SECONDARY_LIGHTER,
      backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
      cursor: 'inherit',

      '& .MuiChip-label': {
        position: 'relative',
        top: 1,
      },
    },
    tableStatusChip: {
      marginLeft: 0,
    },
    draft: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
    },
    pendingapproval: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: `${STYLE.COLOR.ACCENT_TERTIARY} !important`,
    },
    assigned: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
    },
    available: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.PRIMARY_LIGHTER,
    },
    active: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: `${STYLE.COLOR.PRIMARY_LIGHTER} !important`,
    },
    pending: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: `${STYLE.COLOR.ACCENT_TERTIARY} !important`,
    },
    expired: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.ERROR_ICON,
    },
    Pending: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.ACCENT_TERTIARY,
    },
    Accepted: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.PRIMARY,
    },
    Finished: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.LIGHT_GRAY8,
    },
  })
);
