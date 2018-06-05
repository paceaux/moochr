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
            <PasswordField v-bind:password="user.password" @passwordUpdate="onPasswordUpdate"></PasswordField>
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
import PasswordField from './PasswordField.vue';

export default {

  components: {
      PasswordField,
  },
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

      };
  },
  props : {

  },
  computed: {

  },
  methods: {
      onPasswordUpdate(password) {
          this.user.password = password;
      },
      addContent() {
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
       this.$router.push('/userList');
      }
  }
}
</script>
