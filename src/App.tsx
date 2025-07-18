/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';

import AppContainer from './AppContainer';
import {store} from './store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
