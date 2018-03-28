<template>
    <tr>
        <td headers="id id">{{user.id}}</td>
        <td headers="firstname name"><input :disabled="!isEditable" v-model="user.firstname"/></td>
        <td headers="lastname name"><input :disabled="!isEditable" v-model="user.lastname"/>
            </td>
        <td headers="email contact"><input :disabled="!isEditable" v-model="user.email"/></td>
        <td headers="phone contact"><input :disabled="!isEditable" v-model="user.phone"/></td>
        <td headers="street1 address"><input :disabled="!isEditable" v-model="user.street1"/></td>
        <td headers="street2 address"><input :disabled="!isEditable" v-model="user.street2"/></td>
        <td headers="city address"><input :disabled="!isEditable" v-model="user.city"/></td>
        <td headers="state address"><input :disabled="!isEditable" v-model="user.state"/></td>
        <td headers="country address"><input :disabled="!isEditable" v-model="user.country"/></td>
        <td>
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
            this.$emit('update', this.user);
            this.isEditable = !this.isEditable;
        },
        toggleEdit() {
            this.isEditable = !this.isEditable;
        }
    }
}
</script>