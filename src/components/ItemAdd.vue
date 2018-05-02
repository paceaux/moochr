<template>
      <form class="itemCreate">
        <fieldset class="itemCreate__fieldset itemCreate__fieldset--itemInfo">
            <legend>About the Item </legend>
            <label for="name" class="itemCreate__field itemCreate__field--name">
                <span class="itemCreate__fieldLabel">name</span>
                <input id="name" v-model="item.name" type="text"/>
            </label>

            <label for="category" class="itemCreate__field itemCreate__field--category">
                <span class="itemCreate__fieldLabel">category</span>
                <select id="owner" v-model="item.category">
                    <option>Pick a Category</option>
                    <option v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    :value="category.id">{{category.name}}</option>
                </select>
            </label>

            <label for="model_number" class="itemCreate__field itemCreate__field--model">
                <span class="itemCreate__fieldLabel">Model Number</span>
                <input id="model_number" v-model="item.model_number" type="text" />
            </label>

            <label for="serial_number" class="itemCreate__field itemCreate__field--serial">
                <span class="itemCreate__fieldLabel">Serial Number</span>
                <input id="serial_number" v-model="item.serial_number" type="text" />
            </label>
        </fieldset>

        <fieldset class="itemCreate__fieldset itemCreate__fieldset--owner">
            <legend>Loaning the item </legend>
            <label for="owner" class="itemCreate__field">
                <span class="itemCreate__fieldLabel">owner</span>
                <select id="owner" v-model="item.owner">
                    <option>Pick an owner</option>
                    <option v-for="owner in owners"
                    :key="owner.id"
                    :owner="owner"
                    :value="owner.id">{{owner.firstname}}</option>
                </select>
            </label>

            <label for="is_loanable" class="itemCreate__field itemCreate__field--loanable">
                <span class="itemCreate__fieldLabel">isLoanable</span>
                <input id="is_loanable" v-model="item.is_loanable" type="checkbox" />
            </label>
        </fieldset>

        <fieldset class="itemCreate__fieldset itemCreate__fieldset--borrow">
            <legend>Borrowing the Item </legend>

            <label for="borrower" class="itemCreate__field">
                <span class="itemCreate__fieldLabel">Borrower</span>
                <select id="borrower" v-model="item.borrower">
                    <option>Pick an borrower</option>
                    <option v-for="borrower in borrowers"
                    :key="borrower.id"
                    :borrower="borrower"
                    :value="borrower.id">{{borrower.firstname}}</option>
                </select>
            </label>

            <label for="time_loaned" class="itemCreate__field">
                <span class="itemCreate__fieldLabel">When is it loaned</span>
                <input id="time_loaned" v-model="item.time_loaned" :min="dateMin" type="date" />
            </label>

            <label for="time_due" class="itemCreate__field">
                <span class="itemCreate__fieldLabel">When is it due back</span>
                <input for="time_due" v-model="item.time_due" :min="dateMin" type="date" />
            </label>

            <label for="time_return" class="itemCreate__field">
                <span class="itemCreate__fieldLabel">When did you get it back</span>
                <input id="time_return" v-model="item.time_return" :min="dateMin" type="date" />
            </label>
        </fieldset>
        <fieldset class="itemCreate__fieldset itemCreate__fieldset--controls">
            <button class="itemCreate__submit" v-on:click="addContent(item)">save</button>
        </fieldset>
    </form>
</template>
<script>

export default {
    computed: {
        items() {
            return this.$store.state.items;
        },
        owners() {
            return this.$store.state.users;
        },
        borrowers() {
            const users = this.$store.state.users;
            let borrowers = users;

            if (this.item.owner) {

                borrowers = users.filter(user => {
                    return user.id != this.item.owner;
                });
            }
            return borrowers;
        },
        categories() {
            return this.$store.state.categories;
        },
        dateMin() {
            const now = new Date();
            return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        },
        timeDueMin(){
            const time = new Date(this.item.time_loaned);
            return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        },
    },
    data () {
        return {
            item: {
                name: '',
                is_loanable: false,
                owner: null,
                borrower: null,
                image: '',
                model_number: '',
                serial_number: '',
                time_due: null,
                time_loaned: null,
                time_return: null,
                value: 0.0,

            }
        };
    },
    props : {

    },
    methods: {
        addContent() {
            this.$store.dispatch('addItem',this.item);
            this.item = {
            item: {
                name: '',
                is_loanable: false,
                owner: '',
                borrower: '',
                image: '',
                model_number: '',
                serial_number: '',
                time_due: null,
                time_loaned: null,
                time_return: null,
                value: 0.0,

            }
            };
            this.$router.push('/itemList');
        }
    }
}
</script>
