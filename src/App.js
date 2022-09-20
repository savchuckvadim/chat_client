import { useEffect } from 'react';
import './App.css';
import Header from './modules/components/Header/Header';
import Main from './modules/components/Main/Main';
import Registration from './modules/components/Start/Registration/Registration';
import { authApi } from './modules/services/api';



const App = () => {

  useEffect(() => {
    authApi.getUser()
    // return () => {
    //   cleanup
    // }
  }, [])

  return (
    // <div className="App">
    //   <Header />
    //   <Main />
    // </div>
    <Registration />
  );
}

export default App;
