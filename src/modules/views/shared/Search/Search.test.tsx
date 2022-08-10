import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Search, { IProps } from './Search';
import { SearchModel, UserModel } from 'modules/models';
import { getSearchWoker } from 'test/entities';

jest.mock('utils/useHideScroll', () => ({
  useHideScroll: jest.fn().mockImplementation(() => ({ isScrollHided: false, setHideScroll: jest.fn() })),
}));
jest.mock('utils/useDebounce', () => ({
  useDebounce: value => value,
}));

describe('Search', () => {
  let props: IProps;

  beforeEach(() => {
    props = {
      clearSearch: jest.fn(),
      loading: undefined,
      loadingMore: undefined,
      searchResults: undefined,
      triggerSearch: jest.fn(),
      triggerSearchMore: jest.fn(),
      isFcaUser: true,
      isAdmin: true,
    };
  });

  it('should render', () => {
    const { getByPlaceholderText } = render(<Search {...props} />);
    getByPlaceholderText('Find a project, client, worker...');
  });

  it('should render modal with search filters when click on search input', async () => {
    const { getByTestId, getByText } = render(<Search {...props} />);

    await act(async () => await fireEvent.click(getByTestId('main-search-input')));

    getByText('Looking for…');
  });

  it('should render results placeholder when entering a search string of less than 3 characters', async () => {
    const { getByTestId, getByText } = render(<Search {...props} />);

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'a' } }));

    getByText('Search Results');
    getByText('Insert at least 3 characters');
  });

  it('should render loading error message', async () => {
    props.loading = { isLoading: false, hasError: true, error: 'Loading error' };
    const { getByTestId, getByText } = render(<Search {...props} />);

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(props.triggerSearch).toHaveBeenCalled();
    getByText('Search Results');
    getByText('There was an error. Please try again.');
  });

  it('should render your search did not match any projects', async () => {
    props.searchResults = { totalResults: 0, pageNumber: 1, pageSize: 30, items: [] };
    const { getByTestId, getByText } = render(<Search {...props} />);

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(props.triggerSearch).toHaveBeenCalled();
    getByText('Search Results');
    getByText('Your search did not match any Projects');
  });

  it('should render loading indicator', async () => {
    props.loading = { isLoading: true, hasError: false, error: undefined };
    const { getByTestId, getByTitle } = render(<Search {...props} />);

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(props.triggerSearch).toHaveBeenCalled();
    getByTitle('Loading...');
  });

  it('should trigger search when entering a search string of 3 or more characters', async () => {
    const { getByTestId, getByText } = render(<Search {...props} />);

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.click(getByText('Workers')));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(props.triggerSearch).toHaveBeenCalledWith({ nameContains: 'sea', pageSize: 30, searchType: SearchModel.SearchType.Worker });
  });

  it('should render workers search results', async () => {
    props.loading = { isLoading: false, hasError: false, error: undefined };
    props.searchResults = getSearchWoker();
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    );

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(props.triggerSearch).toHaveBeenCalled();

    getByText(props.searchResults.items[0].name);
    getByText(props.searchResults.items[1].name);
  });

  it('should render project search results', async () => {
    props.loading = { isLoading: false, hasError: false, error: undefined };
    props.searchResults = {
      items: [
        {
          id: '1',
          name: 'Project name',
          status: 2,
          entityType: SearchModel.SearchType.Project,
        },
      ],
      pageNumber: 1,
      pageSize: 15,
      totalResults: 1,
    };
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    );

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'Project' } }));

    expect(props.triggerSearch).toHaveBeenCalled();

    getByText(props.searchResults.items[0].name);
    getByText('Active');
  });

  it('should render client search results', async () => {
    props.loading = { isLoading: false, hasError: false, error: undefined };
    props.searchResults = {
      items: [
        {
          id: '1',
          name: 'Client name',
          status: 3,
          entityType: SearchModel.SearchType.Company,
        },
      ],
      pageNumber: 1,
      pageSize: 15,
      totalResults: 1,
    };
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    );

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'Client' } }));

    expect(props.triggerSearch).toHaveBeenCalled();

    getByText(props.searchResults.items[0].name);
    getByText('Archived');
  });

  it('should clear results and render search filters when pressing clear button', async () => {
    props.loading = { isLoading: false, hasError: false, error: undefined };
    props.searchResults = getSearchWoker();
    const { getByTestId, getByText, getByTitle } = render(
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    );

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(props.triggerSearch).toHaveBeenCalled();

    getByText(props.searchResults.items[0].name);
    getByText(props.searchResults.items[1].name);

    await act(async () => await fireEvent.click(getByTitle('Clear')));

    expect(props.clearSearch).toHaveBeenCalledTimes(4);
    getByText('Looking for…');
  });

  it('should clear results and close search modal when pressing close button', async () => {
    props.loading = { isLoading: false, hasError: false, error: undefined };
    props.searchResults = getSearchWoker();
    const { getByTestId, getByText, getByPlaceholderText, getByTitle } = render(
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    );

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(props.triggerSearch).toHaveBeenCalled();

    getByText(props.searchResults.items[0].name);
    getByText(props.searchResults.items[1].name);

    await act(async () => await fireEvent.click(getByTitle('Close')));

    expect(props.clearSearch).toHaveBeenCalledTimes(4);
    getByPlaceholderText('Find a project, client, worker...');
  });

  it('should trigger close when pressing scape key', async () => {
    const { getByTestId, baseElement, getByPlaceholderText } = render(<Search {...props} />);

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.keyUp(baseElement, { key: 'Escape' }));

    expect(props.clearSearch).toHaveBeenCalledTimes(3);

    getByPlaceholderText('Find a project, client, worker...');
  });

  it('should trigger searchMore when scrolling to bottom of result list', async () => {
    const workerResult = getSearchWoker().items[0];
    const workerResultsMock = Array(30)
      .fill(workerResult)
      .map((worker, index) => ({ ...worker, id: index + 1 }));
    props.searchResults = {
      items: workerResultsMock,
      pageNumber: 1,
      pageSize: 30,
      totalResults: 30,
    };
    const { getByTestId, getAllByText } = render(
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    );

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(getAllByText(workerResult.name).length).toBe(30);

    await act(async () => await fireEvent.scroll(getByTestId('search-results')));

    expect(props.triggerSearchMore).toHaveBeenCalledWith({ nameContains: 'sea', pageNumber: 2, pageSize: 30, searchType: 3 });
  });

  it('should render loadingMore indicator', async () => {
    const workerResult = getSearchWoker().items[0];
    const workerResultsMock = Array(30)
      .fill(workerResult)
      .map((worker, index) => ({ ...worker, id: index + 1 }));
    props.searchResults = {
      items: workerResultsMock,
      pageNumber: 1,
      pageSize: 30,
      totalResults: 30,
    };
    props.loadingMore = { isLoading: true, hasError: false, error: undefined };
    const { getByTestId, getAllByText, getByTitle } = render(
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    );

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(getAllByText(workerResult.name).length).toBe(30);
    getByTitle('Loading...');
  });

  it('should render no more items label', async () => {
    const workerResult = getSearchWoker().items[0];
    const workerResultsMock = Array(31)
      .fill(workerResult)
      .map((worker, index) => ({ ...worker, id: index + 1 }));
    props.searchResults = {
      items: workerResultsMock,
      pageNumber: 2,
      pageSize: 30,
      totalResults: 1,
    };
    props.loading = { isLoading: false, hasError: false, error: undefined };
    props.loadingMore = { isLoading: false, hasError: false, error: undefined };
    const { getByTestId, getAllByText, getByText, baseElement } = render(
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    );

    const searchInput = getByTestId('main-search-input');
    await act(async () => await fireEvent.click(searchInput));
    await act(async () => await fireEvent.change(searchInput, { target: { value: 'sea' } }));

    expect(getAllByText(workerResult.name).length).toBe(31);
    getByText('No more results');
  });
});
