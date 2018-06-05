<template>
    <fieldset>
            <label for="password" class="form__field">
                <span class="form__fieldLabel">password</span>
                <input
                 v-model="currentPassword"
                 type="password"
                 required
                 :disabled="!isEditable"
                 v-on:keyup="calcPwdStrength()" v-on:blur="isShowingConfirm = true"
                 />
                <meter v-show="isEditable" min="0" max="4" low="2" high="3" v-bind:value="passwordStrength"></meter>
            </label>
            <label for="password" class="form__field" v-show="isShowingConfirm && isEditable">
                <span class="form__fieldLabel">confirm password</span>
                <input
                v-model="passwordConfirm"
                type="password"
                required
                :disabled="!isEditable"
                v-on:keyup="validatePasswords()"
                />
                <span v-show="!hasPasswordMatch">Passwords do not match!</span>
                <span v-show="hasPasswordMatch">Passwords match!</span>
            </label>
    </fieldset>
</template>
<script>
import zxcvbn from 'zxcvbn';

export default {
    data() {
        return {
          currentPassword: '',
          passwordConfirm: '',
          isShowingConfirm: false,
          hasPasswordMatch: false,
          passwordStrength: 0,
        };
    },
    props: {
        password: {
            type: String,
            required: true
        },
        isEditable: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    computed: {
        hasValidPassword() {
            return (
              this.hasPasswordMatch &&
              this.passwordStrength > 2
            );
        }
    },
    methods: {
      validatePasswords() {
          this.hasPasswordMatch = (this.currentPassword === this.passwordConfirm);
            console.log('validate passwords');
          if (this.hasValidPassword) {
              this.$emit('passwordUpdate',this.currentPassword);
          }
      },
      calcPwdStrength() {
         const strength =  zxcvbn(this.currentPassword);
         this.passwordStrength = strength.score;
      },
    }
}
</script>
