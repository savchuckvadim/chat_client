
export const precenseUserUtil = (users, userId, status) => {
    if (users.length > 0) {
        const resultUsers = users.map(user => (
            user.id === userId
                ? { ...user, isActive: status }
                : user
        ))
        return resultUsers
    } else {
        return users
    }

}