import { getClassifies } from '@/api/article'

const article = {
  state: {
    count: 0,
    classifies: [],
    editing: {

    }
  },
  mutations: {
    SET_CLASSIFIES: (state, classifies) => {
      state.classifies = classifies
    },
    SET_COUNT: (state, count) => {
      state.count = count
    },
    SET_EDITING: (state, article) => {
      state.editing = article
    }
  },
  actions: {
    GetArticles ({ commit }) {

    },
    GetClassifies ({ commit }) {
      return new Promise((resolve, reject) => {
        getClassifies().then((res) => {
          if (res.status === 0) {
            commit('SET_CLASSIFIES', res.data.classifyList)
          }
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default article
