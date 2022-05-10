import React, { memo, useCallback } from 'react';

import { CertificationModel, TrainingModel } from 'modules/models';
import { ThreeDotsIcon } from 'constants/index';
import ControlledButton from 'modules/views/shared/FormHandler/ControlledButton';
import ButtonMenu from 'modules/views/shared/ButtonMenu';
import { useStyles } from './styles';

export interface IEntityRowProps {
  entity: CertificationModel.IWorkerCertification | TrainingModel.IWorkerTraining;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ThreeDotsPopover = ({ entity, onEdit, onDelete }: IEntityRowProps) => {
  const classes = useStyles();
  const onEditHandler = useCallback(() => onEdit(entity.id), [onEdit, entity.id]);
  const onDeleteHandler = useCallback(() => onDelete(entity.id), [onDelete, entity.id]);

  return (
    <ControlledButton styleClass={classes.invoiceRowButton}>
      <ButtonMenu
        stopPropagation={true}
        buttonProps={{
          endIcon: <ThreeDotsIcon className={classes.invoiceIconDisabled} />,
        }}
        showDivider={false}
        text=""
        optionList={[
          {
            title: 'Edit',
            callback: e => {
              e.stopPropagation();
              onEditHandler();
            },
          },
          {
            title: 'Delete',
            callback: e => {
              e.stopPropagation();
              onDeleteHandler();
            },
          },
        ]}
        showIconMargin={false}
        styleClass={classes.invoiceActionsButton}
        disabled={false}
        data-testid="popover-button"
      />
    </ControlledButton>
  );
};

export default memo(ThreeDotsPopover);
