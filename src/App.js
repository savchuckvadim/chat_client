import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';
import Header from './modules/components/Header/Header';
import Main from './modules/components/Main/Main';
import Login from './modules/components/Start/Login/Login';
import LoginContainer from './modules/components/Start/Login/Login-Container';
import Registration from './modules/components/Start/Registration/Registration';
import Start from './modules/components/Start/Start';
import { authApi } from './modules/services/api';



const App = () => {

  useEffect(() => {
    authApi.getUser()
    // return () => {
    //   cleanup
    // }
  }, [])

  return (
    <div className="App">
      <Header />
      <div className='page'>
        <Start />
      </div>
    </div>
  );
}

export default App;
