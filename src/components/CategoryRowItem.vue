<template>
    <tr class="categoryTable__categoryRow">
        <td class="categoryTable__cell" headers="id">{{category.id}}</td>
        <td class="categoryTable__cell" headers="name">
            <input :disabled="!isEditable" v-model="category.name" type="text"/>
        </td>
        <td class="categoryTable__cell" headers="slug">
            <input :disabled="!isEditable" v-model="category.slug" type="text" />
        </td>
        <td class="categoryTable__cell" headers="parent">
                <span v-show="!isEditable">{{parentName}}</span>
                <select v-show="isEditable" v-model="category.parent">
                    <option>Pick a Parent</option>
                    <option v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    :value="category.id">{{category.name}}</option>
                </select>
        </td>
        <td class="categoryTable__cell">
            <button v-on:click="toggleEdit">edit</button>
            <button v-show="isEditable" @click="updateContent()">save</button>
            <button @click="$emit('remove',category.id)">Delete</button>
        </td>
    </tr>
</template>
<script>
const isEditable = false;
export default {
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isEditable
        };
    },
    computed: {
        categories() {
            return this.$store.state.categories;
        },
        parentName() {
            const id = this.category.parent || '';
            const parent = this.categories.find(cat => {
                return cat.id == id;
            });

            return parent ? parent.name : '';
        }
    },
    methods: {
        updateContent(evt) {
            this.$store.dispatch('updateCategory', this.category);
            this.isEditable = !this.isEditable;
        },
        toggleEdit() {
            this.isEditable = !this.isEditable;
        }
    }
}
</script>