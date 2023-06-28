import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Router from './routing/Router';
import { BrowserRouter } from "react-router-dom"
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <main className="container">
          <Suspense fallback={"loading..."}>
            <Router/>
          </Suspense>
        </main>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
