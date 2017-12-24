// libs
import { addNavigationHelpers } from 'react-navigation'
import { connect, Provider } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import React from 'react'

// src
import { AlertProvider } from './components/Alert'
import Navigator from './config/routes'
import store from './config/store'

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryGreen: '#00BD9D',
  $primaryOrange: '#D57A66',
  $primaryPurple: '#9E768F',

  $white: '#fff',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434'

  // $outline: 1
})

const App = ({ dispatch, nav }) =>
  <Navigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav
    })}
  />

const AppWithNavigation = connect(({ nav }) => ({ nav }))(App)

export default () =>
  <Provider store={store}>
    <AlertProvider>
      <AppWithNavigation />
    </AlertProvider>
  </Provider>
