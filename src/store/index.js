import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('auth') || '',
        datauser: localStorage.getItem('user') || ''
    },
    mutations: {
        setToken(state, token) {
            localStorage.setItem('auth', token)
            state.token = token

        },
        setUser(state, data) {
            localStorage.setItem('user', data)
            state.datauser = data
        },
        clearToken(state) {
            localStorage.removeItem('auth')
            state.token = ''
        },
        clearUser(state) {
            localStorage.removeItem('user')
            state.datauser = ''
        }
    }
})