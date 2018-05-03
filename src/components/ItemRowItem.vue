<template>
    <tr class="itemTable__itemRow">
        <td class="itemTable__cell" headers="id">{{item.id}}</td>
        <td class="itemTable__cell" headers="name">
            <input :disabled="!isEditable" v-model="item.name" type="text"/>
        </td>
        <td class="itemTable__cell" headers="image">
            <img v-if="item.image" :src="imgUrl" class="itemTable__cell__imgPreview" alt="Picture of item"/>
        </td>
        <td class="itemTable__cell" headers="category">
            <p v-show="!isEditable" v-if="item.category">
                <span :key="val" v-for="(val, idx) in item.category">
                    {{categoryName(val)}}<span v-if="idx < item.category.length -1 ">,</span>
                </span>
            </p>
                <select v-show="isEditable" v-model="item.category" multiple>
                    <option>Pick a Category</option>
                    <option v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    :value="category.id">{{category.name}}</option>
                </select>
        </td>
        <td class="itemTable__cell" headers="is_loanable">
            <input :disabled="!isEditable" v-model="item.is_loanable" type="checkbox" />
        </td>
        <td class="itemTable__cell" headers="owner">
            <UserCard v-show="!isEditable" :user="getUserById(item.owner)" :hideAddress="true" :hideContact="true"></UserCard>
                <select v-show="isEditable" v-model="item.owner">
                    <option>Pick an owner</option>
                    <option v-for="owner in owners"
                    :key="owner.id"
                    :owner="owner"
                    :value="owner.id">{{userName(owner.id)}}</option>
                </select>
        </td>
        <td class="itemTable__cell" headers="borrower">
            <span v-if="item.borrower">
                <UserCard v-show="!isEditable" :user="getUserById(item.borrower)" :hideAddress="true" :hideContact="true"></UserCard>
            </span>
                <select v-show="isEditable" v-model="item.borrower">
                    <option value=null>Pick a borrower</option>
                    <option v-for="borrower in borrowers"
                    :key="borrower.id"
                    :borrower="borrower"
                    :value="borrower.id">{{userName(borrower.id)}}</option>
                </select>
        </td>
        <td class="itemTable__cell" headers="model_number">
            <input :disabled="!isEditable" v-model="item.model_number" type="text" />
        </td>
        <td class="itemTable__cell" headers="serial_number">
            <input :disabled="!isEditable" v-model="item.serial_number" type="text" />
        </td>
        <td class="itemTable__cell" headers="time_due">
            <input :disabled="!isEditable" v-model="item.time_due" :min="timeDueMin" type="date" />
        </td>
        <td class="itemTable__cell" headers="time_loaned">
            <input :disabled="!isEditable" v-model="item.time_loaned" :min="dateMin" type="date" />
        </td>
        <td class="itemTable__cell" headers="time_return">
            <input :disabled="!isEditable" v-model="item.time_return" :min="timeDueMin" type="date" />
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
import UserCard from './UserCard.vue';
const isEditable = false;
export default {
    components: {
        UserCard
    },
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

            if (this.item.owner) {

                borrowers = users.filter(user => {
                    return user.id != this.item.owner;
                });
            }
            return borrowers;
        },
        categories(){
            return this.$store.state.categories;
        },
        imgUrl() {
            console.log('this.item.image',this.item.image);
            return this.item.image;
        }
    },
    methods: {
        updateContent(evt) {
            this.$store.dispatch('updateItem', this.item);
            this.isEditable = !this.isEditable;
        },
        toggleEdit() {
            this.isEditable = !this.isEditable;
        },
        categoryName(id) {
            const category =  this.$store.state.categories.find(category => category.id == id);

            return category ? category.name : '';
        },
        getUserById(id) {
            if (!id) return '';
            
            return this.$store.state.users.find(user => user.id == id);
        },
        userName(id) {
            if (!id) return '';
            const user = this.$store.state.users.find(user => user.id == id);
            const first = user && user.firstname ? user.firstname : '';
            const last = user && user.lastname ? user.lastname : '';

            return `${first} ${last}`;

        }
    },
    mounted () {
        console.log(this.item.category);
    }
}
</script>