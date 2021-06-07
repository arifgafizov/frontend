import Vue from 'vue'
import Vuex, {mapState} from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
// const moduleA = {
//   state: () => ({
//     isAuth: false
//   }),
//   mutations: {
//     auth (state) {
//       state.isAuth = true
//     }
//   },
  // actions: { ... },
  // getters: { ... }
// }

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      // a: moduleA

      state: () => ({
        isAuth: false
      }),

        mutations: {
          auth (state) {
            state.isAuth = true
          }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  }})

  return Store
}
