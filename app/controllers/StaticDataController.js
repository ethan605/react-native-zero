/**
 * @providesModule ZeroProj.Controllers.StaticDataController
 */

import React from 'react';
import { connect } from 'react-redux';

// Redux
import { /* serviceApi, */ staticData } from 'app/redux/actions';

// Utils
// import Logger from 'app/utils/Logger';

function mapStateToProps(state) {
  const { rehydrated } = state.shared;
  return { ...state.staticData, rehydrated };
}

function mapDispatchToProps(dispatch) {
  return {
    onDataUpdated: partials => dispatch(staticData.dataUpdated(partials)),
  };
}

class StaticDataController extends React.PureComponent {
  static propTypes = {
    rehydrated: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.onDataUpdated = this.props.onDataUpdated.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { rehydrated } = this.props;
    
    if (nextProps.rehydrated && !rehydrated)
      this.loadAndFetchAllData();
  }

  loadAndFetchAllData = () => {
    // Load local data
    // this.onDataUpdated({ ... });

    // Fetch remote data
  };

  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticDataController);
