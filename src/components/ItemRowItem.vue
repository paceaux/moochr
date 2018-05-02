<template>
    <tr class="itemTable__itemRow">
        <td class="itemTable__cell" headers="id">{{item.id}}</td>
        <td class="itemTable__cell" headers="name">
            <input :disabled="!isEditable" v-model="item.name" type="text"/>
        </td>
        <td class="itemTable__cell" headers="is_loanable">
            <input :disabled="!isEditable" v-model="item.is_loanable" type="checkbox" />
        </td>
        <td class="itemTable__cell" headers="owner">
            <span v-show="!isEditable">{{item.owner}}</span>
                <select v-show="isEditable" v-model="item.owner">
                    <option>Pick a Parent</option>
                    <option v-for="owner in owners"
                    :key="owner.id"
                    :owner="owner"
                    :value="owner.id">{{owner.firstname}}</option>
                </select>
        </td>
        <td class="itemTable__cell" headers="borrower">
        </td>
        <td class="itemTable__cell" headers="image">
        </td>
        <td class="itemTable__cell" headers="model_number">
            <input :disabled="!isEditable" v-model="item.model_number" type="text" />
        </td>
        <td class="itemTable__cell" headers="serial_number">
            <input :disabled="!isEditable" v-model="item.serial_number" type="text" />
        </td>
        <td class="itemTable__cell" headers="time_due">
            <input :disabled="!isEditable" v-model="item.time_due" :min="timeDueMin" type="datetime-local" />
        </td>
        <td class="itemTable__cell" headers="time_loaned">
            <input :disabled="!isEditable" v-model="item.time_loaned" :min="dateMin" type="datetime-local" />
        </td>
        <td class="itemTable__cell" headers="time_return">
            <input :disabled="!isEditable" v-model="item.time_return" :min="timeDueMin" type="datetime-local" />
        </td>
        <td class="itemTable__cell" headers="value">
            <input :disabled="!isEditable" v-model="item.value" type="text" />
        </td>
        <td class="itemTable__cell">
            <button v-on:click="toggleEdit">edit</button>
            <button v-show="isEditable" @click="updateContent()">save</button>
            <button @click="$emit('remove',item.id)">Delete</button>
        </td>
    </tr>
</template>
<script>
const isEditable = false;
export default {
    props: {
        item: {
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
        dateMin() {
            const now = new Date();
            return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        },
        timeDueMin(){
            const time = new Date(this.time_loaned);
            return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        },
        items() {
            return this.$store.state.items;
        },
        owners() {
            return this.$store.state.users;
        },
        borrowers() {
            const users = this.$store.state.users;
            let borrowers = users;
            if (this.owner) {
                borrowers = users.filter(user => {
                    user.id != this.owner.id;
                });
            }
            return borrowers;
        },

    },
    methods: {
        updateContent(evt) {
            this.$store.dispatch('updateItem', this.item);
            this.isEditable = !this.isEditable;
        },
        toggleEdit() {
            this.isEditable = !this.isEditable;
        }
    }
}
</script>