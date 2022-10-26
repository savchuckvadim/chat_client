import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Preloader from './modules/components/common/Preloader/Preloader';
import HeaderContainer from './modules/components/Header/Header-Container';
import AddPartisipantsArea from './modules/components/Main/Chat/Chat-Area/Dialogs/Group-Dialogs/Add-Partisipants-Area/Add-Partisipants-Area';
import Main from './modules/components/Main/Main';
import Start from './modules/components/Start/Start';

//TODO:
//profile->change nickname
//dialogs->delete dialog
//dialogs-> create group dialog

//group dialogs -> add users popup *only from contacts
// -> users search 

//messages -> edit and delete
// -> forwarding  to contacts only
// -> sound notification sound/unsound

const App = (props) => {

  let page = <Preloader />
  if (!props.inProgress && props.isAuth) {
    if (props.addingPartisipantsInProgress) {
      debugger
      page = <AddPartisipantsArea />
    } else {
      page = <Main />
    }

  } else if (!props.inProgress && !props.isAuth) {
    page = <Start />
  } else {
    // return <Navigate replace to='../' />
  }

  return (
    <>

      <div className="App">
        <HeaderContainer />
        <div className='page'>
          {page}
        </div>
      </div>
    </>
  );
}

export default App;
