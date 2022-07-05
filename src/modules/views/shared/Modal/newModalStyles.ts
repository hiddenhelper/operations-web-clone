import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from 'utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100vw',
      '& .MuiDialog-container': {
        '@media (min-width:569px)': {
          marginLeft: '80px',
        },
      },
      '& .MuiDialogContent-root': {
        background: '#F5F5F5',
        borderTop: '1px solid #E5E5E5',
        borderBottom: '1px solid #E5E5E5',
        padding: 0,
        paddingTop: toREM(39),
        paddingBottom: toREM(8),
      },
      '& .MuiDialogTitle-root': {
        wordBreak: 'break-all',
        color: STYLE.COLOR.SECONDARY,
        padding: '24px 0px 24px 40px',
        fontWeight: 500,
        fontSize: toREM(20),
      },
      '& .MuiTypography-root': {
        fontSize: toREM(20),
        lineHeight: toREM(21),
        fontWeight: 600,
        height: toREM(21),
        '@media (max-width:281px )': {
          fontSize: '1.0rem',
        },
      },
      '& .MuiDialog-paper': {
        width: toREM(1040),
        height: toREM(680),
      },
      '& .MuiDialog-paperWidthSm': {
        maxWidth: toREM(1040),
      },
      '& .MuiDialogActions-root': {
        height: toREM(70),
        padding: `${toREM(18)} ${toREM(40)}`,
      },
    },
  })
);
