<template>
  <table>
      <thead>
          <tr>
              <th id="id">id</th>
              <th id="firstname">firstname</th>
              <th id="lastname">lastname</th>
              <th id="email">email</th>
              <th id="phone">phone</th>
              <th id="city">city</th>
              <td></td>
          </tr>
      </thead>
      <tbody v-f="state.users.length">
          <UserRowItem v-for="user in state.users" 
          :key="user.id"
          :user="user" 
          @remove="removeItem" 
          @update="updateItem" >

          </UserRowItem>
      </tbody>
  </table>
</template>
<script>
    import Store from '../store.js';
    import UserRowItem from './UserRowItem.vue';

    export default {
        components: {
            UserRowItem
        },
        data () {
            return Store;
        },
        methods: {
            removeItem(id) {
                this.deleteUser(id);
            },
            updateItem(user) {
                this.updateUser(user);
                console.log(this.state.users);
            }
        }
    }
</script>