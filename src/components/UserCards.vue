<template>
    <section class="cardDeck">
        <h2 class="cardDeck__title">Moochers</h2>
        <div class="cardDeck__list">
            <UserCard v-for="user in users" :key="user.id" :user="user"></UserCard>
        </div>
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
    }
}
</script>
