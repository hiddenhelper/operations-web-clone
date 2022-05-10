import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    switch: {
      '&.MuiSwitch-root': {
        '& .MuiSwitch-track': {
          backgroundColor: STYLE.COLOR.UNCOMPLETED,
        },
        '& .MuiSwitch-thumb': {
          color: STYLE.COLOR.UNCOMPLETED,
        },
        '& .Mui-checked': {
          '& .MuiSwitch-thumb': {
            color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
          },
        },
      },
    },
    checked: {
      '&.MuiSwitch-root': {
        '& .MuiSwitch-track': {
          backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
        },
      },
    },
  })
);
