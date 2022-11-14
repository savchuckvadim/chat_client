import './App.css';
import EmailVerification from './modules/components/common/Email-Verification/Email-Verification';
import Preloader from './modules/components/common/Preloader/Preloader';
import HeaderContainer from './modules/components/Header/Header-Container';
import ForwardMessage from './modules/components/Main/Chat/Chat-Area/Current-Dialog/Messages/Forward-Message/Forward-Message';
import ForwardMessageContainer from './modules/components/Main/Chat/Chat-Area/Current-Dialog/Messages/Forward-Message/Forward-Message-Container';
import AddPartisipantsContainer from './modules/components/Main/Chat/Chat-Area/Dialogs/Group-Dialogs/Add-Partisipants-Area/Add-Partisipants-Container';
import Main from './modules/components/Main/Main';
import Start from './modules/components/Start/Start';

//TODO:
// react context-menu for mouse right click
//profile->change nickname
//dialogs->delete dialog

//dialogs + create group dialog

//group dialogs 
// + add users popup *only from contacts
// + users search 

//messages -> edit and delete
// -> forwarding  to contacts only
// -> sound notification sound/unsound

// -> paginator

const App = (props) => {

  let page = <Preloader />
  if (!props.inProgress && props.isAuth) {
    if (props.addingParticipantsInProgress) {

      page = <AddPartisipantsContainer />
    } else {
      // if (props.authUser.email_verified_at) {
        page = <Main />
      // } else {
      //   page = <EmailVerification />
      // }

    }

  } else if (!props.inProgress && !props.isAuth) {
    page = <Start
      registrationStatus={props.registrationStatus}
      registrationUrl={props.registrationUrl}
    />
  } else {
    // return <Navigate replace to='../' />
  }

  return (
    <>
      <ForwardMessageContainer />
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
