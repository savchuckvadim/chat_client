
const NOTIFICATIONS_STATUS = 'notifications/NOTIFICATIONS_STATUS'
const SET_NOTIFICATION = 'notifications/SET_NOTIFICATION'
const DELETE_NOTIFICATION = 'notifications/DELETE_NOTIFICATION'
const NOTIFICATIONS_RESET = 'notifications/NOTIFICATIONS_RESET'
const SOUND = 'notifications/SOUND'
const initialState = {
    isActive: true,
    notifications: [

        // {
        //     author: {
        //         email: "savchuckvadim@gmail.com",
        //         id: 1,
        //         isContacted: false,
        //         name: "vadim",
        //     },
        //     authorId: 1,
        //     body: "7 ",
        //     created: "2022-11-18T15:16:39.000000Z",
        //     dialogId: 51,
        //     id: 68,
        //     isAuthorIsAuth: true,
        //     isEdited: 0,
        //     isForwarded: 1,
        //     isGroup: 0,
        //     recipients: []
        // },
        // {
        //     author: {
        //         email: "savchuckvadim@gmail.com",
        //         id: 1,
        //         isContacted: false,
        //         name: "chuvak!",
        //     },
        //     authorId: 1,
        //     body: '6',
        //     created: "2022-11-18T15:16:39.000000Z",
        //     dialogId: 51,
        //     id: 68,
        //     isAuthorIsAuth: true,
        //     isEdited: 0,
        //     isForwarded: 1,
        //     isGroup: 0,
        //     recipients: []
        // },
        // {
        //     author: {
        //         email: "savchuckvadim@gmail.com",
        //         id: 1,
        //         isContacted: false,
        //         name: "el chuvachino",
        //     },
        //     authorId: 1,
        //     body: "5",
        //     created: "2022-11-18T15:16:39.000000Z",
        //     dialogId: 51,
        //     id: 68,
        //     isAuthorIsAuth: true,
        //     isEdited: 0,
        //     isForwarded: 1,
        //     isGroup: 0,
        //     recipients: []
        // },
        // {
        //     author: {
        //         email: "savchuckvadim@gmail.com",
        //         id: 1,
        //         isContacted: false,
        //         name: "chuvak!",
        //     },
        //     authorId: 1,
        //     body: '4',
        //     created: "2022-11-18T15:16:39.000000Z",
        //     dialogId: 51,
        //     id: 68,
        //     isAuthorIsAuth: true,
        //     isEdited: 0,
        //     isForwarded: 1,
        //     isGroup: 0,
        //     recipients: []
        // },
        // {
        //     author: {
        //         email: "savchuckvadim@gmail.com",
        //         id: 1,
        //         isContacted: false,
        //         name: "el chuvachino",
        //     },
        //     authorId: 1,
        //     body: "3",
        //     created: "2022-11-18T15:16:39.000000Z",
        //     dialogId: 51,
        //     id: 68,
        //     isAuthorIsAuth: true,
        //     isEdited: 0,
        //     isForwarded: 1,
        //     isGroup: 0,
        //     recipients: []
        // },
        // {
        //     author: {
        //         email: "savchuckvadim@gmail.com",
        //         id: 1,
        //         isContacted: false,
        //         name: "chuvak!",
        //     },
        //     authorId: 1,
        //     body: '2',
        //     created: "2022-11-18T15:16:39.000000Z",
        //     dialogId: 51,
        //     id: 68,
        //     isAuthorIsAuth: true,
        //     isEdited: 0,
        //     isForwarded: 1,
        //     isGroup: 0,
        //     recipients: []
        // },
        // {
        //     author: {
        //         email: "savchuckvadim@gmail.com",
        //         id: 1,
        //         isContacted: false,
        //         name: "el chuvachino",
        //     },
        //     authorId: 1,
        //     body: "1 ",
        //     created: "2022-11-18T15:16:39.000000Z",
        //     dialogId: 51,
        //     id: 68,
        //     isAuthorIsAuth: true,
        //     isEdited: 0,
        //     isForwarded: 1,
        //     isGroup: 0,
        //     recipients: []
        // },

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
            let checkExist = state.notifications.some(n => n.id === action.message)
            if (checkExist) {
                return state
            } else {
                let resultNotifications = [...state.notifications]
                if (state.notifications.length < 7) {

                    resultNotifications.unshift(action.message)
                } else {
                    resultNotifications.splice(state.notifications.length-1, 1)
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