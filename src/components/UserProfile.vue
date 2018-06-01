<template>
  <section class="UserProfile" v-if="user">
      <UserCard :user="user" :hideProfileLink="true"></UserCard>
      <ItemCards :filteredItems="UsersItems" :hideOwner="true"></ItemCards>
  </section>
</template>
<script>
import UserCard from './UserCard.vue';
import ItemCards from './ItemCards.vue';

export default {
    components: {
        UserCard,
        ItemCards
    },
    props: {

    },
    data() {
        return {

        };
    },
    computed: {
        user() {
            let user;
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id;
                user = this.$store.getters.userById(id);
            }

            return user;
        },
        UsersItems () {
            return this.$store.state.items.items.filter(item=> item.owner == this.user.id);
        }
    }
}
</script>