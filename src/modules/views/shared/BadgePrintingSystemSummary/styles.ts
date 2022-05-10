import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    summaryDeviceDetail: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    dropdownIcon: {
      marginLeft: '10px',
      '& .MuiButton-root': {
        minWidth: 0,
      },
      '& .MuiButtonBase-root': {
        padding: 0,

        '& .MuiButton-label': {
          '& .MuiButton-startIcon': {
            margin: 0,
          },
        },
      },
    },
    filterStatusContainer: {
      width: 'auto',
      height: `${toREM(50)}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '& .MuiTypography-root': {
        fontSize: STYLE.FONT.SIZE.PARAGRAPH,
      },
    },
    filterStatusSpaced: {
      justifyContent: 'space-between',
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
    billingModelSecondItem: {
      paddingLeft: 33,
      paddingTop: 37,
    },
    drawerSection: {
      display: 'flex',
      paddingBottom: '3px',
      paddingTop: `${toREM(29)}`,
      wordBreak: 'break-word',
      '& svg': {
        width: 27,
        height: 26,
        '& path': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
      },
    },
    drawerNotesIcon: {
      width: '26.5px !important',
    },
    drawerSecondaryNotesIcon: {
      width: '30.5px !important',
    },
    drawerMonetizationIcon: {
      width: '29px !important',
      height: '26px !important',
    },
    drawerText: {
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
    drawerMainText: {
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
    drawerTextSeparation: {
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
    drawerRowDirection: {
      display: 'flex',
      flexDirection: 'row',
    },
    drawerColumnDirection: {
      display: 'flex',
      flexDirection: 'column',
    },
    drawerOverflowWrapper: {
      overflowY: 'auto',
      position: 'relative',
      paddingBottom: '30px',
      maxHeight: `${toREM(615)}`,
      width: 290,
      paddingRight: '2px',
    },
    bpsIconSize: {
      width: 29,
    },
  })
);
