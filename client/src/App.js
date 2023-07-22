import './App.css';
import { Provider } from 'react-redux';
import Router from './routing/Router';
import { BrowserRouter } from "react-router-dom"
import { Suspense } from 'react';
import store from "./redux/store/store"
import CheckAuthentication from './components/usable-components/authentication/CheckAuthentication';
import { getLoading } from './utils/loading-helper';

//headeri nkarelu erkrord dzevy reduxov info talna chmoranas y.Davitic harcnes 
//+ reduxin hasnes pordzi anes
function App() {


  return (
    <BrowserRouter>
      <Provider store={store}>
        <CheckAuthentication>
            <Suspense fallback={getLoading(true)}>
              <Router/>
            </Suspense>
        </CheckAuthentication>
      </Provider>    
    </BrowserRouter>
  );
}

export default App;
