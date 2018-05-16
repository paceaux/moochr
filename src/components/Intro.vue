<template>
  <header class="appHeader">
      <nav class="appHeader__adminNav nav nav--vertical">
        <h2 class="nav__title" @click="isNavVisible = !isNavVisible">Admin</h2>
        <div class="nav__links" v-show="isNavVisible">
          <router-link class="nav__link" to="/admin/addUser">Add User</router-link>
          <router-link class="nav__link" to="/admin/userList">User Table</router-link>
          <router-link class="nav__link" to="/admin/addCategory">Add a Category</router-link>
          <router-link class="nav__link" to="/admin/categoryList">Categories</router-link>
          <router-link class="nav__link" to="/admin/addItem">Add an Item</router-link>        
          <router-link class="nav__link" to="/admin/itemList">List of Items</router-link>
        </div>
      </nav>
      <nav class="appHeader__mainNav nav nav--horizontal">
        <router-link class="nav__link" to="/users">Users</router-link>
        <router-link class="nav__link" to="/items">Items</router-link>
      </nav>
  </header>
</template>
<script>
export default {
    props: {

    },
    data() {
      return {
        isNavVisible: false
      };
    },
    computed: {

    }
}
</script>
