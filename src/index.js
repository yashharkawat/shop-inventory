import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import persistStore from 'redux-persist/es/persistStore';
import './index.css';

const persistor = persistStore(store); // Create the persistor
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  (<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>)
);
