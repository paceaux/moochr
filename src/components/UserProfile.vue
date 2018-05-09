<template>
  <section class="UserProfile" v-if="user">
      <UserCard :user="user"></UserCard>
  </section>
</template>
<script>
import UserCard from './UserCard.vue';

export default {
    components: {
        UserCard
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
        }
    }
}
</script>