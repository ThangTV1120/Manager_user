import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';

// import ModelAddUser from './components/ModelAddNewUser';
import Toasts from './common/Toast';

import { useContext } from 'react';
import { useEffect } from 'react';
import AppRoute from './routes/AppRoute';
import { useDispatch, useSelector } from 'react-redux';
import {handleRefresh} from './redux/action/userAction';
// import { useState } from 'react';
function App() {

  const dispatch=useDispatch();
  // const dataUserRedux =useSelector(state=>state.user.account)//redux
  // console.log(dataUserRedux);
  useEffect(()=>{
    if(localStorage.getItem("token")){
      //Redux
      dispatch(handleRefresh())
    }
  },[])
  return (
    <>
      <div className='app-container'>

        <Header></Header>
        <Container>
          <AppRoute/>
     
        </Container>

      </div>
      <Toasts />
    </>


  );
}

export default App;
