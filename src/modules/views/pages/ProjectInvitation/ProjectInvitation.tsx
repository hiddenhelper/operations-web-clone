import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppBar, Typography } from '@material-ui/core';

import Container from 'modules/views/shared/Container';
import ButtonLoader from 'modules/views/shared/ButtonLoader';

import ReviewStep from './components/ReviewStep';
import PaymentSettingsStep from './components/PaymentSettingsStep';
import { useStyles } from './styles';

import { GeneralModel, ProjectModel, UserModel } from 'modules/models';
import { LANG } from 'constants/index';
import { isUUID, getConditionalDefaultValue } from 'utils/generalUtils';
import { isBilledPerCompany } from 'utils/projectUtils';
import { useStyles as buttonStyles } from 'modules/views/shared/FormHandler/ControlledButton/styles';
import { listGlobalStyles } from 'assets/styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IProjectInvitationProps {
  projectMap: GeneralModel.IEntityMap<ProjectModel.IProject>;
  acceptLoading: GeneralModel.ILoadingStatus;
  fetchProject: (id: string) => void;
  acceptProjectInvitation: (id: string, paymentMethodId: string) => void;
  clearPayment: () => void;
  navigate: (path: string) => void;
}

const ProjectInvitation = ({ projectMap, acceptLoading, navigate, clearPayment, fetchProject, acceptProjectInvitation }: IProjectInvitationProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const listClasses = listGlobalStyles();

  const [serviceAgreementAccept, toggleServiceAgreementAccept] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const { id, step } = useParams<{ id: string; step: string }>();

  const projectId = useMemo(() => (/* istanbul ignore next */ isUUID(id) ? id : null), [id]);
  const currentProject = useMemo(() => (projectMap[projectId] ? projectMap[projectId] : ProjectModel.getFallbackProject()), [projectMap, projectId]);
  const serviceAgreement = useMemo(() => (isBilledPerCompany(currentProject) ? LANG.EN.SUBCONTRACTOR_SERVICE_AGREEMENT : LANG.EN.SERVICE_AGREEMENT), [
    currentProject,
  ]);

  const shouldSetPayment = useMemo(() => !step, [step]);

  const handleServiceAgreementAccepted = useCallback(() => {
    /* istanbul ignore else */
    if (shouldSetPayment) navigate(`/projects/invitation/${currentProject.id}/payment-settings`);
  }, [currentProject, shouldSetPayment, navigate]);

  const handleProjectAccepted = useCallback(() => {
    /* istanbul ignore else */
    if (selectedPaymentMethod) acceptProjectInvitation(currentProject.id, selectedPaymentMethod);
  }, [selectedPaymentMethod, acceptProjectInvitation, currentProject.id]);

  const handleToggleCheckbox = useCallback(() => {
    toggleServiceAgreementAccept(!serviceAgreementAccept);
  }, [serviceAgreementAccept]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!projectMap[projectId]) fetchProject(projectId);
  }, [projectId, projectMap, fetchProject]);

  useEffect(() => {
    /* istanbul ignore else */
    if (step === 'payment-settings' && !serviceAgreementAccept) {
      navigate(`/projects/invitation/${id}`);
    }
  }, [serviceAgreementAccept, step, id, navigate]);

  useEffect(() => {
    return function unMount() {
      clearPayment();
    };
  }, [clearPayment]);

  return (
    <Container id="projectInformation" className={listClasses.generalListMarginBottom}>
      <div className="client-list-header">
        <Typography className={classes.stepWrapper} color="primary" align="left">
          <Link to="/projects">Project List</Link> {'>'}{' '}
          {getConditionalDefaultValue(
            step === 'payment-settings',
            <Link to={`/projects/invitation/${currentProject.id}`}>Project Information</Link>,
            'Project Information'
          )}{' '}
          {getConditionalDefaultValue(step === 'payment-settings', '> Enter Credit Card Information', '')}
        </Typography>
        <Typography className={listClasses.title} color="primary" align="left" component="h1" variant="h5">
          {currentProject.name}
        </Typography>
      </div>
      <div className={classes.actionBarPadding}>
        {!step && (
          <ReviewStep
            currentProject={currentProject}
            serviceAgreement={serviceAgreement}
            isServiceAgreementAccepted={serviceAgreementAccept}
            handleToggleCheckbox={handleToggleCheckbox}
          />
        )}
        {step === 'payment-settings' && (
          <PaymentSettingsStep selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} />
        )}
      </div>
      <AppBar position="fixed" color="default" className={classes.floatingActionBar}>
        <PermissionGuard
          permissionsExpression={getConditionalDefaultValue(
            !step,
            UserModel.PaymentMethodsPermission.VIEWACCESS,
            UserModel.ProjectsPermission.ACCEPTSERVICEAGREEMENT
          )}
        >
          <ButtonLoader
            className={`${buttonClasses.createButton} ${buttonClasses.floatingAppBarButton} ${buttonClasses.primaryButtonLarger}`}
            color="primary"
            variant="contained"
            fullWidth={true}
            size="large"
            type="submit"
            disabled={getConditionalDefaultValue(!step, !serviceAgreementAccept, !selectedPaymentMethod)}
            data-testid="accept-project"
            onClick={getConditionalDefaultValue(!step, handleServiceAgreementAccepted, handleProjectAccepted)}
            isLoading={acceptLoading && acceptLoading.isLoading}
            text={getConditionalDefaultValue(!step, 'Go to Payment Method', 'Accept Project')}
            loadingText="Accepting..."
          />
        </PermissionGuard>
      </AppBar>
    </Container>
  );
};

export default memo(ProjectInvitation);
