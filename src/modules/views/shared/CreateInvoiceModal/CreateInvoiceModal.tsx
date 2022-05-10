import React, { memo, useCallback, useEffect } from 'react';

import Modal from '../Modal';
import Card from '../ResourceManagement/Card';
import Confirm from '../Modal/components/Confirm';
import InvoiceForm from '../InvoiceForm';

import { ClientModel, InvoiceModel, ProjectModel } from '../../../models';
import { FormRules } from '../../../../constants';
import { getConditionalDefaultValue, getDefaultValue, isNull } from '../../../../utils/generalUtils';
import { useForm } from '../../../../utils/useForm';
import { useStyles } from './styles';
import { getFallbackInvoiceService } from '../../../models/invoice';

export interface ICreateInvoiceModalProps {
  isCreateModalOpen: boolean;
  isLoading: boolean;
  loadingValues?: boolean;
  project?: ProjectModel.IProject;
  client?: ClientModel.IClient;
  invoiceId?: string;
  submitAction?: InvoiceModel.InvoiceStep;
  initValues?: any;
  styleClass?: string;
  setSubmitAction?: (action: InvoiceModel.InvoiceStep) => void;
  closeModal: () => void;
  onConfirm: (model: any) => void;
}

const CreateInvoiceModal = ({
  isCreateModalOpen,
  invoiceId,
  initValues,
  loadingValues = false,
  project = null,
  client = null,
  submitAction,
  styleClass,
  isLoading,
  setSubmitAction,
  closeModal,
  onConfirm,
}: ICreateInvoiceModalProps) => {
  const classes = useStyles();

  const { model, formRules, errors, onSubmit, update, updateRules, resetErrors } = useForm<InvoiceModel.IInvoice>({
    initValues: FormRules.invoice.initValues,
    formRules: FormRules.invoice.invoiceRules,
    onSubmitCallback: onConfirm,
  });

  const handleSaveAndConfirm = useCallback(() => {
    setSubmitAction(InvoiceModel.InvoiceStep.CONFIRM);
  }, [setSubmitAction]);

  const handleSaveAsDraft = useCallback(() => {
    setSubmitAction(InvoiceModel.InvoiceStep.DRAFT);
  }, [setSubmitAction]);

  useEffect(() => {
    if (invoiceId && !isLoading) update(initValues);
  }, [invoiceId, update, initValues, isLoading]);

  useEffect(() => {
    update(prevModel => ({ ...prevModel, project: project as any, company: client as any }));
    if (!project) updateRules(prevRules => ({ ...prevRules, project: { required: true, rules: [] } } as any));
    if (!client) updateRules(prevRules => ({ ...prevRules, company: { required: true, rules: [] } } as any));
  }, [project, client, update, updateRules]);

  useEffect(() => {
    if (!isCreateModalOpen) {
      update({ ...FormRules.invoice.initValues, items: [getFallbackInvoiceService()] });
    }
  }, [isCreateModalOpen, update]);

  useEffect(() => {
    if (!isNull(submitAction)) onSubmit();
    return function unMount() {
      setSubmitAction(null);
    };
  }, [submitAction, setSubmitAction, onSubmit]);
  return (
    <Modal
      show={isCreateModalOpen}
      styleClass={getDefaultValue(styleClass, '')}
      onClose={closeModal}
      render={() => (
        <Confirm
          title={getConditionalDefaultValue(invoiceId, 'Edit Invoice', 'Create New Invoice')}
          backgroundTitle={true}
          confirmLabel={getConditionalDefaultValue(invoiceId, 'Save and Confirm', 'Create and Confirm')}
          confirmLoadingText={getConditionalDefaultValue(invoiceId, 'Saving...', 'Creating...')}
          confirmButtonStyleClass={classes.saveAndConfirmBtn}
          secondaryActionText="Save as Draft"
          closeLabel="Close"
          secondaryAction={handleSaveAsDraft}
          onConfirm={handleSaveAndConfirm}
          onClose={closeModal}
          isLoading={isLoading}
          backgroundContent={classes.modalContentWrapper}
          backgroundButtonWrapper={true}
          content={
            loadingValues ? (
              'Loading...'
            ) : (
              <Card title="Invoice" styleClass={classes.modalInnerContainer}>
                <InvoiceForm
                  projectId={project?.id}
                  client={client}
                  model={model}
                  errors={errors}
                  formRules={formRules}
                  resetErrors={resetErrors}
                  onChange={update}
                />
              </Card>
            )
          }
        />
      )}
    />
  );
};

export default memo(CreateInvoiceModal);
