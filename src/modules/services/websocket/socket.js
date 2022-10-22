import Echo from 'laravel-echo'
import { api, instance } from '../api/api'


export const socket = {

  async connection() {

    window.Pusher = require('pusher-js')
    await instance.get("/sanctum/csrf-cookie")
    await api.get('user')
    

    let echo = new Echo({

      broadcaster: 'pusher',
      key: 's3cr3t',
      cluster: 'mt1',
      forceTLS: false,
      disableStats: true,
      wsHost: '127.0.0.1',
      wsPort: 6001,
      authorizer: (channel, options) => {
        console.log('websocket connection is success')
        console.log(options)
console.log(channel.name)
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
    let roomId = 1
    echo.join(`chat.${roomId}`)
      .here((users) => {
        users.forEach(user => {
          alert(user.name)
          console.log(user.name)
        });
       
      })
      .joining((user) => {
        console.log(user);
      })
      .leaving((user) => {
        console.log(user);
      })
      .error((error) => {
        console.error(error);
      });
    



    echo.private('new-message')
      .listen('.SendMessage', (e) => {
        alert(e.message.body)
        console.log(e)
      })
    // })


  },

}