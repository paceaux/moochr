<template>
        <form class="form form--authenticate">
            <h2 class="form__title">Sign in to Moochr</h2>
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
                        class="form__fieldInput form__fieldInput--email"
                        type="text"
                        v-model="password"
                        required
                    />
                    <output class="form__fieldInfo"></output>
                </label>
                <output class="form__fieldsetInfo" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error" class="errorText">{{ error }}</p>
                </output>
            </fieldset>
            <fieldset class="form__fieldset form__fieldset--controls">
                <button class="form__submit" @submit="signIn">Log In</button>
            </fieldset>
        </form>
</template>
<script>
import axios from 'axios';
import Content from '../helpers/contenthelper'; // get webpack errors with import {ErrorMessages} from '../helpers/labelhelper';
const { ErrorMessages } = Content;

export default {
    components: {},
    data() {
        return {
            email: null,
            password: null,
            errors: [],
        };
    },
    props: {},
    computed: {

    },
    methods: {
        submitUserData() {
            const email = this.email;
            const password = this.password;
            this.$store.dispatch('login', { email, password });
        },
        resetFormData() {
            this.email = null;
            this.password = null;
            this.errors.length = 0;
        },
        validateForm() {
            this.errors.length = 0;
            if (!this.email) this.errors.push(ErrorMessages.noEmail);
            if (!this.password) this.errors.push(ErrorMessages.noPassword);
        },
        signIn(e) {
            e.preventDefault();
            this.validateForm();
            this.submitUserData();
        }
    }
}
</script>
