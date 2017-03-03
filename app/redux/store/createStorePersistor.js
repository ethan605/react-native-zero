/**
 * @providesModule ZeroProj.Redux.Store.createStorePersistor
 */

import { AsyncStorage } from 'react-native';
import { createTransform, createPersistor, getStoredState } from 'redux-persist';

// Models
import User from 'app/models/User';

// Utils
import Logger from 'app/utils/Logger';

function inboundTransform(partialState, key) {
  if (key === 'shared')
    // Exclude `rehydrated` state from being persisted
    return { ...partialState, rehydrated: undefined };

  return partialState;
}

function outboundTransform(partialState, key) {
  if (partialState == null)
    return null;

  if (key === 'auth') {
    const { userData } = partialState;
    return {
      userData: User.build(userData),
    };
  }

  if (key === 'staticData') {
    return {
      // Data objects mapping here
    };
  }

  return partialState;
}

export default function createStorePersistor(store) {
  const defaultState = store.getState();

  const configs = {
    storage: AsyncStorage,
    transforms: [createTransform(inboundTransform, outboundTransform)],
  };

  getStoredState(configs, async (err, persistedState) => {
    const persistor = createPersistor(store, configs);
    
    const { shared: { storeDataVersion: latestDataVersion } } = defaultState;
    const { shared: { storeDataVersion = 0 } = {} } = persistedState || {};

    // Check and purge persisted states if data versions not match
    if (parseInt(storeDataVersion) < parseInt(latestDataVersion)) {
      Logger.log(
        `Current data version: ${storeDataVersion}`,
        `Latest data version: ${latestDataVersion}`
      );
      await persistor.purge();
      await persistor.rehydrate(defaultState);
    } else
      await persistor.rehydrate(persistedState);

    // Mark that the rehydration is done
    await persistor.rehydrate({ shared: { rehydrated: true } });
  });
}
