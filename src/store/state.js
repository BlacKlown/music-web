let userInfo = null

userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : userInfo

export default {
    userInfo
}
