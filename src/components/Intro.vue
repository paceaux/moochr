<template>
  <header>
      <nav>
        <router-link to="/addUser">Add User</router-link>
        <router-link to="/userList">User Table</router-link>
        <router-link to="/addCategory">Add a Category</router-link>
        <router-link to="/categoryList">Categories</router-link>
        <router-link to="/addItem">Add an Item</router-link>        
        <router-link to="/itemList">List of Items</router-link>
      </nav>
  </header>
</template>

<script>
export default {
    props: {

    },
    computed: {

    }
}
</script>
