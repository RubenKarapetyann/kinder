import './App.css';
import { useDispatch } from 'react-redux';
import Router from './routing/Router';
import { BrowserRouter } from "react-router-dom"
import { Suspense, useEffect } from 'react';
import { checkAuthentication } from './redux/reducers/userSlice/UserReducer';


//headeri nkarelu erkrord dzevy reduxov info talna chmoranas y.Davitic harcnes 
//+ reduxin hasnes pordzi anes
function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuthentication())
  },[])


  return (
    <BrowserRouter>
      <Suspense fallback={"loading..."}>
        <Router/>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
