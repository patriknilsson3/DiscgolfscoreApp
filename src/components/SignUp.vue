<template>
  <Page class="page">
    <ActionBar title="Registrera" class="action-bar"> 
      <NavigationButton text="Go back" ios.systemIcon="2" android.systemIcon="ic_menu_back" @tap="goBack" />
    </ActionBar>
    <StackLayout class="home-panel">
      <TextField v-model="email" hint="Email" />
      <TextField secure="true" v-model="password" hint="Lösenord" />
      <TextField v-model="firstname" hint="Förnamn" />
      <TextField v-model="lastname" hint="Efternamn" />
      <Button text="Registrera" @tap="signUp()" />
      <ActivityIndicator :busy="loading" class="activity-indicator" />
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios";
import home from '../components/Home';
export default {
  data () {
    return {
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      loading: false
    };
  },
  methods: {
    goBack () {
      this.$navigateTo(home)
    },
    signUp () {
      console.log('signUp clicked');
      this.loading = true;
      axios.post(`${this.$url()}api/Account/Register`,
        { 
          'password': this.password,
          'email': this.email.toLowerCase(),
          'firstname': this.firstname,
          'lastname': this.lastname
        }).then(result => {
          console.log('Afrer signup result: ', result);
          this.$navigateTo(home)
        }, error => {
          console.log(error);
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

.register-button {
  width: 130;
  height: 50;
}

TextField {
  placeholder-color: #000;
}
</style>
