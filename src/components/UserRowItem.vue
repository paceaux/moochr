<template>
    <tr class="table__row">
        <td class="table__cell" headers="id id">{{user.id}}</td>
        <td class="table__cell" headers="firstname name">
            <input :disabled="!isEditable" v-model="user.firstname" type="text"/>
        </td>
        <td class="table__cell" headers="lastname name">
            <input :disabled="!isEditable" v-model="user.lastname" type="text" />
        </td>
        <td class="table__cell" headers="password">
            <PasswordField v-bind:password="user.password" v-bind:isEditable="isEditable"></PasswordField>
        </td>
        <td class="table__cell" headers="email contact">
            <input :disabled="!isEditable" v-model="user.email" type="email"/>
        </td>
        <td class="table__cell" headers="phone contact">
            <input :disabled="!isEditable" v-model="user.phone" type="tel"/>
        </td>
        <td class="table__cell" headers="street1 address">
            <input :disabled="!isEditable" v-model="user.street1" type="text"/>
        </td>
        <td class="table__cell" headers="street2 address">
            <input :disabled="!isEditable" v-model="user.street2" type="text"/>
        </td>
        <td class="table__cell" headers="zip address">
            <input :disabled="!isEditable" v-model="user.zip" type="text"/>
        </td>
        <td class="table__cell" headers="city address">
            <input :disabled="!isEditable" v-model="user.city" type="text"/>
        </td>
        <td class="table__cell" headers="state address">
            <input :disabled="!isEditable" v-model="user.state" type="text"/>
        </td>
        <td class="table__cell" headers="country address">
            <input :disabled="!isEditable" v-model="user.country" type="text"/>
        </td>
        <td class="table__cell">
            <button v-on:click="toggleEdit">edit</button>
            <button v-show="isEditable" @click="updateContent()">save</button>
            <button @click="$emit('remove',user.id)">Delete</button>
        </td>
    </tr>
</template>
<script>
const isEditable = false;
import PasswordField from './PasswordField.vue';
export default {
    components: {
        PasswordField
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isEditable
        };
    },
    methods: {
        updateContent(evt) {
            this.$store.dispatch('updateUser', this.user);
            this.isEditable = !this.isEditable;
        },
        toggleEdit() {
            this.isEditable = !this.isEditable;
        }
    }
}
</script>