import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    archiveDialog: {
      '& .MuiPaper-root': {
        width: `${toREM(440)}`,
      },
    },
    userCenter: {
      display: 'flex',
      alignItems: 'center',
    },
    workerName: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      '& a': {
        textDecoration: 'none',
      },
    },
    avatarPosition: {
      '& .MuiBadge-badge': {
        top: '3.5px !important',
        right: '22px !important',
      },
    },
    statusChip: {
      height: '22px',
      fontSize: `${toREM(12)}`,
      fontWeight: 600,
      marginLeft: '11px',
      color: STYLE.COLOR.SECONDARY_LIGHTER,
      backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
    },
    boldAccentAnchor: {
      '&.MuiTableCell-root': {
        color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
        fontWeight: 600,
      },
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
    stepWrapper: {
      fontSize: `${toREM(15)}`,
      color: STYLE.COLOR.ACCENT_SECONDARY,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    archiveButton: {
      height: `${toREM(50)}`,
      width: `${toREM(160)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      fontWeight: 600,
      marginTop: toREM(23),

      '&:hover': {
        border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      },
    },
    firstFilter: {
      marginRight: '40px',
    },
    cellAvatarRowDirection: {
      display: 'flex',
      flexDirection: 'row',
    },
  })
);

export const tableRowStyles = () =>
  createStyles({
    root: {
      '& .MuiTableCell-root': {
        paddingTop: `${toREM(13)}`,
        paddingBottom: `${toREM(13)}`,

        '& .MuiButtonBase-root': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      '&:nth-of-type(odd)': {
        backgroundColor: STYLE.COLOR.WHITE,
      },
    },
  });
