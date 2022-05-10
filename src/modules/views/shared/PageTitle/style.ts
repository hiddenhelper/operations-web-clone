import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export default {
  wrapper: { height: 50, marginBottom: 13, width: '100%' },
  container: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  titleWrapper: { display: 'flex', alignItems: 'center', marginTop: 5 },
  title: {
    color: STYLE.COLOR.SECONDARY_DARKER,
    fontSize: toREM(STYLE.FONT.SIZE.HEADING_BIG),
    fontWeight: 600,
    letterSpacing: 0,
    marginRight: toREM(8),
  },
  subtitle: {
    color: STYLE.COLOR.SECONDARY_DARKER,
    fontSize: toREM(31),
    fontWeight: 300,
    letterSpacing: 0,
  },
};
