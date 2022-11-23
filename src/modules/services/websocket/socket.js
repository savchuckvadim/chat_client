import Echo from 'laravel-echo'
import { addOnline, deleteOnline, setOnline } from '../../redux/users-reducer'
import { api, instance } from '../api/api'
import { usersAPI } from '../api/users-api'

export let echo
export const socket = {

  async connection() {

    window.Pusher = require('pusher-js')
    await instance.get("/sanctum/csrf-cookie")
    await api.get('user')


    echo = new Echo({

      broadcaster: 'pusher',
      key: 's3cr3t',
      cluster: 'mt1',
      forceTLS: false,
      disableStats: true,
      wsHost: '127.0.0.1',
      wsPort: 6001,
      authorizer: (channel, options) => {
        console.log('websocket connection is success')

        return {
          authorize: (socketId, callback) => {
            api.post('broadcasting/auth', {
              socket_id: socketId,
              channel_name: channel.name,
            })

              .then((response) => {

                callback(false, response.data)
              })
              .catch((error) => {
                callback(true, error)
              })
          }
        }
      }

    })


  },
  async precenseListener(dispatch) {

    if (echo) {

      echo.join(`chat`)
        .here((ids) => {
          console.log(ids)
          dispatch(setOnline(ids))
        })
        .joining((userId) => {
         
          console.log(userId)
          dispatch(addOnline(userId))
         
        })
        .leaving((userId) => {
          console.log(`leaving ${userId}`)
          dispatch(deleteOnline(userId))
         

        })

        .error((error) => {
          console.error(error);
        });
    } else {

      setTimeout(async () => {
        await socket.connection()
        await socket.precenseListener()
      }, 2000)


    }
  },
  async reconnect() {
    if (echo) {
      setTimeout(async () => {
        await socket.reconnect()
      }, 20000)
    } else {
      await socket.connection()
      await socket.reconnect()
    }
  }
}
  // async newMessageConnection() {
  //   echo.private('new-message')
  //     .listen('.SendMessage', (e) => {
  //       alert(e.message.body)
  //       console.log(e)
  //     })
  // },



