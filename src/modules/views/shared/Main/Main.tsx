import React, { memo, useState } from 'react';

import ErrorBoundary from '../ErrorBoundary';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Logger } from '../../../services/Logger';

import { useStyles } from './styles';
import GuestHeader from '../GuestHeader';

export interface IMainProps {
  children: React.ReactNode;
  isGuest: boolean;
}

const Main = ({ children, isGuest }: IMainProps) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {isGuest ? (
        <ErrorBoundary Logger={Logger}>
          <GuestHeader />
        </ErrorBoundary>
      ) : (
        <>
          <ErrorBoundary Logger={Logger}>
            <Header handleDrawerToggle={handleDrawerToggle} />
          </ErrorBoundary>
          <ErrorBoundary Logger={Logger}>
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          </ErrorBoundary>
        </>
      )}
      <main
        key="Main"
        className={classes.appContainer}
        onDragOver={/* istanbul ignore next line */ e => e.preventDefault()}
        onDrop={
          /* istanbul ignore next line */ e => {
            e.stopPropagation();
            e.preventDefault();
            return false;
          }
        }
      >
        <div className={classes.headerSpacer} />
        <section className={classes.sectionContainer}>
          <ErrorBoundary Logger={Logger}>{children}</ErrorBoundary>
        </section>
      </main>
    </>
  );
};

export default memo(Main);
