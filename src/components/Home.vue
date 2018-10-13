<template>
  <Page class="page">
    <ActionBar title="Logga in" class="action-bar" />
    <StackLayout class="home-panel">
      <TextField v-model="email" hint="Email" />
      <TextField secure="true" v-model="password" hint="Lösenord" />
      <Button text="Logga in" @tap="logIn" />
      <ActivityIndicator :busy="loading" class="activity-indicator" />
      <Label class="register-label" @tap="register" text="Inte registrerad? Klicka här" />
    </StackLayout>
  </Page>
</template>

<script>

const http = require("http");
import axios from "axios";
import signUp from '../components/SignUp';
import modal from '../components/modal';
import createGame from '../components/CreateGame';

export default {
  data () {
    return {
      email: "patrik.nilsson@ezy.se",
      password: "1234567",
      loading: false
    };
  },
  methods: { 
    register () {
      // this.$showModal(modal);
      this.$navigateTo(signUp, {
        transition: {
            name: "slideLeft",
            duration: 400,
            curve: "linear"
        }
      })
    },
    logIn () {
      this.loading = true;
      var postData = "userName=" + encodeURIComponent(this.email.toLowerCase()) +
        "&password=" + encodeURIComponent(this.password) +
        "&grant_type=password";
      var url = `${this.$url()}token`;

      http.request({
        url: url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: postData
      }).then(response => {
        var result = response.content.toJSON();
        debugger;   
        this.$store.commit("setUser",JSON.parse(result.user));
        this.$store.commit("setToken", result.access_token);
        this.$navigateTo(createGame);
      }, function (e) {
        console.log("Error occurred " + e);
      });
    }
  }
};
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

.home-panel {
  margin: 40;
  margin-top: 30%;
}

.login-button {
  background: #f4b942;
  color: black;
}

.register-label {
  text-align: center;
  width: 100%;
}

TextField {
  placeholder-color: #000;
}
</style>
