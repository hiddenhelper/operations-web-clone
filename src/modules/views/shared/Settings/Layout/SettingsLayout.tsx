import React, { memo } from 'react';

import Container from 'modules/views/shared/Container';
import PageTitle from 'modules/views/shared/PageTitle';

import { tableGlobalStyles } from '../../../../../assets/styles';

export interface ISettingsLayoutProps {
  title: string;
  renderFilter: () => React.ReactNode;
  renderContent: () => React.ReactNode;
}

const SettingsLayout = ({ title, renderFilter, renderContent }: ISettingsLayoutProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  return (
    <Container>
      <PageTitle title={title} />
      <div className={tableGlobalClasses.tableWrapper}>
        <div className={`${tableGlobalClasses.filterContainer} ${tableGlobalClasses.filterContainerTopPadding}`}>
          <div className={tableGlobalClasses.statusFilter}>{renderFilter()}</div>
        </div>
      </div>
      {renderContent()}
    </Container>
  );
};

export default memo(SettingsLayout);
