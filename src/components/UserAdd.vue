<template>
      <form class="userCreate">
        <fieldset class="userCreate__fieldset userCreate__fieldset--name">
            <legend class="userCreate__fieldsetLegend">name</legend>
            <label for="firstname" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">firstname</span>
                <input v-model="user.firstname" type="text"/>
            </label>

            <label for="lastname" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">lastname</span>
                <input v-model="user.lastname" type="text" />
            </label>
        </fieldset>
        <fieldset class="userCreate__fieldset userCreate__fieldset--contact">
            <legend class="userCreate__fieldsetLegend">contact</legend>
            <label for="email" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">email</span>
                <input v-model="user.email" type="email"/>
            </label>
            <label for="phone" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">phone</span>
                <input v-model="user.phone" type="tel"/>
            </label>
        </fieldset>
        <fieldset class="userCreate__fieldset userCreate__fieldset--address" >
            <legend class="userCreate__fieldsetLegend">address</legend>
            <label for="street1" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">street1</span>
                <input v-model="user.street1" type="text"/>
            </label>
            <label for="username" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">street2</span>
                <input v-model="user.street2" type="text"/>
            </label>
            <label for="username" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">zip</span>
                <input v-model="user.zip" type="text"/>
            </label>
            <label for="username" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">city</span>
                <input v-model="user.city" type="text"/>
            </label>
            <label for="username" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">state</span>
                <input v-model="user.state" type="text"/>
            </label>
            <label for="username" class="userCreate__field"> 
                <span class="userCreate__fieldLabel">country</span>
                <input v-model="user.country" type="text"/>
            </label>
        </fieldset>
        <fieldset class="userCreate__fieldset userCreate__fieldset--controls">
            <button class="userCreate__submit" v-on:click="addContent(user)">save</button>
        </fieldset>
    </form>
</template>
<script>
    import Store from '../store.js';

export default {
  data () {
      return {
          Store,
          user: {
              firstname: '',
              lastname: '',
              email: '',
              phone: '',
              street1: '',
              street2: '',
              city: '',
              zip: '',
              state: '',
              country: ''


          }
      };
  },
  props : {

  },
  methods: {
      addContent() {
        this.Store.createUser(this.user);
        this.$router.push('/userList');
      }
  }
}
</script>
