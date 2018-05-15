<template>
    <section class="items">
        <ItemAdd></ItemAdd>
        <table class="table table--itemTable">
            <thead class="table__head">
                <tr class="table__headingHeaderRow">
                    <th class="table__heading" id="id">id</th>
                    <th class="table__heading" id="name">Name</th>
                    <th class="table__heading" id="image">Image</th>
                    <th class="table__heading" id="category">Category</th>
                    <th class="table__heading" id="is_loanable">Loanable?</th>
                    <th class="table__heading" id="owner">Owner</th>
                    <th class="table__heading" id="borrower">Borrower</th>
                    <th class="table__heading" id="model_number">Model</th>
                    <th class="table__heading" id="serial_number">Serial</th>
                    <th class="table__heading" id="time_due">Due By</th>
                    <th class="table__heading" id="time_loaned">Loaned</th>
                    <th class="table__heading" id="time_return">Returned On</th>
                    <th class="table__heading" id="value">Value</th>
                </tr>
            </thead>
            <tbody class="table__body" v-if="items.length">
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