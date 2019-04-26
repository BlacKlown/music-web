export default {
    setUserInfo ({commit}, userInfo = null) {
        commit('setUserInfo', userInfo)
    },
    setPlayList ({commit}, playList = []) {
        commit('setPlayList', playList)
    },
    addToPlayList ({commit}, {index, info}) {
        commit('addToPlayList', {index, info})
    },
    removeFromPlayList ({commit}, index) {
        commit('removeFromPlayList', index)
    }
}
