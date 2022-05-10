import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    selectLabel: {
      fontSize: '0.85rem',
      maxHeight: '20px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    iconRoot: {
      fontSize: '1.3rem',
    },
    formGroupRoot: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
      gridGap: '12px 15px',
      gridAutoRows: '2em',
      gridAutoFlow: 'column',

      '@media (max-width:1380px)': {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'repeat(auto-fit, minmax(0, 1fr))',
        gridAutoFlow: 'dense',
      },
      '@media (max-width:1200px)': {
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(auto-fit, minmax(0, 1fr))',
        gridAutoFlow: 'dense',
      },

      '& .MuiFormControlLabel-root': {
        width: `${toREM(278)}`,
        maxHeight: '32px',
        margin: 0,

        '& .MuiSvgIcon-root': {
          fontSize: '1.5rem',
          marginRight: '4px',
        },
        '& .MuiTypography-root': {
          fontSize: `${toREM(15)}`,
        },
      },
    },
    verticalRows: {
      display: 'flex',
      flexDirection: 'column',
    },
    formControlRoot: {
      width: '100%',
    },
  })
);
