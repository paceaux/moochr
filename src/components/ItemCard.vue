<template>
  <article class="card card--item" v-if="item">
      <figure class="card__media">
          <img class="card__media__image" v-if="item.image" :src="item.image" />
      </figure>
        <div class="card__info">
            <h2 v-if="item.name" class="card__name">{{item.name}}</h2>
            <p v-if="item.model_number" class="card__text">Model: {{item.model_number}}</p>
            <p v-if="item.serial_number" class="card__text">Serial: {{item.serial_number}}</p>
            <p v-if="item.value && !hideValue" class="card__text">Value: {{item.value}}</p>
        </div>
        <div class="card__section" v-if="!hideOwner && itemOwner">
            <h3 class="card__sectionTitle">Owned By:</h3>
            <UserCard class="card__owner" :user="itemOwner" :hideAddress="true"></UserCard>
        </div>
        <div class="card__section" v-if="!hideBorrower && itemBorrower">
            <h3 class="card__sectionTitle">Borrowed By: </h3>
            <UserCard class="card__borrower" :user="itemBorrower" :hideAddress="true"></UserCard>
            <p class="card__text" v-if="item.time_loaned">Loaned on:<time datetime="item.time_loaned">{{loanedOn}}</time></p>
            <p class="card__text" v-if="item.time_return">Due on:<time datetime="item.time_return">{{dueOn}}</time></p>
        </div>
  </article>
</template>
<script>
import TimeHelper from '../helpers/timehelper';
import UserCard from './UserCard.vue';
export default {
    components: {
        UserCard
    },
    props: {
        item: {
            type: Object,
            required: false
        },
        hideOwner: {
            type: Boolean,
            required: false
        },
        hideCategory: {
            type: Boolean,
            required: false,
        },
        hideBorrower: {
            type: Boolean,
            required: false
        },
        hideValue: {
            type: Boolean,
            required: false
        }

    },
    data () {
        return {}
    },
    computed: {
        itemOwner() {
            if (!this.item.owner) return null;
            return this.$store.getters.userById(this.item.owner);
        },
        itemBorrower() {
            if (!this.item.borrower) return null;
            return this.$store.getters.userById(this.item.borrower);
        },
        categoryName() {
        },
        loanedOn() {
            return TimeHelper.getTextDate(this.item.time_loaned);
        },
        dueOn() {
            return TimeHelper.getTextDate(this.item.time_due);
        }
    },
    beforeCreate() {

    }
}
</script>
