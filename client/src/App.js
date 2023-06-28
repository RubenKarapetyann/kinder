import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Router from './routing/Router';
import { BrowserRouter } from "react-router-dom"
import { Suspense } from 'react';


//headeri nkarelu erkrord dzevy reduxov info talna chmoranas y.Davitic harcnes 
//+ reduxin hasnes pordzi anes
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <Suspense fallback={"loading..."}>
            <Router/>
          </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
