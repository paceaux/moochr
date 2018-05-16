<template>
  <article class="card card--item" v-if="item">
      <figure class="card__media">
          <img class="card__media__image" v-if="item.image" :src="item.image" alt="item.name" />
      </figure>
        <div class="card__info">
            <h2 v-if="item.name" class="card__name">{{item.name}}</h2>
            <table class="card__infoTable">
                <tbody>
                    <tr v-if="item.model_number">
                        <th id="itemModel">Model: </th>
                        <td headers="itemModel">{{item.model_number}}</td>
                    </tr>
                    <tr v-if="item.serial_number">
                        <th id="itemSerial">Serial:</th>
                        <td headers="itemSerial">{{item.serial_number}}</td>
                    </tr>
                    <tr v-if="item.value && !hideValue">
                        <th id="itemValue">Value: </th>
                        <td headers="itemValue">{{itemValue}}</td>
                    </tr>
                </tbody>
            </table>

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
import FormatHelper from '../helpers/formathelper';
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
        },
        itemValue() {
            return FormatHelper.getCurrency(this.item.value);
        }
    },
    beforeCreate() {

    }
}
</script>
