import '../../../App.css';
import Preloader from '../common/Preloader/Preloader';
import AddParticipantsContainer from '../Main/Chat/Dialogs/Group-Dialogs/Add-Partisipants-Area/Add-Participants-Container'
import Main from '../Main/Main'
import EmailVerification from '../common/Email-Verification/Email-Verification'
import SoundContainer from '../Notifications/Sound/Sound-Container'
import NotificationsContainer from '../Notifications/Notifications-Container'
import Start from '../Start/Start';



const Page = ({
    isAuth,
    authUser,
    inProgress,
    addingParticipantsInProgress,
    registrationStatus
  
  }) => {
    let page = <Preloader />
    if (!inProgress && isAuth) {
      if (addingParticipantsInProgress) {
  
        page = <AddParticipantsContainer />
      } else {
        if (authUser.email_verified_at) {
          page = <Main />
        } else {
          page = <EmailVerification authUser={authUser} />
        }
  
      }
  
    } else if (!inProgress && !isAuth) {
      page = <Start registrationStatus={registrationStatus} />
    }
    return (
      <div className='page'>
        {page}
        <SoundContainer />
        <NotificationsContainer />
      </div>
    )
  }

  export default Page