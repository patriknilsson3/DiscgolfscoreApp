const appSettings = require("application-settings");

const state = {
  token: ''
};

const mutations = {
  setToken (state, token) {
    debugger;
    const hasDiscGolfToken = appSettings.hasKey('discGolfToken');
    if (hasDiscGolfToken) {
      appSettings.clear();
      appSettings.setString('discGolfToken', token);
    }    
    state.token = token;
  },
  setTokenFromAppSettings (state) {
    const token = appSettings.getString('discGolfToken');
    state.token = token;
  }
};

const getters = {
  getToken (state) {
    return state.token;
  },
}

export default {
  state,
  mutations,
  getters
};
