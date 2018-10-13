const state = {
  user: {}
};

const mutations = {
  setUser (state, user) {
    state.user = user;
  }
};

const getters = {
  getUser (state) {
    return state.user;
  },
  getUserId (state) {
    debugger;
    return state.user.UserId;
  },
}

export default {
  state,
  mutations,
  getters
};
