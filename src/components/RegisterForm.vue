<template>
<form class="form form--authenticate">
            <h2 class="form__title">Register with Moochr</h2>
            <fieldset class="form__fieldset form__fieldset--credentials">
                <label class="form__field">
                    <span class="form__fieldLabel">Email</span>
                    <input
                        class="form__fieldInput form__fieldInput--email"
                        type="email"
                        v-model="email"
                        required
                    />
                    <output class="form__fieldInfo"></output>
                </label>
                <label class="form__field">
                    <span class="form__fieldLabel">Password</span>
                    <input
                        class="form__fieldInput form__fieldInput--password"
                        type="password"
                        v-model="password"
                        required
                    />
                    <output class="form__fieldInfo"></output>
                </label>
                    <output class="form__fieldInfo"></output>
                <output class="form__fieldsetInfo" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error" class="errorText">{{ error }}</p>
                </output>
            </fieldset>
            <fieldset class="form__fieldset form__fieldset--controls">
                <button class="form__submit" @click="register">Register</button>
            </fieldset>
        </form>
</template>
<script>
import axios from 'axios';
import Content from '../helpers/contenthelper';
import zxcvbn from 'zxcvbn';
import PasswordField from './PasswordField.vue';

const { ErrorMessages } = Content;

export default {
    components: {
        PasswordField,
    },
    data() {
        return {
            email: null,
            password: '',
            errors: [],
        };
    },
    props: {},
    computed: {

    },
    methods: {
        onPasswordUpdate(password) {
            this.password = password;
        },
        submitUserData() {
            const email = this.email;
            const password = this.password;
            const newUser = { email, password };

            this.$store.dispatch('register', newUser);
        },
        resetFormData() {
            this.email = null;
            this.password = '';
            this.errors.length = 0;
        },
        validateForm() {
            this.errors.length = 0;
            if (!this.email) this.errors.push(ErrorMessages.noEmail);
            if (this.password.length < 1) this.errors.push(ErrorMessages.noPassword);
            console.log(this.password);
        },
        register(evt) {
            evt.preventDefault();
            this.validateForm();
            this.submitUserData();
        }
    }
}
</script>