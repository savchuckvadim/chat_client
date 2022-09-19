import CurrentDialog from './Current-Dialog/Current-Dialog'
import Dialogs from './Dialogs/Dialogs'
import style from './Main.module.css'
import Menu from './Menu/Menu'

const Main = () => {

  return (
    <main>
      <div className={style.container}>
        {/* yo! */}
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