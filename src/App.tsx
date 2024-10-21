import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import App_Routes from './Routes';
import { GlobalStyle } from './utils/Global.styles';
 
const App: React.FC = () => {
  return (
    <GlobalStyle>
      <Provider store={store}>
        <Router>
          <App_Routes />
        </Router>
      </Provider>
    </GlobalStyle>
  );
};

export default App;
