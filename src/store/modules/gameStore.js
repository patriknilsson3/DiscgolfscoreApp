const state = {
  game: {},
  currentHole: 1
};

const mutations = {
  setGame (state, game) {    
    state.game = game;
  },
  incrementHole (state) {
    if (state.currentHole === 9) {
      state.currentHole = 1;
    }
    else {
      state.currentHole++;
    }

  },
  decrementHole (state) {
    if (state.currentHole === 1) {
      state.currentHole = 9;
    }
    else {
      state.currentHole--;
    }
  }
};

const getters = {
  getGame (state) {
    return state.game;
  },
  getGameId (state) {
    return state.game.Id;
  },
  getCurrentHole (state) {
    return state.currentHole;
  },
  getCurrentScore (state) {
    if (state.game.Scores.length === 0) {
      return 0;
    }
    var currentScore = state.game.Scores.find(function (score) { return score.Hole.Number === state.currentHole });
    if (currentScore === undefined) {
      return 0;
    }
    return currentScore.Result > 0 ? currentScore.Result : 0;
  },
  getCurrentScoreId (state) {
    if (state.game.Scores.length === 0) {
      return 0;
    }
    var currentScore = state.game.Scores.find(function (score) { return score.Hole.Number === state.currentHole });
    if (currentScore === undefined) {
      return 0;
    }
    return currentScore.Id;
  }
};

export default {
  state,
  mutations,
  getters
};
