import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';

function App() {
  return (
    <Provider store={store}>
      test
    </Provider>
  );
}

export default App;
