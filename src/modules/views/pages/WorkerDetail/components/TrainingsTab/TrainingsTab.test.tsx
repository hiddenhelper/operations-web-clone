import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import {
  getWorkerTraining_1,
  getWorkerTraining_2,
  getWorkerTraining_3,
  getWorker_1,
  getTraining_1,
  getTraining_2,
  getProject_1,
  getProject_2,
  getUploadFile_3,
  getWorkerProject_1,
} from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import TrainingTab, { ITrainingTabProps } from './TrainingsTab';
import { noop } from '../../../../../../utils/generalUtils';

describe('TrainingTab', () => {
  let props: ITrainingTabProps;

  beforeEach(() => {
    props = {
      worker: getWorker_1(),
      trainingMap: {
        [getWorkerTraining_1().id]: getWorkerTraining_1(),
      },
      projectMap: { [getWorker_1().id]: { [getWorkerProject_1().id]: getWorkerProject_1() } },
      fileMap: {},
      trainingList: [getTraining_1(), getTraining_2()],
      projectList: [getProject_1(), getProject_2()],
      queryParams: { page: 1, limit: 30 },
      count: 1,
      listLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      saveLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      detailLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      deleteLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      loadingMap: {},
      onPageChange: jest.fn(),
      addWorkerTraining: jest.fn(),
      updateWorkerTraining: jest.fn(),
      deleteWorkerTraining: jest.fn(),
      fetchTrainingList: jest.fn(),
      fetchWorkerTrainingList: jest.fn(),
      fetchWorkerTrainingDetail: jest.fn(),
      fetchProjectList: jest.fn(),
      addTrainingSuccess: jest.fn(),
      updateTrainingSuccess: jest.fn(),
      clearLoading: jest.fn(),
      fetchWorker: jest.fn(),
      fetchWorkerProjectList: jest.fn(),
      onFilterProjectChange: jest.fn(),
      clearFileMap: jest.fn(),
    };
  });

  it('should fetchWorkerTrainingList', () => {
    props.trainingMap = {};
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchWorkerTrainingList).toHaveBeenCalledWith(getWorker_1().id, { limit: 30, page: 1 });
  });

  it('should fetchTrainingList', () => {
    props.trainingList = [];
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchTrainingList).toHaveBeenCalledWith();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with secondary values', () => {
    props.trainingMap = {
      [getWorkerTraining_1().id]: getWorkerTraining_1(),
      [getWorkerTraining_2().id]: getWorkerTraining_2(),
      [getWorkerTraining_3().id]: getWorkerTraining_3(),
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.listLoading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render detail loading', () => {
    props.detailLoading.isLoading = true;
    const { container, getByTestId } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    const openDetailBtn = getByTestId('training-list-row');
    act(() => {
      fireEvent.click(openDetailBtn);
    });
    expect(container).toMatchSnapshot();
  });

  it('should render modal', () => {
    const { getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openModalBtn = getByTestId('open-training-modal-btn');
    act(() => {
      fireEvent.click(openModalBtn);
    });

    const closeModalBtn = getByTestId('assign-btn-close');

    act(() => {
      fireEvent.click(closeModalBtn);
    });
  });

  it('should add training', () => {
    props.loadingMap = { saveWorker: { traceId: 'someOtherKey' } as any };
    props.fileMap = {
      ['workerTraining']: {
        [getUploadFile_3().id]: getUploadFile_3(),
      },
    };
    const { getByText, getByTestId, getAllByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openModalBtn = getByTestId('open-training-modal-btn');
    act(() => {
      fireEvent.click(openModalBtn);
    });

    const addBtn = getByTestId('assign-btn-confirm');

    const trainingSelect = getAllByText('Select Option')[0];
    const projectSelect = getAllByText('Select Option')[1];

    act(() => {
      fireEvent.mouseDown(trainingSelect);
    });

    act(() => {
      fireEvent.click(getByText(getTraining_2().name));
    });

    act(() => {
      fireEvent.mouseDown(projectSelect);
    });

    const projectOptionValues = getAllByText(getProject_1().name);

    act(() => {
      fireEvent.click(projectOptionValues[1]);
    });

    act(() => {
      fireEvent.change(getByTestId('training-trainerName'), {
        persist: noop,
        target: { name: 'trainerName', value: 'John Doe' },
      });
    });

    const dateInput = getByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.change(dateInput.querySelector('input'), { target: { name: 'completionDate', value: 'Tue, Aug 11, 2020' } });
    });

    const trainerBadge = getByTestId('training-trainerBadgeCode');

    act(() => {
      fireEvent.change(trainerBadge, { target: { name: 'trainerBadgeCode', value: 'ABCDEF' } });
    });

    act(() => {
      fireEvent.click(addBtn);
    });

    expect(props.clearLoading).toHaveBeenCalled();
    expect(props.addTrainingSuccess).toHaveBeenCalled();
    expect(props.addWorkerTraining).toHaveBeenCalledWith(
      getWorker_1().id,
      {
        trainingId: getTraining_2().id,
        completionDate: 'Tue, 11 Aug 2020 07:00:00 GMT',
        description: null,
        id: null,
        trainerName: 'John Doe',
        trainerBadgeCode: 'ABCDEF',
        projectId: getProject_1().id,
      },
      'workerTraining'
    );
  });

  it('should show form validations', () => {
    const { getByText, getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openModalBtn = getByTestId('open-training-modal-btn');
    act(() => {
      fireEvent.click(openModalBtn);
    });

    const addBtn = getByTestId('assign-btn-confirm');

    act(() => {
      fireEvent.click(addBtn);
    });

    expect(getByText('Please enter Type.')).toBeTruthy();
  });

  describe('detail', () => {
    it('should render values', () => {
      const { getByTestId, getAllByTestId, getByText } = render(
        <Provider store={createMockStore(getInitialState())}>
          <MemoryRouter>
            <TrainingTab {...props} />
          </MemoryRouter>
        </Provider>
      );

      const trainingList = getAllByTestId('training-list-row');

      act(() => {
        fireEvent.click(trainingList[0]);
      });

      expect(getByText('Worker Training')).toBeTruthy();

      const closeDetailBtn = getByTestId('detail-modal-close-btn');

      act(() => {
        fireEvent.click(closeDetailBtn);
      });
    });

    it('should render null values', () => {
      props.trainingMap = {
        [getWorkerTraining_3().id]: getWorkerTraining_3(),
      };

      const { getByTestId, getAllByTestId, getByText } = render(
        <Provider store={createMockStore(getInitialState())}>
          <MemoryRouter>
            <TrainingTab {...props} />
          </MemoryRouter>
        </Provider>
      );

      const trainingList = getAllByTestId('training-list-row');

      act(() => {
        fireEvent.click(trainingList[0]);
      });

      expect(getByText('Worker Training')).toBeTruthy();

      const closeDetailBtn = getByTestId('detail-modal-close-btn');

      act(() => {
        fireEvent.click(closeDetailBtn);
      });
    });
  });

  it('should render edition modal', () => {
    props = {
      ...props,
      trainingMap: {
        [getWorkerTraining_1().id]: { ...getWorkerTraining_1(), projectId: null },
      },
      saveLoading: {
        isLoading: true,
        hasError: false,
        error: undefined,
      },
      updateLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
    };

    const { getByTestId, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openEditDeleteOptions = getByTestId('popover-button');

    act(() => {
      fireEvent.click(openEditDeleteOptions);
    });

    act(() => {
      fireEvent.click(getByText('Edit'));
    });

    const trainerNameInput = getByTestId('training-trainerName');

    expect(trainerNameInput.value).toBe('Alfred Henry');

    act(() => {
      fireEvent.change(trainerNameInput, {
        persist: noop,
        target: { name: 'trainerName', value: 'John Doe' },
      });
    });

    const saveModalBtn = getByTestId('assign-btn-confirm');

    act(() => {
      fireEvent.click(saveModalBtn);
    });

    expect(props.clearLoading).toHaveBeenCalled();
    expect(props.updateTrainingSuccess).toHaveBeenCalled();
    expect(props.updateWorkerTraining).toBeCalled();

    const closeModalBtn = getByTestId('assign-btn-close');

    act(() => {
      fireEvent.click(closeModalBtn);
    });
  });

  it('should render confirmation modal if delete a training', () => {
    const { getByTestId, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <TrainingTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openEditDeleteOptions = getByTestId('popover-button');

    act(() => {
      fireEvent.click(openEditDeleteOptions);
    });

    act(() => {
      fireEvent.click(getByText('Delete'));
    });

    expect(getByText('Delete Training?'));
    expect(getByText('Yes, Delete'));

    const confirmDeleteButton = getByTestId('modal-confirm-btn');

    act(() => {
      fireEvent.click(confirmDeleteButton);
    });
  });
});
