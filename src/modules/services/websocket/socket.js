import Echo from 'laravel-echo'
import { api, instance } from '../api/api'

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

    // echo.join(`chat.${1}`)
    //   .here((users) => {
    //     console.log(users)
    //     users.forEach(user => {
          
    //       console.log(user.name)
    //     });

    //   })
    //   .joining((user) => {
    //     alert(user.name);
    //   })
    //   .leaving((user) => {
    //     console.log(user);
    //   })
    //   .error((error) => {
    //     console.error(error);
    //   });




  },

  // async newMessageConnection() {
  //   echo.private('new-message')
  //     .listen('.SendMessage', (e) => {
  //       alert(e.message.body)
  //       console.log(e)
  //     })
  // },

  async subscribeToDialogs(user, dialogs) {
    dialogs.forEach(dialog => {
      echo.join(`dialog.${dialog.id}`)
        .here((users) => {
          users.forEach(user => {
            // alert(user.name)
          });

        })
        .joining((user) => {
        })
        .leaving((user) => {
        })
        .error((error) => {
          console.error(error);
        });

    });


  }

}