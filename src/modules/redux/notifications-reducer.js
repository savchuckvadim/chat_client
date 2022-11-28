
const NOTIFICATIONS_STATUS = 'notifications/NOTIFICATIONS_STATUS'
const SET_NOTIFICATION = 'notifications/SET_NOTIFICATION'
const DELETE_NOTIFICATION = 'notifications/DELETE_NOTIFICATION'
const NOTIFICATIONS_RESET = 'notifications/NOTIFICATIONS_RESET'
const SOUND = 'notifications/SOUND'


const initialState = {
    isActive: true,
    notifications: [
       
        {
            author: { $user: 'yo', id: 1, email: 'nmbrsdntl@gmail.com', name: 'yo' },
            authorId: 1,
            body: "доогщрзш",
            created: "2022-11-22T06:10:17.000000Z",
            dialogId: 1,
            id: 1,
            isAuthorIsAuth: false,
            isEdited: 0,
            isForwarded: 0,
            isGroup: 0
        },
        {
            author: { $user: 'yo', id: 1, email: 'nmbrsdntl@gmail.com', name: 'yo' },
            authorId: 1,
            body: "доогщрзш",
            created: "2022-11-22T06:10:17.000000Z",
            dialogId: 1,
            id: 1,
            isAuthorIsAuth: false,
            isEdited: 0,
            isForwarded: 0,
            isGroup: 0
        },
        {
            author: { $user: 'yo', id: 1, email: 'nmbrsdntl@gmail.com', name: 'yo' },
            authorId: 1,
            body: "доогщрзш",
            created: "2022-11-22T06:10:17.000000Z",
            dialogId: 1,
            id: 1,
            isAuthorIsAuth: false,
            isEdited: 0,
            isForwarded: 0,
            isGroup: 0
        },
        {
            author: { $user: 'yo', id: 1, email: 'nmbrsdntl@gmail.com', name: 'yo' },
            authorId: 1,
            body: "доогщрзш",
            created: "2022-11-22T06:10:17.000000Z",
            dialogId: 1,
            id: 1,
            isAuthorIsAuth: false,
            isEdited: 0,
            isForwarded: 0,
            isGroup: 0
        },
        {
            author: { $user: 'yo', id: 1, email: 'nmbrsdntl@gmail.com', name: 'yo' },
            authorId: 1,
            body: "доогщрзш",
            created: "2022-11-22T06:10:17.000000Z",
            dialogId: 1,
            id: 1,
            isAuthorIsAuth: false,
            isEdited: 0,
            isForwarded: 0,
            isGroup: 0
        },
    
    ],
    sound: true,
}


//AC 

export const changeNotificationStatus = (bool) => ({ type: NOTIFICATIONS_STATUS, bool })
export const setNotification = (message) => ({ type: SET_NOTIFICATION, message })
export const deleteNotification = (notificationId) => ({ type: DELETE_NOTIFICATION, notificationId })

export const resetNotifications = () => ({ type: NOTIFICATIONS_RESET })
export const sound = (status) => ({ type: SOUND, status })



//REDUCER
const notifications = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATIONS_STATUS:
            if (state.isActive !== action.bool) {


                return !action.bool
                    ? { ...state, isActive: action.bool, notifications: [] }
                    : { ...state, isActive: action.bool }
            }
            return state;


        case SET_NOTIFICATION:
            let checkExist = state.notifications.some(n => n.id === action.message.id)

            if (checkExist) {
                return state
            } else {
                let resultNotifications = [...state.notifications]
                if (state.notifications.length < 7) {

                    resultNotifications.unshift(action.message)
                } else {
                    resultNotifications.splice(state.notifications.length - 1, 1)
                    resultNotifications.unshift(action.message)
                }
                return { ...state, notifications: resultNotifications };
            }


        case NOTIFICATIONS_RESET:

            return { ...state, notifications: [] };

        case DELETE_NOTIFICATION:
            let resultNotification = state.notifications.filter(n => n.id !== action.notificationId)
            return { ...state, notifications: resultNotification }

        case SOUND:
            if (state.sound !== action.status) {
                return { ...state, sound: action.status }
            }
            return state


        default:
            return state;
    }

}
export default notifications