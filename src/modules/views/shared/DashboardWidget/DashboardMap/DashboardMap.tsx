import React, { memo, useEffect, useMemo } from 'react';

import Skeleton from '../../Skeleton/Skeleton';

import { StatisticsModel } from '../../../../models';
import { AutocompleteService } from '../../../../services/AutocompleteService';
import { useStyles as dashboardStyles } from '../../../pages/Dashboard/styles';
import { useStyles } from './styles';

export interface IDashboardMapProps {
  pointList: StatisticsModel.IPoint[];
}

const DashboardMap = ({ pointList }: IDashboardMapProps) => {
  const dashboardGlobalClasses = dashboardStyles();
  const classes = useStyles();

  const mailingMapInputRef = useMemo(() => React.createRef(), []);
  const autocompleteService = useMemo(() => new AutocompleteService(), []);

  const locationList = useMemo(() => pointList.filter(point => point.latitude !== 0 && point.longitude !== 0), [pointList]);

  useEffect(() => {
    if (locationList.length > 0) {
      autocompleteService.init({}).then(
        /* istanbul ignore next */ () => {
          autocompleteService.initMap(mailingMapInputRef.current, locationList[0].latitude, locationList[0].longitude, locationList, 14);
        }
      );
    }
  }, [mailingMapInputRef, autocompleteService, locationList]);

  return (
    <Skeleton isLoading={false} animation="wave" variant="rect" width={'100%'} height={380}>
      <div style={{ height: '100%' }} className={`${dashboardGlobalClasses.temporalPlaceholder} ${dashboardGlobalClasses.temporalLargePlaceholder}`}>
        <div id="review-mailing-map" className={classes.mapWrapper} ref={mailingMapInputRef as any} />
      </div>
    </Skeleton>
  );
};

export default memo(DashboardMap);
