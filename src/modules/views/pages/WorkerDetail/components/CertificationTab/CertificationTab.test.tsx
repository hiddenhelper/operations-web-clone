import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import {
  getWorkerCertification_1,
  getWorkerCertification_2,
  getWorkerCertification_3,
  getWorker_1,
  getCertification_1,
  getCertification_2,
  getProject_1,
  getProject_2,
  getUploadFile_3,
  getWorkerProject_1,
} from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import CertificationTab, { ICertificationTabProps } from './CertificationTab';
import { noop } from '../../../../../../utils/generalUtils';

describe('CertificationTab', () => {
  let props: ICertificationTabProps;

  beforeEach(() => {
    props = {
      worker: getWorker_1(),
      certificationMap: {
        [getWorkerCertification_1().id]: getWorkerCertification_1(),
      },
      fileMap: {},
      projectWorkerMap: { [getWorker_1().id]: { [getWorkerProject_1().id]: getWorkerProject_1() } },
      certificationList: [getCertification_1(), getCertification_2()],
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
      addWorkerCertification: jest.fn(),
      updateWorkerCertification: jest.fn(),
      deleteWorkerCertification: jest.fn(),
      fetchCertificationList: jest.fn(),
      fetchWorkerCertificationList: jest.fn(),
      fetchWorkerCertificationDetail: jest.fn(),
      fetchProjectList: jest.fn(),
      addCertificationSuccess: jest.fn(),
      updateCertificationSuccess: jest.fn(),
      clearLoading: jest.fn(),
      clearWorkerMap: jest.fn(),
      fetchWorker: jest.fn(),
      fetchWorkerProjectList: jest.fn(),
      setQueryParams: jest.fn(),
      clearFileMap: jest.fn(),
    };
  });

  it('should fetchWorkerCertificationList', () => {
    props.certificationMap = {};
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchWorkerCertificationList).toHaveBeenCalledWith(getWorker_1().id, { limit: 30, page: 1 });
  });

  it('should fetchCertificationList', () => {
    props.certificationList = [];
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchCertificationList).toHaveBeenCalledWith();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with secondary values', () => {
    props.certificationMap = {
      [getWorkerCertification_1().id]: getWorkerCertification_1(),
      [getWorkerCertification_2().id]: getWorkerCertification_2(),
      [getWorkerCertification_3().id]: getWorkerCertification_3(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.getAllByTestId('row-completion')[0].textContent).toEqual('January 01, 2001');
    expect(wrapper.getAllByTestId('row-completion')[1].textContent).toEqual('-');

    expect(wrapper.getAllByTestId('row-expiration')[0].textContent).toEqual('January 01, 2001 ');
    expect(wrapper.getAllByTestId('row-expiration')[1].textContent).toEqual('- ');

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.listLoading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <CertificationTab {...props} />
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
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    const openDetailBtn = getByTestId('certification-list-row');
    act(() => {
      fireEvent.click(openDetailBtn);
    });
    expect(container).toMatchSnapshot();
  });

  it('should render modal', () => {
    const { getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openModalBtn = getByTestId('open-certification-modal-btn');
    act(() => {
      fireEvent.click(openModalBtn);
    });

    const closeModalBtn = getByTestId('assign-btn-close');

    act(() => {
      fireEvent.click(closeModalBtn);
    });
  });

  it('should add certification', () => {
    props.loadingMap = { saveWorker: { traceId: 'someOtherKey' } as any };
    props.fileMap = {
      ['workerCertification']: {
        [getUploadFile_3().id]: getUploadFile_3(),
      },
    };
    const { getByText, getByTestId, getAllByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openModalBtn = getByTestId('open-certification-modal-btn');
    act(() => {
      fireEvent.click(openModalBtn);
    });

    const addBtn = getByTestId('assign-btn-confirm');

    const certificationSelect = getAllByText('Select Option')[0];
    const projectSelect = getAllByText('Select Option')[1];

    act(() => {
      fireEvent.mouseDown(certificationSelect);
    });

    act(() => {
      fireEvent.click(getByText(getCertification_2().name));
    });

    act(() => {
      fireEvent.mouseDown(projectSelect);
    });

    const projectOptionValue = getAllByText(getProject_1().name)[1];

    act(() => {
      fireEvent.click(projectOptionValue);
    });

    act(() => {
      fireEvent.change(getByTestId('certification-idNumber'), {
        persist: noop,
        target: { value: '1238912' },
      });
    });

    act(() => {
      fireEvent.click(addBtn);
    });

    expect(props.clearLoading).toHaveBeenCalled();
    expect(props.addCertificationSuccess).toHaveBeenCalled();
    expect(props.addWorkerCertification).toHaveBeenCalledWith(
      getWorker_1().id,
      {
        certificationId: getCertification_2().id,
        completionDate: null,
        description: null,
        expirationDate: null,
        id: null,
        idNumber: '1238912',
        projectId: getProject_1().id,
      },
      'workerCertification'
    );
  });

  it('should show form validations', () => {
    const { getByText, getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openModalBtn = getByTestId('open-certification-modal-btn');
    act(() => {
      fireEvent.click(openModalBtn);
    });

    const addBtn = getByTestId('assign-btn-confirm');

    act(() => {
      fireEvent.click(addBtn);
    });

    expect(getByText('Please enter Certification Name.')).toBeTruthy();
  });

  describe('detail', () => {
    it('should render values', () => {
      const { getByTestId, getAllByTestId, getByText } = render(
        <Provider store={createMockStore(getInitialState())}>
          <MemoryRouter>
            <CertificationTab {...props} />
          </MemoryRouter>
        </Provider>
      );

      const certificationList = getAllByTestId('certification-list-row');

      act(() => {
        fireEvent.click(certificationList[0]);
      });

      expect(getByText('Worker Certification')).toBeTruthy();

      const closeDetailBtn = getByTestId('detail-modal-close-btn');

      act(() => {
        fireEvent.click(closeDetailBtn);
      });
    });

    it('should render null values', () => {
      props.certificationMap = {
        [getWorkerCertification_3().id]: getWorkerCertification_3(),
      };

      const { getByTestId, getAllByTestId, getByText } = render(
        <Provider store={createMockStore(getInitialState())}>
          <MemoryRouter>
            <CertificationTab {...props} />
          </MemoryRouter>
        </Provider>
      );

      const certificationList = getAllByTestId('certification-list-row');

      act(() => {
        fireEvent.click(certificationList[0]);
      });

      expect(getByText('Worker Certification')).toBeTruthy();

      const closeDetailBtn = getByTestId('detail-modal-close-btn');

      act(() => {
        fireEvent.click(closeDetailBtn);
      });
    });
  });

  it('should filter by project', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByText('All Projects')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Project Awesome'));
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });

  it('should filter by no related project', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <CertificationTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByText('All Projects')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('No Related Project'));
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });

  it('should render edition modal', () => {
    props = {
      ...props,
      certificationMap: {
        [getWorkerCertification_1().id]: { ...getWorkerCertification_1(), projectId: null },
      },
      updateLoading: {
        isLoading: true,
        hasError: false,
        error: undefined,
      },
    };
    const { getByTestId, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <CertificationTab {...props} />
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

    const idNumberInput = getByTestId('certification-idNumber');

    expect(idNumberInput.value).toBe('1892132');

    act(() => {
      fireEvent.change(idNumberInput, {
        persist: noop,
        target: { name: 'idNumber', value: '19000000' },
      });
    });

    const saveModalBtn = getByTestId('assign-btn-confirm');

    act(() => {
      fireEvent.click(saveModalBtn);
    });

    expect(props.clearLoading).toHaveBeenCalled();
    expect(props.updateCertificationSuccess).toHaveBeenCalled();
    expect(props.updateWorkerCertification).toBeCalled();

    const closeModalBtn = getByTestId('assign-btn-close');

    act(() => {
      fireEvent.click(closeModalBtn);
    });
  });

  it('should render confirmation modal if delete a certification', () => {
    const { getByTestId, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <CertificationTab {...props} />
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

    expect(getByText('Delete Certification?'));
    expect(getByText('Yes, Delete'));

    const confirmDeleteButton = getByTestId('modal-confirm-btn');

    act(() => {
      fireEvent.click(confirmDeleteButton);
    });
  });
});
