import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    widgetTitleMarginBottom: {
      marginBottom: 18,
    },
    revenueWidgetContent: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '350px',
      paddingRight: 0,
      height: 350,
    },
  })
);
