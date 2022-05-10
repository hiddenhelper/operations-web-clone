import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { isUUID } from './generalUtils';

import { GeneralModel } from '../modules/models';

export interface IUseNavigatorProps<T> {
  entityMap: GeneralModel.IEntityMap<T>;
  defaultStep?: string;
  stepMap?: GeneralModel.IStepMap;
  fallback: () => T;
}

export interface IUseNavigator<T> {
  id: string;
  step: string;
  entityId: string;
  currentEntity: T;
  currentStepKey?: string;
  currentStep?: GeneralModel.IStep;
  setStep?: (step: GeneralModel.IStep) => void;
}

export function useNavigator<T>({ entityMap, fallback, stepMap = {}, defaultStep = '' }: IUseNavigatorProps<T>): IUseNavigator<T> {
  const { id, step } = useParams<{ id: string; step: string }>();
  const entityId = useMemo(() => (isUUID(id) ? id : null), [id]);
  const currentEntity: T = useMemo(() => (entityMap[entityId] ? entityMap[entityId] : fallback()), [entityMap[entityId], fallback]); // eslint-disable-line
  const currentStepKey = useMemo(() => step || defaultStep, [step, defaultStep]);
  const [currentStep, setStep] = useState<GeneralModel.IStep>(stepMap[currentStepKey]);

  return {
    id,
    step,
    entityId,
    currentEntity,
    currentStepKey,
    currentStep,
    setStep,
  };
}
