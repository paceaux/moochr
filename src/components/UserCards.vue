<template>
    <section class="cardDeck">
        <h2>Moochers</h2>
        <UserCard v-for="user in users" :key="user.id" :user="user"></UserCard>
    </section>
</template>
<script>
import UserCard from './UserCard.vue';

export default {
    components: {
        UserCard
    },
    props: {},
    data() {
        return {
            users: this.$store.state.users
        };
    },
    computed: {

    },
    mounted() {
        console.log(this.users);
    }
}
</script>
