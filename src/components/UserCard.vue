<template>
  <article class="card card--user" v-if="user">
        <h2 class="card__name">
          <router-link :to="{name: 'user', params: {id: user.id}}"> {{name}} </router-link>
        </h2>
      <div v-if="!hideContact" class="card__contact">
          <a v-if="user.email" class="card__email" :href="emailLink">{{user.email}}</a>
          <a v-if="user.phone" class="card__phone" :href="telLink">{{user.phone}}</a>
      </div>
      <div v-if="!hideAddress" class="card__address">
          <p v-if="user.street1 && !hideStreet" class="card__street">{{user.street1}}</p>
          <p v-if="user.street2 && !hideStreet" class="card__street">{{user.street2}}</p>
          <p class="card__region">
            <span v-if="user.city">{{user.city}}</span>
            <span v-if="user.state">{{user.state}}</span>
            <span v-if="user.zip">{{user.zip}}</span>
          </p>
          <p v-if="user.country" class="card__country">{{user.country}}</p>
      </div>
  </article>
</template>
<script>
export default {
    props: {
        user: {
            type: Object,
            required: false
        },
        hideAddress: {
            type: Boolean,
            required: false
        },
        hideContact: {
            type: Boolean,
            required: false
        },
        hideStreet: {
            type: Boolean,
            required: false
        },
        hideProfleLink: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {};
    },
    computed: {
        id() {
            return this.user.id;
        },
        name() {
            const first = this.user.firstname ? this.user.firstname : '';
            const last = this.user.lastname ? this.user.lastname : '';

            return `${first} ${last}`;
        },
        emailLink() {
            return `mailto:${this.user.email}`;
        },
        telLink() {
            return `tel:${this.user.phone}`;
        }
    }
}
</script>