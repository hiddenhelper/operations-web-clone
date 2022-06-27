import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    maxHeight: {
      maxHeight: '496px',
    },
    pieContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    widgetBulletLabelWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    widgetDivider: {
      backgroundColor: '#DCDCDC',
      marginBottom: 12,
    },
    widgetDividerTopMargin: {
      marginTop: 12,
      '@media (max-width:415px)': {
        marginTop: '22px',
      },
    },
    marginNull: {
      margin: '0px !important',
    },
  })
);
