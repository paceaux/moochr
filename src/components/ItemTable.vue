<template>
    <section class="items">
        <ItemAdd></ItemAdd>
        <table class="itemTable">
            <thead class="itemTable__head">
                <tr class="itemTable__headingHeaderRow">
                    <th class="itemTable__heading" id="id">id</th>
                    <th class="itemTable__heading" id="name">Name</th>
                    <th class="itemTable__heading" id="category">Category</th>
                    <th class="itemTable__heading" id="is_loanable">Loanable?</th>
                    <th class="itemTable__heading" id="owner">Owner</th>
                    <th class="itemTable__heading" id="borrower">Borrower</th>
                    <th class="itemTable__heading" id="image">Image</th>
                    <th class="itemTable__heading" id="model_number">Model</th>
                    <th class="itemTable__heading" id="serial_number">Serial</th>
                    <th class="itemTable__heading" id="time_due">Due By</th>
                    <th class="itemTable__heading" id="time_loaned">Loaned</th>
                    <th class="itemTable__heading" id="time_return">Returned On</th>
                    <th class="itemTable__heading" id="value">Value</th>
                </tr>
            </thead>
            <tbody class="itemTable__body" v-if="items.length">
                <ItemRowItem v-for="item in items"
                :key="item.id"
                :item="item"
                @remove="removeItem"
                @update="updateItem" >

                </ItemRowItem>
            </tbody>
        </table>
  </section>
</template>
<script>
import ItemRowItem from './ItemRowItem.vue';
import ItemAdd from './ItemAdd.vue';

export default {
    components: {
        ItemRowItem,
         ItemAdd
    },
    computed: {
        items() {
            return this.$store.state.items;
        }
    },
    methods: {
        removeItem(id) {
            this.$store.dispatch('deleteItem', id);
        },
        updateItem(item) {
            this.$store.dispatch('updateItem',item);
        }
    }
}
</script>