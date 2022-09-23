import './App.css';
import Preloader from './modules/components/common/Preloader/Preloader';
import HeaderContainer from './modules/components/Header/Header-Container';
import Main from './modules/components/Main/Main';
import Start from './modules/components/Start/Start';



const App = (props) => {
  let page = <Preloader />
  if (!props.inProgress && props.isAuth) {
    page = <Main />
  } else if (!props.inProgress && !props.isAuth) {
    page = <Start />
  }

  return (
    <div className="App">
      <HeaderContainer />
      <div className='page'>
        {page}
      </div>
    </div>
  );
}

export default App;
