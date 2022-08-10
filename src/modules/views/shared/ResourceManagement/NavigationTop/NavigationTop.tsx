import React, { memo, useMemo, useCallback } from 'react';

import Grid from '@material-ui/core/Grid';

import ButtonLoader from '../../ButtonLoader';
import WizardHeader from '../WizardHeader';
import StatusChip from '../../StatusChip';

import { IStep } from '../../../../models/general';
import { LANG } from '../../../../../constants';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles } from './styles';
import { useStyles as statusChipStyles } from '../../StatusChip/styles';
import { generalGlobalStyles } from '../../../../../assets/styles';
import { useHideScroll } from '../../../../../utils/useHideScroll';
import PermissionGuard from '../../PermissionGuard';
import { UserModel } from 'modules/models';

export interface INavigationTopProps {
  breadCrumb: { route: string; title: string; pluralTitle: string };
  step: IStep;
  stepIndex: number;
  hasChanges: boolean;
  loadSuccess: boolean;
  isLoading: boolean;
  isSaveLoading: boolean;
  status: string;
  entityName?: string;
  isConfirmEnabled?: boolean;
  isFixed?: boolean;
  onNextStep: () => void;
  onDiscard: () => void;
  onSave: () => void;
  onConfirm?: () => void;
}

const NavigationTop = ({
  loadSuccess,
  breadCrumb,
  step,
  stepIndex,
  entityName,
  hasChanges,
  isConfirmEnabled = true,
  isFixed = false,
  isLoading,
  isSaveLoading,
  status,
  onNextStep,
  onDiscard,
  onSave,
  onConfirm,
}: INavigationTopProps) => {
  const classes = useStyles();
  const statusChipClasses = statusChipStyles();
  const { isScrollHided, scrollWidth } = useHideScroll();
  const generalStyles = generalGlobalStyles({ scrollWidth });
  const resourceStatus = useMemo(() => status.replace(/ /g, '').toLowerCase(), [status]);
  const buttonLoaderTextMap = useMemo(
    () => ({
      draft: {
        text: LANG.EN.NAVIGATION_TOP.ACTIONS.SEND_APPROVE,
        loadingText: LANG.EN.NAVIGATION_TOP.ACTIONS.SEND_APPROVE_LOADING,
      },
      pendingapproval: {
        text: `${LANG.EN.NAVIGATION_TOP.ACTIONS.APPROVE} ${breadCrumb.title}`,
        loadingText: `${LANG.EN.NAVIGATION_TOP.ACTIONS.APPROVE_LOADING} ${breadCrumb.title}`,
      },
    }),
    [breadCrumb]
  );

  const onConfirmHandler = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  return (
    <Grid id="manager-navigation-top" container={true} className={`${classes.container}`}>
      <WizardHeader
        isFixed={isFixed}
        breadCrumb={breadCrumb}
        entityName={entityName}
        hasChanges={hasChanges}
        onDiscard={onDiscard}
        onSave={onSave}
        loadSuccess={loadSuccess}
        stepped={true}
        step={step}
        isSaveLoading={isSaveLoading}
        stepIndex={stepIndex}
        onNextStep={onNextStep}
      />
      <Grid
        item={true}
        className={`${classes.rightSidebar} ${getConditionalDefaultValue(isFixed, classes.fixedSidebar, '')} ${getConditionalDefaultValue(
          isScrollHided && isFixed,
          generalStyles.scrollHided,
          ''
        )}`}
      >
        <div className={classes.rightSidebarStatus}>
          Status: <StatusChip styleClasses={statusChipClasses[resourceStatus]} label={status} />
        </div>
        <PermissionGuard permissionsExpression={UserModel.DraftClientsPermission.APPROVE}>
          <ButtonLoader
            data-testid="approve-btn"
            className={classes.approveButton}
            color="primary"
            variant="contained"
            fullWidth={true}
            size="large"
            disabled={isConfirmEnabled}
            isLoading={isLoading}
            text={buttonLoaderTextMap[resourceStatus].text}
            loadingText={buttonLoaderTextMap[resourceStatus].loadingText}
            onClick={onConfirmHandler}
          />
        </PermissionGuard>
      </Grid>
    </Grid>
  );
};

export default memo(NavigationTop);
