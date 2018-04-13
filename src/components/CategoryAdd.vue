<template>
      <form class="categoryCreate">
        <fieldset class="categoryCreate__fieldset categoryCreate__fieldset--name">
            <legend class="categoryCreate__fieldsetLegend">name</legend>
            <label for="firstname" class="categoryCreate__field"> 
                <span class="categoryCreate__fieldLabel">name</span>
                <input v-model="category.name" type="text"/>
            </label>

            <label for="lastname" class="categoryCreate__field"> 
                <span class="categoryCreate__fieldLabel">slug</span>
                <input v-model="category.slug" type="text" />
            </label>
        </fieldset>
        <fieldset class="categoryCreate__fieldset categoryCreate__fieldset--contact">
            <label for="phone" class="categoryCreate__field"> 
                <span class="categoryCreate__fieldLabel">parent</span>
                <select v-model="category.parent"> 
                    <option>Pick a Parent</option>
                    <option v-for="category in categories" 
                    :key="category.id"
                    :category="category"
                    :value="category.id">{{category.name}}</option>
                </select>
            </label>
        </fieldset>
        <fieldset class="categoryCreate__fieldset categoryCreate__fieldset--controls">
            <button class="categoryCreate__submit" v-on:click="addContent(category)">save</button>
        </fieldset>
    </form>
</template>
<script>

export default {
    computed: {
        categories() {
            return this.$store.state.categories;
        }
    },
    data () {
        return {
            category: {
                name: '',
                slug: '',
                parent: ''
            }
        };
    },
    props : {

    },
    methods: {
        addContent() {
            this.$store.dispatch('addCategory',this.category);
            this.category = {
                name: '',
                slug: '',
                parent: ''
            };
            this.$router.push('/categoryList');
        }
    }
}
</script>
