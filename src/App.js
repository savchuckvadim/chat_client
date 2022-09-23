import './App.css';
import HeaderContainer from './modules/components/Header/Header-Container';
import Main from './modules/components/Main/Main';
import Start from './modules/components/Start/Start';



const App = (props) => {

  return (
    <div className="App">
      <HeaderContainer />
      <div className='page'>
       { props.isAuth
        ? <Main />
        : <Start />}
      </div>
    </div>
  );
}

export default App;
