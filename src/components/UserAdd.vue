<template>
      <form class="form form--userCreate">
        <fieldset class="form__fieldset form__fieldset--name">
            <legend class="form__fieldsetLegend">name</legend>
            <label for="firstname" class="form__field"> 
                <span class="form__fieldLabel">firstname</span>
                <input v-model="user.firstname" type="text"/>
            </label>

            <label for="lastname" class="form__field"> 
                <span class="form__fieldLabel">lastname</span>
                <input v-model="user.lastname" type="text" />
            </label>
            <label for="password" class="form__field">
                <span class="form__fieldLabel">password</span>
                <input v-model="user.password" type="password" required v-on:keyup="calcPwdStrength()" v-on:blur="isShowingConfirm = true"/>
                <meter min="0" max="4" low="2" high="3" v-bind:value="passwordStrength"></meter>
            </label>
            <label for="password" class="form__field" v-show="isShowingConfirm">
                <span class="form__fieldLabel">confirm password</span>
                <input v-model="passwordConfirm" type="password" required v-on:keyup="validatePasswords()" />
                <span v-show="!hasPasswordMatch">Passwords do not match!</span>
                <span v-show="hasPasswordMatch">Passwords match!</span>

            </label>
        </fieldset>
        <fieldset class="form__fieldset form__fieldset--contact">
            <legend class="form__fieldsetLegend">contact</legend>
            <label for="email" class="form__field">
                <span class="form__fieldLabel">email</span>
                <input v-model="user.email" type="email"/>
            </label>
            <label for="phone" class="form__field"> 
                <span class="form__fieldLabel">phone</span>
                <input v-model="user.phone" type="tel"/>
            </label>
        </fieldset>
        <fieldset class="form__fieldset form__fieldset--address" >
            <legend class="form__fieldsetLegend">address</legend>
            <label for="street1" class="form__field"> 
                <span class="form__fieldLabel">street1</span>
                <input v-model="user.street1" type="text"/>
            </label>
            <label for="username" class="form__field"> 
                <span class="form__fieldLabel">street2</span>
                <input v-model="user.street2" type="text"/>
            </label>
            <label for="username" class="form__field"> 
                <span class="form__fieldLabel">zip</span>
                <input v-model="user.zip" type="text"/>
            </label>
            <label for="username" class="form__field"> 
                <span class="form__fieldLabel">city</span>
                <input v-model="user.city" type="text"/>
            </label>
            <label for="username" class="form__field"> 
                <span class="form__fieldLabel">state</span>
                <input v-model="user.state" type="text"/>
            </label>
            <label for="username" class="form__field"> 
                <span class="form__fieldLabel">country</span>
                <input v-model="user.country" type="text"/>
            </label>
        </fieldset>
        <fieldset class="form__fieldset form__fieldset--controls">
            <button class="form__submit" v-on:click="addContent(user)">save</button>
        </fieldset>
    </form>
</template>
<script>
import zxcvbn from 'zxcvbn';
export default {
  data () {
      return {
          user: {
              firstname: '',
              lastname: '',
              password: '',
              email: '',
              phone: '',
              street1: '',
              street2: '',
              city: '',
              zip: '',
              state: '',
              country: ''
          },
          passwordConfirm: '',
          isShowingConfirm: false,
          hasPasswordMatch: false,
          passwordStrength: 0,
      };
  },
  props : {

  },
  computed: {
      hasValidPassword() {
          return (
              this.hasPasswordMatch &&
              this.passwordStrength > 2);
      }
  },
  methods: {
      validatePasswords() {
          this.hasPasswordMatch = (this.user.password === this.passwordConfirm);
      },
      calcPwdStrength() {
         const strength =  zxcvbn(this.user.password);
         this.passwordStrength = strength.score;
      },
      addContent() {
        if (!this.hasValidPassword) return;
        this.$store.dispatch('addUser', this.user);
        this.user = {
              firstname: '',
              lastname: '',
              password: '',
              email: '',
              phone: '',
              street1: '',
              street2: '',
              city: '',
              zip: '',
              state: '',
              country: ''
        };
       this.passwordConfirm = '';
       this.isShowingConfirm = false;
       this.passwordStrength = 0;
       this.$router.push('/userList');
      }
  }
}
</script>
