/**
 * @providesModule ZeroProj.Components.AppExperimentals.withConnect
 */

import { connect } from 'react-redux';
import { staticData } from 'app/redux/actions';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchRemoteData: keys => dispatch(staticData.fetch(keys)),
    onUpdateRemoteData: partials => dispatch(staticData.updated(partials)),
  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
