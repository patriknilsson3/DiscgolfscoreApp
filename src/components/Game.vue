<template>
  <Page>
    <ScrollView sdkExampleTitle sdkToggleNavButton>
      <ActionBar title="Home" class="action-bar" />
      <FlexboxLayout flexDirection="row" flexWrap="wrap">

        <Button text="Tillbaka" width="50%" @tap="decrementHole" />
        <Button text="Nästa" width="50%" @tap="incrementHole" />

        <Button text="1" width="33%" height="100" @tap="selectScore(1)" backgroundColor="orange" />
        <Button text="2" width="33%" height="100" @tap="selectScore(2)" backgroundColor="orange" />
        <Button text="3" width="33%" height="100" @tap="selectScore(3)" backgroundColor="orange" />
        <Button text="4" width="33%" height="100" @tap="selectScore(4)" backgroundColor="orange" />
        <Button text="5" width="33%" height="100" @tap="selectScore(5)" backgroundColor="orange" />
        <Button text="6" width="33%" height="100" @tap="selectScore(6)" backgroundColor="orange" />
        <Button text="7" width="33%" height="100" @tap="selectScore(7)" backgroundColor="orange" />
        <Button text="8" width="33%" height="100" @tap="selectScore(8)" backgroundColor="orange" />
        <Button text="9" width="33%" height="100" @tap="selectScore(9)" backgroundColor="orange" />

        <Button text="Gå vidare" width="100%" @tap="saveScore" />

        <TextField v-model="currentHole" width="33%" height="100" backgroundColor="grey" />
        <TextField v-model="currentScoreId" width="33%" height="100" backgroundColor="grey" />
        <TextField v-model="selectedScore" width="33%" height="100" backgroundColor="grey" />
        <TextField v-model="userId" width="100%" height="100" backgroundColor="grey" />
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
const http = require("http");
import game from '../components/Game';

export default {
  data () {
    return {
      selectedScore: 0,
      currentHole: 0,
      currentScoreId: 0,
      userId: "",
      gameId: 0,
      token: ''
    };
  },
  mounted () {
    this.currentHole = this.$store.getters.getCurrentHole;
    this.gameId = this.$store.getters.getGameId;
    this.selectedScore = this.$store.getters.getCurrentScore;
    this.userId = this.$store.getters.getUserId;
    this.currentScoreId = this.$store.getters.getCurrentScoreId;
    this.token = this.$store.getters.getToken;
  },
  methods: {
    decrementHole () {
      this.$store.commit("decrementHole");
      this.$navigateTo(game, {
        transition: {
          name: "slideRight",
          duration: 200,
          curve: "linear"
        }
      });
    },
    incrementHole () {
      this.$store.commit("incrementHole");
      this.$navigateTo(game, {
        transition: {
          name: "slideLeft",
          duration: 200,
          curve: "linear"
        }
      });
    },
    selectScore (score) {
      this.selectedScore = score;
    },
    saveScore () {
      this.loading = true;
      var url = `${this.$url()}api/Game/AddScore`;
      if (this.selectScore === 0) {
        this.$store.commit("incrementHole");
        this.$navigateTo(game, {
          transition: {
            name: "slideLeft",
            duration: 200,
            curve: "linear"
          }
        });
      }
      http.request({
        url: url,
        method: "POST",
        headers: { "Content-Type": "application/json", "Auth": this.token, 'Authorization': 'Bearer ' + this.token },
        content: JSON.stringify({
          'gameId': this.gameId,
          'userId': this.userId,
          'result': this.selectedScore,
          'scoreId': this.currentScoreId,
          'hole': this.currentHole
        })
      }).then(response => {
        var result = response.content.toJSON();
        this.$store.commit("setGame", result);
        this.$store.commit("incrementHole");
        this.$navigateTo(game, {
          transition: {
            name: "slideLeft",
            duration: 200,
            curve: "linear"
          }
        });
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
