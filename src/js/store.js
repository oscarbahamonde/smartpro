import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import  { Axios } from 'axios'
import { ref } from 'vue'
import { createStore } from 'vuex'

const app = initializeApp({apiKey: "AIzaSyAgcnqNze85kqJV47x_p_ESXZi6NoR4UiY",
authDomain: "ecolibrishop-54839.firebaseapp.com",
databaseURL: "https://ecolibrishop-default-rtdb.firebaseio.com",
projectId: "ecolibrishop",
storageBucket: "ecolibrishop.appspot.com",
messagingSenderId: "1009380579533",
appId: "1:1009380579533:web:2d8b4fa05a8b61268d7184"})

const auth = getAuth(app)

export const client = new Axios({
    baseURL: "https://smartpro.solutions",
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
})


class Authenticator{
    constructor(){
        this.auth = auth
    }
    async create_user(email, password){
        return await createUserWithEmailAndPassword(auth, email, password)
    }
    async sign_in(email, password){
        return await signInWithEmailAndPassword(auth, email, password)
    }
    async sign_in_with_github(){
        return await signInWithPopup(auth, new GithubAuthProvider())
    }
    async sign_in_with_google(){
        return await signInWithPopup(auth, new GoogleAuthProvider())
    }
    async sign_out(){
        return await signOut(auth)
    }
    async get_user(){
        return await auth.currentUser
    }
    async postUser(){
        const user = await this.get_user()
        data = {
            "displayName": user.displayName,
            "photoURL": user.photoURL,
            "email": user.email,
        }
        return await client.post('/api/users', data)        
    }
}

export const authenticator = new Authenticator()

const store = createStore({
    state: {
        user: ref(null),
        auth: ref(authenticator),
        client: ref(client),
    },
    mutations: {
        setUser(state, user){
            state.user = user
        },
        setAuth(state, auth){
            state.auth = auth
        },
        setClient(state, client){
            state.client = client
        },
    },
    actions: {
        async sign_in_with_github({commit, state}){
            const user = await state.auth.sign_in_with_github()
            commit('setUser', user)
            await state.auth.postUser()
        },
        async sign_in_with_google({commit, state}){
            const user = await state.auth.sign_in_with_google()
            commit('setUser', user)
            await state.auth.postUser()
        },
        async sign_out({commit, state}){
            await state.auth.sign_out()
            commit('setUser', null)
        },
        async create_user({commit, state}, {email, password}){
            const user = await state.auth.create_user(email, password)
            commit('setUser', user)
            await state.auth.postUser()
        },
        async sign_in({commit, state}, {email, password}){
            const user = await state.auth.sign_in(email, password)
            commit('setUser', user)
            await state.auth.postUser()
        }
    }
})

export default store