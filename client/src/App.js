import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Router from './routing/Router';
import { BrowserRouter } from "react-router-dom"
import Header from './components/header/Header';
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
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
