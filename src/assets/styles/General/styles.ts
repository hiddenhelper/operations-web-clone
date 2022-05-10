import { createStyles, makeStyles } from '@material-ui/core/styles';

export const generalGlobalStyles = makeStyles(theme =>
  createStyles({
    scrollHided: {
      marginRight: props => (props as any).scrollWidth || 15,
    },
    textEllipsis: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  })
);
