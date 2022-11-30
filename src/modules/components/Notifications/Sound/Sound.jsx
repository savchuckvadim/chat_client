import { useEffect, useRef } from 'react'
import NotificationSound from "../../../../assets/notification.mp3";

const Sound = ({ newNotification, deleteNewNotification }) => {
    
    const audioPlayer = useRef(null);
    useEffect(() => {
        if (newNotification) {

            if (audioPlayer && audioPlayer.current && newNotification.isSound) {

                audioPlayer.current.play();
            }

            deleteNewNotification()
        }

    }, [newNotification])

    return (
        <audio ref={audioPlayer} src={NotificationSound} style={{ display: 'none' }} />
    )
}


export default Sound