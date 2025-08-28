import React, { useEffect } from 'react';
import './App.scss';
import Sidevar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import { useSelector } from 'react-redux';
import Login from './components/login/Login';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { InititalUserState } from './Types';
import {auth} from './firebase';
import { login, logout } from './features/userSlice';
import { Photo } from '@mui/icons-material';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from './utils/ErrorFallBack';


function App() {

  const user = useAppSelector((state) => state.user.user);
  // const user = null;
  // console.log(user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if(loginUser) {
        dispatch(login({
          uid:loginUser.uid,
          Photo: loginUser.photoURL,
          email: loginUser.email,
          displayName: loginUser.displayName,
        })
      );
     } else {
      dispatch(logout());
     }
    })
  }, [dispatch]);

  return (
    <div className="App">
      {user ? 
      (
        <>
        <ErrorBoundary FallbackComponent ={ErrorFallBack}>
          <Sidevar />
        </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
           <Login />
        </>
      )}
      
    </div>
  );
}

export default App;
function state(state: InititalUserState): unknown {
  throw new Error('Function not implemented.');
}

