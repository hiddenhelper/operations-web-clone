import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      '& .title': {
        fontSize: `${STYLE.FONT.SIZE.HEADING_MEDIUM}px`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
      },
      '& .date': {
        fontSize: `${STYLE.FONT.SIZE.HEADING_1}px`,
        color: 'gray',
        textAlign: 'center',
      },
    },
    paragraph: {
      margin: '10px 0',

      '& .title': {
        fontSize: `${STYLE.FONT.SIZE.HEADING}px`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      '& pre': {
        fontSize: `${STYLE.FONT.SIZE.PARAGRAPH}px`,
        overflow: 'hidden',
        fontFamily: `${STYLE.FONT.PRIMARY_FONT}`,
        whiteSpace: 'break-spaces',
      },
    },
  })
);
