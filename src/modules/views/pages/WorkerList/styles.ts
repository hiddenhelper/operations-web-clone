import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    avatarPosition: {
      '& .MuiBadge-badge': {
        top: '3.5px !important',
        right: '22px !important',
      },
    },
  })
);

export const workerStyles = makeStyles(theme =>
  createStyles({
    workerRow: {
      '&:nth-child(1)': {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        top: '1px',
        '& .MuiAvatar-root': {
          backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
          height: `${toREM(32)}`,
          width: `${toREM(32)}`,
          marginRight: `${toREM(20)}`,

          '& .MuiSvgIcon-root': {
            fill: STYLE.COLOR.INACTIVE,
          },
        },
      },
    },
    workerRowButtonWrapper: {
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      '& .MuiButton-label': {
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'left',
      },
      '& .MuiButtonBase-root:hover': {
        backgroundColor: 'initial',
      },
    },
    workerCenter: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
  })
);
