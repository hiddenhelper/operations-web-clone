import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import DashboardWidget from '../../DashboardWidget';
import DashboardWidgetInlineHeader from '../../DashboardWidget/DashboardWidgetInlineHeader';
import Skeleton from '../../Skeleton';
import PieChart from '../../Chart/PieChart';

import { getDefaultValue, getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { statusWidgetStyles } from '../../DashboardWidget/styles';
import { useStyles } from './styles';

export interface IPieWidgetProps {
  title: string;
  total: number;
  data: {
    x: string;
    y: number;
    percentage: number;
    color?: string;
  }[];
  isLoading: boolean;
  showDetailRoute?: boolean;
  detailRoute?: string;
  style?: any;
  showValue?: boolean;
  renderFilter?: () => void;
}

const PieWidget = ({ title, total, data, detailRoute = '', showDetailRoute = true, renderFilter, style, showValue, isLoading }: IPieWidgetProps) => {
  const classes = useStyles();
  const statusWidgetClasses = statusWidgetStyles();
  return (
    <DashboardWidget
      styleClass={`${classes.maxHeight} ${classes.pieContainer}`}
      renderHeader={() => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={getConditionalDefaultValue(!!renderFilter, '50%', '100%')} height={30}>
            <div className={statusWidgetClasses.headerRow} style={{ width: getConditionalDefaultValue(!!renderFilter, '50%', '100%') }}>
              <DashboardWidgetInlineHeader
                contentWrapperStyleClass={classes.marginNull}
                title={title}
                value={getDefaultValue(total, 0)}
                showValue={showValue}
                isLoading={isLoading}
              />
            </div>
          </Skeleton>
          {renderFilter && renderFilter()}
        </div>
      )}
      renderContent={() => (
        <Grid
          container={true}
          className={getConditionalDefaultValue(!style?.pieWidgetContainer, statusWidgetClasses.pieWidgetDefault, '')}
          style={getDefaultValue(style?.pieWidgetContainer, {})}
        >
          <Grid
            item={true}
            xl={12}
            lg={12}
            md={12}
            xs={12}
            className={getConditionalDefaultValue(!style?.pieWidgetItem, statusWidgetClasses.pieWidgetItemDefault, '')}
            style={getDefaultValue(style?.pieWidgetItem, {})}
          >
            <PieChart
              pieProps={{
                innerRadius: 130,
                padAngle: 4,
                style: {
                  parent: {
                    maxHeight: '275px',
                    display: 'inline-block',
                    width: 'auto',
                    maxWidth: '255px',
                    textAlign: 'center',
                    marginBottom: !showDetailRoute ? 58 : 18,
                    ...style?.pieParentStyles,
                  },
                },
                labels: () => '',
              }}
              isLoading={isLoading}
              data={data}
              styles={style}
            />
          </Grid>
        </Grid>
      )}
      showDivider={false}
      renderDetail={() =>
        showDetailRoute && (
          <div className={classes.widgetBulletLabelWrapper} style={{ display: 'flex', flexDirection: 'column' }}>
            <Divider className={`${classes.widgetDivider} ${classes.widgetDividerTopMargin}`} />
            <Skeleton isLoading={isLoading} animation="wave" variant="text" width={120} height={20}>
              <Link href={detailRoute}>
                <span className={statusWidgetClasses.widgetCta}>See more details</span>
              </Link>
            </Skeleton>
          </div>
        )
      }
    />
  );
};

export default memo(PieWidget);
