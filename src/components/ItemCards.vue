<template>
    <section class="cardDeck">
        <h2 class="cardDeck__title">Items</h2>
        <div class="cardDeck__list">
            <ItemCard v-for="item in items" :key="item.id" :item="item" :hideOwner="hideOwner"></ItemCard>
        </div>
    </section>
</template>
<script>
import ItemCard from './ItemCard.vue';

export default {
    components: {
        ItemCard
    },
    props: {
        filteredItems: {
            type: Array,
            required: false
        },
        hideOwner: {
            type: Boolean,
            required: false
        },
        hideCategory: {
            type: Boolean,
            required: false,
        },
        hideBorrower: {
            type: Boolean,
            required: false
        },
        hideValue: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            allItems: this.$store.state.items.items
        };
    },
    computed: {
        items() {
            return this.filteredItems || this.allItems;
        }
    },
    mounted() {
        console.log(this.items);
    }
}
</script>
