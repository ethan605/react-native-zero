/**
 * @providesModule ZeroProj.Redux.Store
 */

/* eslint-disable no-underscore-dangle */

import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';

// export default createStore(
//   reducers,
//   undefined,
//   applyMiddleware(),
// );

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* eslint-enable no-underscore-dangle */
