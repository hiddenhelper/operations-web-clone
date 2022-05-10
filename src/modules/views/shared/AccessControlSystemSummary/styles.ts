import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    summaryDeviceDetail: {
      height: '55%',
      overflow: 'hidden',
      overflowY: 'scroll',
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    company: {
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    deviceAccent: {
      fontWeight: 600,
      paddingBottom: '2px',
    },
    summarySection: {
      display: 'flex',
      paddingBottom: '3px',
      paddingTop: `${toREM(29)}`,
      wordBreak: 'break-word',
      '& svg': {
        '& path': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
      },
    },
    summaryText: {
      display: 'flex',
      flexDirection: 'column',
      wordBreak: 'break-word',
      width: '100%',
      '& span': {
        paddingBottom: '4px',

        '&:last-child': {
          paddingBottom: 0,
        },
      },
    },
    summaryMainText: {
      paddingLeft: `${toREM(39)}`,
      display: 'flex',
      flexDirection: 'column',
      '& span': {
        paddingBottom: '4px',

        '&:last-child': {
          paddingBottom: 0,
        },
      },
    },
    summaryTextSeparation: {
      paddingLeft: `${toREM(15)}`,
    },
    entityTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    drawerdevices: {
      flexDirection: 'column',
    },
    deviceWrapper: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: `${toREM(28)}`,

      '&:last-child': {
        marginBottom: 0,
      },
    },
    summaryRowDirection: {
      display: 'flex',
      flexDirection: 'row',
    },
    drawerOverflowWrapper: {
      overflowY: 'auto',
      position: 'relative',
      paddingBottom: '30px',
    },
  })
);
