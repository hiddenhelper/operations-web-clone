import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../constants/';
import { toREM } from '../../../utils/generalUtils';

export const avatarGlobalStyles = makeStyles(theme =>
  createStyles({
    avatarWrapper: {
      backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
      marginRight: `${toREM(20)}`,

      '& .MuiSvgIcon-root': {
        fill: STYLE.COLOR.INACTIVE,
      },
    },
    avatarSecondaryMargin: {
      marginRight: `${toREM(12)}`,
    },
    avatarWithSmallBadge: {
      position: 'relative',
      '& .MuiBadge-badge': {
        position: 'absolute',
        width: '28px',
        top: '11.5px',
        right: '17px',
      },
    },
    avatarMedium: {
      height: `${toREM(32)}`,
      width: `${toREM(32)}`,
    },
    avatarBig: {
      height: `${toREM(40)}`,
      width: `${toREM(40)}`,
    },
    avatarXL: {
      height: `${toREM(128)}`,
      width: `${toREM(128)}`,
      margin: 0,
      '& .MuiSvgIcon-root': {
        height: '100%',
        width: '75px',
        position: 'relative',
        bottom: '4px',
      },
    },
    avatarSettings: {
      height: `${toREM(116)}`,
      width: `${toREM(116)}`,
      marginRight: 0,

      '& .MuiSvgIcon-root': {
        fill: STYLE.COLOR.UNCOMPLETED,
      },
    },
    avatarXLBorder: {
      border: `6px solid ${STYLE.COLOR.WHITE}`,
    },
    missingAvatarWrapper: {
      backgroundColor: STYLE.COLOR.LIGHT_GRAY7,
      '& svg': {
        fill: STYLE.COLOR.WHITE,
        position: 'relative',
        bottom: '1px',
      },
    },
    missingAvatarBig: {
      height: `${toREM(64)}`,
      width: `${toREM(64)}`,
    },
    missingAvatarSettings: {
      height: `${toREM(72)}`,
      width: `${toREM(72)}`,
    },
    badgeMedium: {
      height: `${toREM(106)}`,
      width: `${toREM(106)}`,
      margin: 0,
      '& .MuiSvgIcon-root': {
        height: '100%',
        width: '54px',
      },
    },
    badgeBig: {
      height: `${toREM(120)}`,
      width: `${toREM(120)}`,
      margin: 0,
      position: 'relative',
      top: 12,
      '& .MuiSvgIcon-root': {
        height: '100%',
        width: '66px',
        position: 'relative',
        bottom: '2px',
      },
    },
    badgeXL: {
      '& svg': {
        width: 30,
        height: 30,
      },
    },
    avatarPosition: {
      '& .MuiBadge-badge': {
        top: '3.5px !important',
        right: '22px !important',
      },
    },
    workerMedium: {
      height: `${toREM(96)}`,
      width: `${toREM(96)}`,
      margin: 0,
      '& .MuiSvgIcon-root': {
        height: 55,
        width: 70,
        position: 'relative',
        bottom: 2,
      },
    },
  })
);
