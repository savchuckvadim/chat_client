import './App.css';
import Header from './modules/components/Header/Header';
import Main from './modules/components/Main/Main';

import Start from './modules/components/Start/Start';



const App = (props) => {

  return (
    <div className="App">
      <Header isAuth={props.isAuth} />
      <div className='page'>
       { props.isAuth
        ? <Main />
        : <Start />}
      </div>
    </div>
  );
}

export default App;
