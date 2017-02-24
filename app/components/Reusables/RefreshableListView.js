/**
 * @providesModule ZeroProj.Components.Reusables.RefreshableListView
 */

import React from 'react';
import { ListView, RefreshControl } from 'react-native';
import _ from 'lodash';

export default class RefreshableListView extends React.PureComponent {
  static propTypes = {
    onError: React.PropTypes.func,
    onFetchData: React.PropTypes.func.isRequired,
    paginationEnabled: React.PropTypes.bool,
    placeholderData: React.PropTypes.object,
    refreshControlEnabled: React.PropTypes.bool,
    renderPlaceholderOnly: React.PropTypes.bool,
  };

  static defaultProps = {
    onError: null,
    paginationEnabled: true,
    placeholderData: {},
    refreshControlEnabled: true,
    renderPlaceholderOnly: false,
  };

  constructor(props) {
    super(props);

    const { onFetchData, onError } = props;
    this.onError = onError && onError.bind(this);
    this.onFetchData = onFetchData && onFetchData.bind(this);

    // Component.isMounted is deprecated, this is a workaround
    this.mounted = false;
  }

  state = {
    currentPage: 1,
    dataSource: this.defaultDataSource,
    isLastPageReached: false,
    isLoading: false,
    isRefresing: false,
  };

  componentDidMount() {
    this.mounted = true;
    
    // Initialize data list with placholders
    this.reset();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.renderPlaceholderOnly && !nextProps.renderPlaceholderOnly)
      this.fetchData();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  get defaultDataSource() {
    return new ListView.DataSource({
      getRowData: ((dataBlob, sectionID, rowID) => dataBlob[sectionID][parseInt(rowID)]),
      getSectionHeaderData: (sectionID => sectionID),
      rowHasChanged: ((r1, r2) => r1 !== r2),
      sectionHeaderHasChanged: ((s1, s2) => s1 !== s2),
    });
  }

  // Reset all contents
  reset = () => {
    const newState = { currentPage: 1, isLoading: true };
    this.updateStates(newState, this.reloadData);
  };

  renderRefreshControl = () => (
    <RefreshControl refreshing={this.state.isRefresing} onRefresh={this.refreshData} />
  );

  reloadData = () => {
    const { placeholderData, renderPlaceholderOnly } = this.props;

    this.populateData(placeholderData);
    this.listView.scrollTo({ animated: false });

    if (!renderPlaceholderOnly)
      this.fetchData();
  };

  // API requests
  fetchData = async () => {
    const { currentPage } = this.state;

    try {
      const {
        newData,
        isEmptyData = false,
        isLastPage = false,
      } = await this.onFetchData(currentPage);
      const willAppendData = currentPage > 1 && !isEmptyData;

      this.populateData(newData, willAppendData);
      this.resetStates(isLastPage);
    } catch (error) {
      this.resetStates();
      this.onError && this.onError(error);
    }
  };

  // Pull to refresh
  refreshData = () => {
    const newState = { currentPage: 1, isRefresing: true, isLoading: true };
    this.updateStates(newState, this.fetchData);
  };

  // Pagination
  pullMoreData = () => {
    const { isLoading, isLastPageReached } = this.state;

    if (isLoading || isLastPageReached)
      return;

    const newState = { currentPage: this.state.currentPage + 1, isLoading: true };
    this.updateStates(newState, this.fetchData);
  };

  populateData = (newRawData, willAppendData = false) => {
    const { dataSource } = this.state;

    /* eslint-disable no-underscore-dangle */
    const originalData = willAppendData ? dataSource._dataBlob : {};
    /* eslint-enable no-underscore-dangle */
    const newData = this.mergeData(originalData, newRawData);
    const newDataSource = dataSource.cloneWithRowsAndSections(newData);

    const newState = Object.assign({}, this.state, { dataSource: newDataSource });
    this.updateStates(newState);
  };

  mergeData = (original, updated) => {
    const mergedData = {};
    const allKeys = _.uniq(_.concat(Object.keys(original), Object.keys(updated)));

    allKeys.forEach(key => {
      const originalData = original[key] || [];
      const updatedData = updated[key] || [];
      mergedData[key] = _.concat(originalData, updatedData);
    });

    return mergedData;
  };

  resetStates = isLastPage => {
    const lastPageState = isLastPage == null ? {} : { isLastPageReached: isLastPage };
    const newState = { isLoading: false, isRefresing: false, ...lastPageState };
    this.updateStates(newState);
  };

  updateStates = (newState, callback) => {
    if (!this.mounted) return;
    this.setState(newState, callback != null ? callback : undefined);
  }

  render() {
    const { paginationEnabled, refreshControlEnabled } = this.props;

    const refreshProps = refreshControlEnabled
      ? { refreshControl: this.renderRefreshControl() } : null;
    const paginationProps = paginationEnabled
      ? { onEndReached: this.pullMoreData } : null;

    return (
      <ListView
        {...this.props}
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        ref={ref => this.listView = ref}
        {...paginationProps}
        {...refreshProps}
      />
    );
  }
}
