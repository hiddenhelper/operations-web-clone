import { renderHook } from '@testing-library/react-hooks';
import { useParams } from 'react-router-dom';

import { ProjectModel } from '../modules/models';
import { getProject_1 } from '../test/entities';
import { useNavigator } from './useNavigator';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('useNavigator', () => {
  it('should return', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: '' }));
    const { result } = renderHook(() =>
      useNavigator<ProjectModel.IProject>({
        entityMap: { [getProject_1().id]: getProject_1() },
        defaultStep: ProjectModel.ProjectStep.GENERAL_INFORMATION,
        stepMap: ProjectModel.projectStepMap,
        fallback: () => ProjectModel.getFallbackProject(),
      })
    );
    expect(result.current).toEqual({
      id: getProject_1().id,
      step: '',
      entityId: getProject_1().id,
      currentEntity: getProject_1(),
      currentStepKey: 'general-information',
      currentStep: ProjectModel.projectStepMap['general-information'],
      setStep: expect.any(Function),
    });
  });
});
