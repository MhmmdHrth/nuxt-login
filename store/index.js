import Vuex from 'vuex'
import cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            Users: [],
            token: null
        },

        mutations: {
            userList(state, userList) {
                state.Users = userList
            },

            addUser(state, user) {
                state.Users.push(user);
            },

            deleteUser(state, user) {
                state.Users.map(x => {
                    if (x.id == user) {
                        state.Users.splice(0, 1)
                    }
                })
            },

            editUser(state, user) {
                let userIndex = state.Users.findIndex(x => x.id == user.id)
                state.Users[userIndex] = user
            },

            login(state, token){
                state.token = token
            },

            logout(state){
                state.token = null
            }
        },

        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get("/api/users?page=2")
                    .then(res => {
                        vuexContext.commit('userList', res.data)
                    })
                    .catch(err => {
                        context.error(err)
                    })
            },

            addUser(vuexContext, user) {
                vuexContext.commit('addUser', user)
            },

            deleteUser(vuexContext, user) {
                vuexContext.commit('deleteUser', user)
            },

            editUser(vuexContext, user) {
                vuexContext.commit('editUser', user)
                console.log("edit user")
            },

            async login(vuexContext,formData){
                let response = await this.$axios.$post("https://pos-usc.cloud-connect.asia/auth/local", {
                    identifier: formData.email,
                    password: formData.password,
                })
                
                this.$axios.setHeader("Authorization","Bearer " + response.jwt)
                console.log("jwt token", response.jwt)
                vuexContext.commit('login', response.jwt)
                cookie.set('token', response.jwt)

                return response
            },

            autoLogin(vuexContext, request){
                if(request){
                    if(!request.headers.cookie){
                        return;
                    }
                    const jwtcookie = request.headers.cookie.split("=")[1]
                    

                    this.$axios.setHeader("Authorization","Bearer " + jwtcookie)
                    vuexContext.commit('login', jwtcookie)
                }
            },

            logout(vuexContext){
                cookie.remove("token")
                this.$axios.setHeader("Authorization", null)
                vuexContext.commit('logout')
            }
        },

        getters: {
            getUserList(state) {
                return state.Users
            },

            isAuthenticated(state){
                return state.token != null
            },

            getToken(state){
                return state.token
            }
        },

    })
}

export default createStore