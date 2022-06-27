import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    locationSite: {
      paddingRight: '15px',
    },
    hasReverseInstallation: {
      margin: '5px 3px',
    },
  })
);
