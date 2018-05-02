<template>
    <section class="items">
        <ItemAdd></ItemAdd>
        <table class="itemTable">
            <thead class="itemTable__head">
                <tr class="itemTable__headingHeaderRow">
                    <th class="itemTable__heading" id="id">id</th>
                    <th class="itemTable__heading" id="name">name</th>
                    <th class="itemTable__heading" id="is_loanable">is_loanable</th>
                    <th class="itemTable__heading" id="owner">owner</th>
                    <th class="itemTable__heading" id="borrower">borrower</th>
                    <th class="itemTable__heading" id="image">image</th>
                    <th class="itemTable__heading" id="model_number">model_number</th>
                    <th class="itemTable__heading" id="serial_number">serial_number</th>
                    <th class="itemTable__heading" id="time_due">time_due</th>
                    <th class="itemTable__heading" id="time_loaned">time_loaned</th>
                    <th class="itemTable__heading" id="time_return">time_return</th>
                    <th class="itemTable__heading" id="value">serial_number</th>
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