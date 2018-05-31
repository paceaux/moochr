<template>
    <section class="users">
    <UserAdd></UserAdd>
  <table class="table table--userTable">
      <thead class="table__head">
          <tr class="table__headingHeaderRow table__headingHeaderRow--columnGroups">
              <th class="table__headingHeader" id="id" rowspan="2">id</th>
              <th class="table__headingHeader" id="name" colspan="2" v-on:dblclick="collapseColumn($event)">Name</th>
              <th class="table__headingHeader" id="contact" colspan="2">Contact</th>
              <th class="table__headingHeader" id="address" colspan="6">Address </th>
              <td class="table__headingHeader table__headingHeader--controls" rowspan="2"></td>
          </tr>
          <tr class="table__headingHeaderRow">
              <th class="table__heading" id="firstname">firstname</th>
              <th class="table__heading" id="lastname">lastname</th>
              <th class="table__heading" id="email">email</th>
              <th class="table__heading" id="phone">phone</th>
              <th class="table__heading" id="street1">street1</th>
              <th class="table__heading" id="street2">street2</th>
              <th class="table__heading" id="zip">zip</th>
              <th class="table__heading" id="city">city</th>
              <th class="table__heading" id="state">state</th>
              <th class="table__heading" id="country">country</th>
          </tr>
      </thead>
      <tbody class="table__body" v-if="users.length">
          <UserRowItem v-for="user in users" 
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
// import Store from '../store.js';
import UserRowItem from './UserRowItem.vue';
import UserAdd from './UserAdd.vue';

export default {
    components: {
        UserRowItem,
        UserAdd
    },
    computed: {
        users() {
            return this.$store.state.users.users;
        }
    },
    methods: {
        removeItem(id) {
            this.$store.dispatch('deleteUser',id);
        },
        updateItem(user) {
            this.$store.dispatch('updateUser',user);
        },
        collapseColumn(evt) {
            const headers = evt.target.getAttribute('id');
        }
    }
}
</script>