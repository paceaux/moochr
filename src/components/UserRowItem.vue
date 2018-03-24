<template>
    <tr>
        <td headers="id">{{user.id}}</td>
        <td headers="firstname"><input :disabled="!isEditable" :value="user.firstname"/></td>
        <td headers="lastname">{{user.lastname}}</td>
        <td headers="email">{{user.email}}</td>
        <td headers="phone">{{user.phone}}</td>
        <td headers="city">{{user.city}}</td>
        <td>
            <button v-on:click="toggleEdit">edit</button>
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
            this.$emit('update', this.user);
        },
        toggleEdit() {
            this.isEditable = !this.isEditable;
        }
    }
}
</script>