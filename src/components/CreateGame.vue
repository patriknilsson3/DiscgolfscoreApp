<template>
  <Page class="Spela">
    <ActionBar title="Home" class="action-bar" />
    <StackLayout class="home-panel">
      <Button text="Skapa spel" @tap="createGame(true)" />
      <Button text="Gå med i spel" @tap="joinGame(false)" />
      <ActivityIndicator :busy="loading" class="activity-indicator" />
      <TextField v-model="gameId" />
    </StackLayout>
  </Page>
</template>

<script>
import game from '../components/Game';
const http = require("http");

export default {
  data () {
    return {
      email: "",
      password: "",
      loading: false,
      gameId: "1",
      user: this.$store.getters.getUser,
      token: this.$store.getters.getToken
    };
  },
  methods: {
    createGame () {
      this.loading = true;
      var url = `${this.$url()}api/Game/CreateGame`;
      http.request({
        url: url,
        method: "POST",
        headers: { "Content-Type": "application/json", "Auth": this.token, 'Authorization': 'Bearer ' + this.token },
        content: JSON.stringify({
          'courseId': 1,
          'userId': this.user.UserId
        })
      }).then(response => {
        var result = response.content.toJSON();
        this.$store.commit("setGame", result);
        this.$navigateTo(game);
      }, function (e) {
        console.log("Error occurred " + e);
      });
    },
    joinGame () {
      this.loading = true;
      var url = `${this.$url()}api/Game/AddPlayer`;
      var gameId = Number.parseInt(this.gameId);
      http.request({
        url: url,
        method: "POST",
        headers: { "Content-Type": "application/json", "Auth": this.token, 'Authorization': 'Bearer ' + this.token },
        content: JSON.stringify({
          'gameId': gameId,
          'playerId': this.user.UserId
        })
      }).then(response => {

        var result = response.content.toJSON();
        this.$store.commit("setGame", result);
        this.$navigateTo(game);
      }, function (e) {
        console.log("Error occurred " + e);
      });
    }
  }
}
</script>

<style scoped>
button {
  background: #f4b942;
  color: black;
}
.action-bar {
  background: #f4b942;
}

.page {
  background: grey;
}
</style>
