import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    drawerPaper: {
      width: 331,
      padding: '0px 30px',
      overflowX: 'hidden',

      '&.MuiPaper-root': {
        position: 'absolute',
        top: 80,
        zIndex: 1,
        height: props => ((props as any).clientListHeight > 900 ? (props as any).clientListHeight : '100%'),
        overflowY: 'hidden',
        minHeight: props => ((props as any).clientListHeight > 900 ? '100%' : `${toREM(900)}`),
      },
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  })
);
