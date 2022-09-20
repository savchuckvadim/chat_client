import CurrentDialog from './Chat/Chat-Area/Current-Dialog/Current-Dialog'
import Dialogs from './Chat/Chat-Area/Dialogs/Dialogs'
import style from './Main.module.css'
import Menu from './Chat/Menu/Menu'

const Main = () => {

  return (
    <main>
      <div className={style.container}>
        <div className={style.dialogs}>
          <Dialogs />
        </div>
        <div className={style.currentDialog}>
          <CurrentDialog />
        </div>
        <div className={style.menu}>
          <Menu />
        </div>

      </div>
    </main>
  )
}

export default Main