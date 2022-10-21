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
    // let roomId = 1
    // echo.join(`chat.${roomId}`)
    //   .here((users) => {
    //     alert(users)
    //     console.log(users)
    //   })
    //   .joining((user) => {
    //     console.log(user.name);
    //   })
    //   .leaving((user) => {
    //     console.log(user.name);
    //   })
    //   .error((error) => {
    //     console.error(error);
    //   });
    // echo.private(`chat`)
    //   .listen('SendPost', (e) => {
    //     console.log(e)
    //     alert(e.post.body)
    //   })



    echo.private('new-message')
      .listen('.SendMessage', (e) => {
        debugger
        console.log(e)
      })
    // })


  },

}