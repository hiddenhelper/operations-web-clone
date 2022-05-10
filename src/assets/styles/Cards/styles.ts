import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../constants';
import { toREM } from '../../../utils/generalUtils';

export const cardGlobalStyles = makeStyles(theme =>
  createStyles({
    bigFont: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)} !important`,
    },
    noWrap: {
      whiteSpace: 'nowrap',
    },
    cardFont: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY,
      lineHeight: `${toREM(24)}`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    cardFontNoEllipsis: {
      whiteSpace: 'normal',
    },
    cardFontAccent: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY,
      fontWeight: 600,
    },
    cardHeavyAccent: {
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    cardFontParagraph: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
      color: STYLE.COLOR.LIGHT_GRAY6,
      lineHeight: `${toREM(25)}`,
      whiteSpace: 'pre-line',
    },
    cardTitle: {
      marginBottom: `${toREM(15)}`,
    },
    cardSpacer: {
      height: 24,
      display: 'flex',
      marginBottom: `${toREM(15)}`,
    },
    cardTitleBottomMargin: {
      marginBottom: `${toREM(12)}`,
    },
    cardTrades: {
      display: 'flex',
      '& span': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        color: STYLE.COLOR.SECONDARY,
        lineHeight: `${toREM(24)}`,
      },
    },
    cardData: {
      display: 'flex',
    },
    cardDataTitle: {
      minWidth: `${toREM(120)}`,
      marginRight: `${toREM(9)}`,
    },
    cardAddressTitle: {
      marginBottom: '6px',
    },
  })
);
