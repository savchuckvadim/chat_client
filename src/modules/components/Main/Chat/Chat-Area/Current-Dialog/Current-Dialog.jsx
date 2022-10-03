import style from './Current-Dialog.module.css'
import SendMessage from './Send-Message/Send-Message'



const CurrentDialog = () => {

    return (
        <div className={style.container}>
           <div>Current Dialog</div> 
            <SendMessage />
        </div>
    )
}

export default CurrentDialog