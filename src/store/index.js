import Vue from 'vue'
import Vuex from 'vuex'
import Methods from '@/api/methods' // src/api/methods 呼び出し
// import router from "@/router/index";
import _ from 'lodash' //値のコピー時使用
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todolist: "",
    originallist: ""
  },
  mutations: {
    //db初期のデータを todolist に渡す
    TodoReadStore(state, list) {
      state.todolist = list;
      state.originallist = _.cloneDeep(list);
    },
  },
  actions: {
    // dbの読み出し
    async TodoRead({ commit, state }, putlist) {
      var list = []
      if (!putlist) {
        var todolist = await Methods.TodoReadApi();
        var data = todolist.data.data;
        for (var i = 0; i < Object.keys(data).length; i++) {
          list.push({
            text: data[i].comment,
            id: data[i].id
          })
        }
      } else {
        list = state.todolist
      }
      commit("TodoReadStore", list);
    },

    // createの関数
    async TodoCreate({ dispatch }, newtext) {
      await
        Methods.TodoCreateApi(newtext)
        .then(() => {
          dispatch("TodoRead");
        })
        .catch(() => {
          return
      })
    },

    //updataの関数 更新した場合DB読み込み作業をcommit
    async TodoUpdata({ dispatch }, updatatextlist) {
      await
        Methods.TodoUpdataApi(updatatextlist)
          .then((response) => {
            var putlist = {
              text: response.data.data["comment"],
              id: updatatextlist[1]
            }
          dispatch("TodoRead", putlist);
        })
          .catch(() => {
            return;
        })
    },

    //deleteの関数 有無を言わさず削除
    async TodoDelete({ dispatch }, id) {
      await
        Methods.TodoDeleteAPi(id)
          .then(() => {
            dispatch("TodoRead");
          })
    }
  },

  getters: {
    gettodolist(state) {
      return state.originallist
    }
  }
})
