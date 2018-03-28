<template>
    <section class="users">
    <UserAdd></UserAdd>
  <table class="userTable">
      <thead class="userTable__head">
          <tr class="userTable__headingHeaderRow userTable__headingHeaderRow--columnGroups">
              <th class="userTable__headingHeader" id="id" rowspan="2">id</th>
              <th class="userTable__headingHeader" id="name" colspan="2" v-on:dblclick="collapseColumn($event)">Name</th>
              <th class="userTable__headingHeader" id="contact" colspan="2">Contact</th>
              <th class="userTable__headingHeader" id="address" colspan="5">Address </th>
              <td class="userTable__headingHeader userTable__headingHeader--controls" rowspan="2"></td>
          </tr>
          <tr class="userTable__headingHeaderRow">
              <th class="userTable__heading" id="firstname">firstname</th>
              <th class="userTable__heading" id="lastname">lastname</th>
              <th class="userTable__heading" id="email">email</th>
              <th class="userTable__heading" id="phone">phone</th>
              <th class="userTable__heading" id="street1">street1</th>
              <th class="userTable__heading" id="street2">street2</th>
              <th class="userTable__heading" id="zip">zip</th>
              <th class="userTable__heading" id="city">city</th>
              <th class="userTable__heading" id="state">state</th>
              <th class="userTable__heading" id="country">country</th>
          </tr>
      </thead>
      <tbody class="userTable__body" v-f="state.users.length">
          <UserRowItem v-for="user in state.users" 
          :key="user.id"
          :user="user" 
          @remove="removeItem" 
          @update="updateItem" >

          </UserRowItem>
      </tbody>
  </table>
  </section>
</template>
<script>
    import Store from '../store.js';
    import UserRowItem from './UserRowItem.vue';
    import UserAdd from './UserAdd.vue';

    export default {
        components: {
            UserRowItem,
            UserAdd
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
            },
            collapseColumn(evt) {
                const headers = evt.target.getAttribute('id');
            }
        }
    }
</script>