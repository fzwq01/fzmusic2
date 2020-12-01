import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cookie:''
}
export default new Vuex.Store({
  state,
  mutations: {
    // mutations是操作state数据的方法的集合，比如对该数据的修改、增加、删除等等。
    // ([state] [,payload])state是当前VueX对象中的state,payload是该方法在被调用时传递参数使用的
    
    // 保存用户信息
    addUser(state,obj){
      state.cookie = obj.cookie
    }
  },
  actions: {
  },
  modules: {
  }
})
