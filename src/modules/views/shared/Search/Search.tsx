import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Backdrop, Box, CircularProgress, ClickAwayListener, Fade, Popper, Typography, FormControl } from '@material-ui/core';

import ResultWithAddress from './components/ResultWithAddress';
import SearchFilters from './components/SearchFilters';
import SearchInput from './components/SearchInput';
import WorkerResult from './components/WorkerResult';

import { GeneralModel, SearchModel, UserModel } from 'modules/models';
import { useDebounce } from 'utils/useDebounce';
import { useHideScroll } from 'utils/useHideScroll';
import { isEmpty } from 'utils/generalUtils';
import { useStyles } from './styles';

const DEFAULT_FILTER = SearchModel.searchFiltersConfig[0];
const MIN_SEARCH_LENGHT = 3;
const PAGE_SIZE = 30;

export interface IProps {
  clearSearch: () => void;
  loading: GeneralModel.ILoadingStatus;
  loadingMore: GeneralModel.ILoadingStatus;
  searchResults?: GeneralModel.IPagination<SearchModel.IResponse | SearchModel.IWorker>;
  triggerSearch: (search: SearchModel.ISearchParams) => void;
  triggerSearchMore: (search: SearchModel.ISearchParams) => void;
  userRole: UserModel.Role;
}

const Search = ({ clearSearch, loading, loadingMore, searchResults, triggerSearch, triggerSearchMore, userRole }: IProps) => {
  // TODO: Remove this with a fix for the input styles
  // This is a workaround to keep styles import in order.
  // eslint-disable-next-line
  const useRefFormControl = useRef(FormControl);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setHideScroll } = useHideScroll();

  const hasMorePages = useMemo<boolean>(() => searchResults?.totalResults === PAGE_SIZE, [searchResults]);

  const [isActive, setIsActive] = useState<boolean>(false);

  const classes = useStyles({ isActive });

  const [selectedFilter, setSelectedFilter] = useState<SearchModel.SearchType>(DEFAULT_FILTER.value);
  const selectedFilterName = SearchModel.filterLabelsMap[selectedFilter];
  const handleFilterChange = (newFilter: SearchModel.SearchType) => {
    setSelectedFilter(newFilter);
    inputRef?.current?.focus();
  };
  const searchFilters = useMemo(
    () =>
      SearchModel.searchFiltersConfig
        .filter(filter => !filter.onlyAdmin || (filter.onlyAdmin && userRole === UserModel.Role.FCA_ADMIN))
        .map(filter => ({ ...filter, onClick: () => handleFilterChange(filter.value) })),
    [userRole]
  );

  const [search, setSearch] = useState<string>();
  const debouncedSearch = useDebounce(search, 350);
  const handleSearchChange = (value: string) => setSearch(value);
  const handleClearSearch = () => {
    setSearch(null);
    inputRef?.current?.focus();
  };
  const handleClose = () => {
    setIsActive(false);
    setSearch(null);
    setSelectedFilter(DEFAULT_FILTER.value);
  };

  useEffect(() => {
    clearSearch();
    /* istanbul ignore else */
    if (isActive && debouncedSearch && debouncedSearch.length >= MIN_SEARCH_LENGHT) {
      triggerSearch({ nameContains: debouncedSearch, searchType: selectedFilter, pageSize: PAGE_SIZE });
    }
  }, [clearSearch, debouncedSearch, isActive, selectedFilter, triggerSearch]);

  // Close search on scape press
  useEffect(() => {
    const scapeKeyListener = (event: KeyboardEvent) => {
      /* istanbul ignore else */
      if (event.key === 'Escape') {
        inputRef?.current?.blur();
        handleClose();
      }
    };
    setHideScroll(isActive, 'hidden'); // prevent scroll when dialog is open
    if (isActive) {
      window.addEventListener('keyup', scapeKeyListener);
    } else {
      window.removeEventListener('keyup', scapeKeyListener);
    }
    return () => {
      window.removeEventListener('keyup', scapeKeyListener);
      setHideScroll(false);
    };
  }, [isActive, setHideScroll]);

  const onSearchResultsScroll = useCallback(
    e => {
      const isBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      /* istanbul ignore else */
      if (isActive && isBottom && hasMorePages && !loadingMore?.isLoading) {
        triggerSearchMore({ nameContains: debouncedSearch, searchType: selectedFilter, pageNumber: searchResults?.pageNumber + 1, pageSize: PAGE_SIZE });
      }
    },
    [hasMorePages, isActive, loadingMore, debouncedSearch, searchResults, selectedFilter, triggerSearchMore]
  );

  const renderLoading = useCallback(
    () => (
      <Box className={classes.loadingIndicatorWrapper}>
        <CircularProgress title="Loading..." />
      </Box>
    ),
    [classes.loadingIndicatorWrapper]
  );

  const renderSearchResults = useCallback(() => {
    if (search?.length < MIN_SEARCH_LENGHT) {
      return <Typography className={classes.emptyResultInfo}>Insert at least {MIN_SEARCH_LENGHT} characters</Typography>;
    } else if (loading?.hasError) {
      return <Typography className={`${classes.emptyResultInfo} ${classes.error}`}>There was an error. Please try again.</Typography>;
    } else if (searchResults && (!searchResults?.items || searchResults?.items?.length === 0)) {
      return <Typography className={classes.emptyResultInfo}>Your search did not match any {selectedFilterName}</Typography>;
    } else {
      const renderResult = (item: SearchModel.IResponse | SearchModel.IWorker) => {
        switch (item.entityType) {
          case SearchModel.SearchType.Company:
          case SearchModel.SearchType.Project:
            return <ResultWithAddress key={item.id} onClick={handleClose} item={item} />;
          case SearchModel.SearchType.Worker:
            return <WorkerResult key={item.id} onClick={handleClose} worker={item as SearchModel.IWorker} />;
          /* istanbul ignore next */
          default:
            return null;
        }
      };
      return (
        <Box className={classes.searchResults}>
          {searchResults?.items?.map(renderResult)}
          {loadingMore?.isLoading && <Box className={classes.searchMoreLoadingWrapper}>{renderLoading()}</Box>}
          {!loadingMore?.isLoading && !hasMorePages && !isEmpty(searchResults?.items) && (
            <Typography className={classes.noMoreItemsLabel}>No more results</Typography>
          )}
        </Box>
      );
    }
  }, [classes, hasMorePages, loading, loadingMore, renderLoading, search, searchResults, selectedFilterName]);

  return (
    <>
      <Backdrop open={isActive} className={classes.backdrop}>
        {' '}
      </Backdrop>
      <ClickAwayListener onClickAway={handleClose}>
        <div className={classes.wrapper} ref={wrapperRef}>
          <SearchInput
            chipLabel={selectedFilterName}
            handleClear={handleClearSearch}
            inputRef={inputRef}
            isActive={isActive}
            onChange={handleSearchChange}
            onClick={() => setIsActive(true)}
            onClose={handleClose}
            search={search}
          />
          {wrapperRef.current && (
            <Popper anchorEl={wrapperRef.current} id="searchInfo" open={isActive} transition={true} style={{ zIndex: 1010 }}>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={100}>
                  <Box className={classes.searchModalContainer} onScroll={onSearchResultsScroll} data-testid="search-results">
                    {!search && <SearchFilters filters={searchFilters} selected={selectedFilter} />}
                    {search && loading?.isLoading && renderLoading()}
                    {search && !loading?.isLoading && (
                      <>
                        <Typography className={classes.searchResultsInfo}>Search Results</Typography>
                        {renderSearchResults()}
                      </>
                    )}
                  </Box>
                </Fade>
              )}
            </Popper>
          )}
        </div>
      </ClickAwayListener>
    </>
  );
};

export default Search;
