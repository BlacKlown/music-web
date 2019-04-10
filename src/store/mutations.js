export default {
    setUserInfo (state, userInfo) {
        state.userInfo = userInfo
        localStorage.userInfo = JSON.stringify(userInfo)
    }
}
