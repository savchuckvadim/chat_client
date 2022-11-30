import './App.css';
import ModalContainer from './modules/components/common/Modal/Modal-Container';
import HeaderContainer from './modules/components/Header/Header-Container';
import Page from './modules/components/Page/Page';

//TODO:

// -> paginator

const App = (props) => {

  return (
    <>
      <ModalContainer />
      <div className="App" onClick={() => (props.isContextMenuActive && props.contextMenuToggler(false))}>
        <HeaderContainer />
        <Page
            isAuth={props.isAuth}
            authUser={props.authUser}
            inProgress={props.inProgress}
            addingParticipantsInProgress={props.addingParticipantsInProgress}
        />
      </div>
    </>
  );
}

export default App;
