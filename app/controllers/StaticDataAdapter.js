/**
 * @providesModule ZeroProj.Controllers.StaticDataAdapter
 */

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Redux
import { staticData } from 'app/redux/actions';

function mapStateToProps(state) {
  return { ...state.staticData };
}

function mapDispatchToProps(dispatch) {
  return {
    onDataUpdated: partials => dispatch(staticData.updated(partials)),
  };
}

class StaticDataAdapter extends React.PureComponent {
  static propTypes = {
    // Define data validations here
  };

  constructor(props) {
    super(props);
    
    this.onDataUpdated = this.props.onDataUpdated.bind(this);
  }

  componentWillMount() {
    this.loadLocalData();
    this.fetchRemoteData();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCounter } = this.props;
    const { fetchCounter: nextFetchCounter, fetchKeys } = nextProps;

    // Force data fetching from any where connected
    if (fetchCounter < nextFetchCounter && !_.isEmpty(fetchKeys))
      this.fetchRemoteData(fetchKeys);
  }

  loadLocalData = () => {
    this.onDataUpdated({
      // Load local data & update here (stored in AsyncStorage or raw JSON files)
    });
  };

  fetchRemoteData = async (/* keys */) => {
    try {
      this.onDataUpdated({
        // Fetch remote data & update here
      });
    } catch (error) { throw error; }
  };

  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticDataAdapter);
