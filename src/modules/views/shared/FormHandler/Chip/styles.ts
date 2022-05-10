import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    selectChip: {
      borderRadius: '2px',
      fontSize: STYLE.FONT.SIZE.PARAGRAPH,
      marginRight: toREM(7),
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      border: `1px solid ${STYLE.COLOR.ACCENT_PRIMARY_LIGHTER}`,

      '& .MuiSvgIcon-root': {
        color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      },
    },
    statusChip: {
      height: '17px',
      fontSize: `${toREM(12)}`,
      fontWeight: 600,
      marginLeft: '3px',
      border: '1px solid transparent',
    },
    tableStatusChip: {
      marginLeft: 0,
    },
    statusChipDraft: {
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_BACKGROUND,
    },
    statusChipPendingApproval: {
      color: STYLE.COLOR.PENDING_FONT,
      backgroundColor: STYLE.COLOR.PENDING_BACKGROUND,
    },
    assigned: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
    },
    statusChipActive: {
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.PRIMARY,
    },
  })
);
