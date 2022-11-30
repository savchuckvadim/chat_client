import { useLayoutEffect } from 'react';
import style from './Preloader.module.css'

const Preloader = (props) => {

    let styleFromArea = props.isForwarding
        ? {
            'borderRadius': '12px',

        }
        : {}
        
    return (
        <div style={styleFromArea} className={style.container}>
            <p className={style.title}>Loading...</p>
        </div>
    )
}
export default Preloader