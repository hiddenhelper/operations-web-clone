import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    typeLabel: {
      width: '100%',
      textAlign: 'left',
    },
    billingModelSecondItem: {
      paddingLeft: 33,
      paddingTop: 37,
    },
    billingDollarSign: {
      '& .MuiTypography-root': {
        color: STYLE.COLOR.SECONDARY_DARKER,
        fontSize: toREM(17),
        fontWeight: 'bold',
      },
    },
    drawerDivider: {
      position: 'absolute',
      left: 0,
      right: 0,
      width: '100%',
    },
    deviceListContent: {
      width: 'calc(100% - 321px)',
    },
    projectRowButtonWrapper: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      '& .MuiButtonBase-root': {
        fontSize: toREM(15),
        padding: 0,
        color: STYLE.COLOR.SECONDARY_LIGHTER,
        fontWeight: 400,
      },
    },
  })
);
