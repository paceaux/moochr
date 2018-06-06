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
                <output class="form__fieldsetInfo"></output>
            </fieldset>
            <fieldset class="form__fieldset form__fieldset--controls">
                <button class="form__submit">Log In</button>
            </fieldset>
        </form>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            email: '',
            password: '',
        };
    },
    props: {},
    computed: {},
    methods: {}
}
</script>
