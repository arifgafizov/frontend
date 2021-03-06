import Vue from 'vue'
import Vuex, {mapState} from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const auth = {
  namespaced: true,
  state: () => ({
    isAuth: !!localStorage.getItem('AUTH_TOKEN'),
    isSuperuser: false
  }),
  mutations: {
    setAuth (state, value) {
      state.isAuth = value
    },
    redirectNotAuth (state) {
      if (!state.isAuth) {
        this.$router.push({ name: "PRODUCTS_LIST"})
      }
    },
    setSuperuser (state, value) {
      state.isSuperuser = value
    }
  },
  actions: {
    redirectNotAuth ({ commit }) {
      commit('redirectNotAuth')
    }
  },
  getters: { }
}

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
