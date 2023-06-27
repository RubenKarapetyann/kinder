import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Router from './routing/Router';
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router/>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
