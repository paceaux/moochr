<template>
    <tr class="userTable__userRow">
        <td class="userTable__cell" headers="id id">{{user.id}}</td>
        <td class="userTable__cell" headers="firstname name">
            <input :disabled="!isEditable" v-model="user.firstname" type="text"/>
        </td>
        <td class="userTable__cell" headers="lastname name">
            <input :disabled="!isEditable" v-model="user.lastname" type="text" />
        </td>
        <td class="userTable__cell" headers="email contact">
            <input :disabled="!isEditable" v-model="user.email" type="email"/>
        </td>
        <td class="userTable__cell" headers="phone contact">
            <input :disabled="!isEditable" v-model="user.phone" type="tel"/>
        </td>
        <td class="userTable__cell" headers="street1 address">
            <input :disabled="!isEditable" v-model="user.street1" type="text"/>
        </td>
        <td class="userTable__cell" headers="street2 address">
            <input :disabled="!isEditable" v-model="user.street2" type="text"/>
        </td>
        <td class="userTable__cell" headers="zip address">
            <input :disabled="!isEditable" v-model="user.zip" type="text"/>
        </td>
        <td class="userTable__cell" headers="city address">
            <input :disabled="!isEditable" v-model="user.city" type="text"/>
        </td>
        <td class="userTable__cell" headers="state address">
            <input :disabled="!isEditable" v-model="user.state" type="text"/>
        </td>
        <td class="userTable__cell" headers="country address">
            <input :disabled="!isEditable" v-model="user.country" type="text"/>
        </td>
        <td class="userTable__cell">
            <button v-on:click="toggleEdit">edit</button>
            <button v-show="isEditable" @click="updateContent()">save</button>
            <button @click="$emit('remove',user.id)">Delete</button>
        </td>
    </tr>
</template>
<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        isEditable: false
    },
    methods: {
        updateContent(evt) {
            //this.$emit('update', this.user);
            console.log(this.$store.state.users);
            this.isEditable = !this.isEditable;
        },
        toggleEdit() {
            this.isEditable = !this.isEditable;
        }
    }
}
</script>