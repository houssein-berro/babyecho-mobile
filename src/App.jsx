import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppContent from './AppContent';

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
 