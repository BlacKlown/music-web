let userInfo = null
let playList = []

userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : userInfo

export default {
    userInfo,
    playList
}
