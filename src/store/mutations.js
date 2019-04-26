export default {
    setUserInfo (state, userInfo) {
        state.userInfo = userInfo
        localStorage.userInfo = JSON.stringify(userInfo)
    },
    setPlayList (state, playList) {
        state.playList = playList
    },
    addToPlayList (state, {index, info}) {
        state.playList.splice(index, 0, info)
    },
    removeFromPlayList (state, index) {
        state.playList.splice(index, 1)
    }
}
