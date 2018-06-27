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
                        @focus="resetErrors"
                        required
                    />
                    <output class="form__fieldInfo"></output>
                </label>
                <label class="form__field">
                    <span class="form__fieldLabel">Password</span>
                    <input
                        class="form__fieldInput form__fieldInput--email"
                        type="password"
                        v-model="password"
                        @focus="resetErrors"
                        required
                    />
                    <output class="form__fieldInfo"></output>
                </label>
                <output class="form__fieldsetInfo" v-if="errors.length > 0">
                    <p v-for="error in errors" v-bind:key="error" class="errorText">{{ error }}</p>
                </output>
            </fieldset>
            <fieldset class="form__fieldset form__fieldset--controls">
                <button class="form__submit" @click="signIn">Log In</button>
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
            if (this.errors.length) return;
            const userData = {email: this.email, password: this.password};
            //SEND DATA
            axios
                .post('/api/v1/auth/login', userData)
                .then(res => {
                    console.log('successful posting');
                    console.log(res);
                })
                .catch(err => {

                });

        },
        resetFormData() {
            this.email = null;
            this.password = null;
        },
        resetErrors() {
            this.errors.length = 0;
        },
        validateEmail() {
            const email = this.email;

            return new Promise(function(resolve, reject) {
                axios.post('/api/v1/auth/user', {email})
                .then(res => {
                    const isGoodRes = res.status == 200;
                    if (!isGoodRes) reject();

                    if (res.data && email in res.data) {
                        resolve(true);
                    }

                    if (res.data && res.data.err) {
                        resolve(false);
                    }
                })
                .catch(err => {
                    reject(false);
                })
            });
        },

        validateForm: async function() {
            this.errors.length = 0;
            if (!this.email) this.errors.push(ErrorMessages.noEmail);
            if (!this.password) this.errors.push(ErrorMessages.noPassword);
            const isValidEmail = await this.validateEmail();

            if (!isValidEmail) {
                this.errors.push(ErrorMessages.noUserWithEmail);
            }

        },
        signIn: function(e) {
            e.preventDefault();
            this.validateForm();
            this.submitUserData();
    }
    },
}
</script>
