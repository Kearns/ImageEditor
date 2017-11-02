import React from 'react'
import { Provider } from 'react-redux'

import Editor from './components/Editor/'
import store from './store'

import './App.css';
const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
          <Editor />
      </div>
    </Provider>
  );
}

export default App;
