<template>
    <section class="categorys">
        <categoryAdd></categoryAdd>
        <table class="categoryTable">
            <thead class="categoryTable__head">
                <tr class="categoryTable__headingHeaderRow">
                    <th class="categoryTable__heading" id="id">id</th>
                    <th class="categoryTable__heading" id="name">name</th>
                    <th class="categoryTable__heading" id="slug">slug</th>
                    <th class="categoryTable__heading" id="parent">parent</th>
                </tr>
            </thead>
            <tbody class="categoryTable__body" v-if="categories.length">
                <categoryRowItem v-for="category in categories" 
                :key="category.id"
                :category="category" 
                @remove="removeItem" 
                @update="updateItem" >

                </categoryRowItem>
            </tbody>
        </table>
  </section>
</template>
<script>
import CategoryRowItem from './CategoryRowItem.vue';
import CategoryAdd from './CategoryAdd.vue';

export default {
    components: {
        CategoryRowItem,
        CategoryAdd
    },
    computed: {
        categories() {
            return this.$store.state.categories;
        }
    },
    data () {
        
    },
    methods: {
        removeItem(id) {
            this.deleteCategory(id);
        },
        updateItem(category) {
            this.updateCategory(category);
            console.log(this.state.categories);
        }
    }
}
</script>