<template>
      <form class="form form--itemCreate">
        <fieldset class="form__fieldset form__fieldset--itemInfo">
            <legend>About the Item </legend>
            <label for="name" class="form__field form__field--name">
                <span class="form__fieldLabel">name</span>
                <input id="name" v-model="item.name" type="text"/>
            </label>

            <label for="category" class="form__field form__field--category">
                <span class="form__fieldLabel">category</span>
                <select id="owner" v-model="item.category" multiple>
                    <option>Pick a Category</option>
                    <option v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    :value="category.id">{{category.name}}</option>
                </select>
            </label>

            <label for="model_number" class="form__field form__field--model">
                <span class="form__fieldLabel">Model Number</span>
                <input id="model_number" v-model="item.model_number" type="text" />
            </label>

            <label for="serial_number" class="form__field form__field--serial">
                <span class="form__fieldLabel">Serial Number</span>
                <input id="serial_number" v-model="item.serial_number" type="text" />
            </label>

            <label for="image" class="form__field form__field--image">
                <span class="form__fieldLabel">Image</span>
                <input id="file"  type="file" accept="image/*" @change="onFileChange"/>
                <img v-if="itemPreviewImage" class="form__imgPreview" :src="itemPreviewImage" />
            </label>
        </fieldset>

        <fieldset class="form__fieldset form__fieldset--owner">
            <legend>Loaning the item </legend>
            <label for="owner" class="form__field">
                <span class="form__fieldLabel">owner</span>
                <select id="owner" v-model="item.owner">
                    <option>Pick an owner</option>
                    <option v-for="owner in owners"
                    :key="owner.id"
                    :owner="owner"
                    :value="owner.id">{{owner.firstname}}</option>
                </select>
            </label>

            <label for="is_loanable" class="form__field form__field--loanable">
                <span class="form__fieldLabel">isLoanable</span>
                <input id="is_loanable" v-model="item.is_loanable" type="checkbox"  />
            </label>

            <output class="form__fieldOutput form__fieldOutput--owner" >
                <UserCard v-if="item.owner" :user="getOwner(item.owner)" :hideAddress="true" class="form__userCard"></UserCard>
            </output>
        </fieldset>

        <fieldset class="form__fieldset form__fieldset--borrow" v-if="isShowingBorrow">
            <legend>Borrowing the Item </legend>

            <label for="borrower" class="form__field">
                <span class="form__fieldLabel">Borrower</span>
                <select id="borrower" v-model="item.borrower">
                    <option>Pick an borrower</option>
                    <option v-for="borrower in borrowers"
                    :key="borrower.id"
                    :borrower="borrower"
                    :value="borrower.id">{{borrower.firstname}} {{borrower.lastname}}</option>
                </select>
            </label>

            <output class="form__fieldOutput form__fieldOutput--borrower" >
                    <UserCard v-if="item.borrower" :user="getOwner(item.borrower)" :hideAddress="true" class="form__userCard"></UserCard>
            </output>

            <label for="time_loaned" class="form__field">
                <span class="form__fieldLabel">When is it loaned</span>
                <input id="time_loaned" v-model="item.time_loaned" :min="dateMin" type="date" />
            </label>

            <label for="time_due" class="form__field">
                <span class="form__fieldLabel">When is it due back</span>
                <input for="time_due" v-model="item.time_due" :min="dateMin" type="date" />
            </label>

            <label for="time_return" class="form__field">
                <span class="form__fieldLabel">When did you get it back</span>
                <input id="time_return" v-model="item.time_return" :min="dateMin" type="date" />
            </label>
        </fieldset>
        <fieldset class="form__fieldset form__fieldset--controls">
            <button class="form__submit" v-on:click="addContent(item)">save</button>
        </fieldset>
    </form>
</template>
<script>
import UserCard from './UserCard.vue';
export default {
    components: {
        UserCard
    },
    computed: {
        items() {
            return this.$store.state.items.items;
        },
        owners() {
            return this.$store.state.users.users;
        },
        borrowers() {
            const users = this.$store.state.users.users;
            let borrowers = users;

            if (this.item.owner) {

                borrowers = users.filter(user => {
                    return user.id != this.item.owner;
                });
            }
            return borrowers;
        },
        categories() {
            return this.$store.state.categories.categories;
        },
        dateMin() {
            const now = new Date();
            return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        },
        isShowingBorrow() {
            return this.item.is_loanable;
        },
        timeDueMin(){
            const time = new Date(this.item.time_loaned);
            return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        },
    },
    data () {
        return {
            item: {
                name: '',
                is_loanable: false,
                category: [],
                owner: null,
                borrower: null,
                image: '',
                model_number: '',
                serial_number: '',
                time_due: null,
                time_loaned: null,
                time_return: null,
                value: 0.0,

            },
            itemPreviewImage: ''
        };
    },
    props : {

    },
    methods: {
        getOwner(id) {
            let owner;

            if (this.item.owner) {
                owner = this.owners.find(user => user.id == id);
            }

            return owner;
        },
        addContent() {
            this.$store.dispatch('addItem',this.item);
            this.item = {
            item: {
                name: '',
                is_loanable: false,
                category: [],
                owner: null,
                borrower: null,
                image: '',
                model_number: '',
                serial_number: '',
                time_due: null,
                time_loaned: null,
                time_return: null,
                value: 0.0,

            }
            };
            this.$router.push('/itemList');
        },
        onFileChange(evt) {
            const files = evt.target.files || evt.dataTransfer.files;

            if (!files.length) return;

            this.createImage(files[0]);

        },
        createImage(file) {

            this.itemPreviewImage = window.URL.createObjectURL(file);

            /*
            couldn't figure out how to send blobs
            https://stackoverflow.com/questions/6196666/converting-image-to-binary-array-blob-with-html5
            */
            create_blob(file, (blob_string) => {
                this.item.image =blob_string;
            });

            function create_blob(file, callback) {
                var reader = new FileReader();
                reader.onload = function() { callback(reader.result) };
                reader.readAsDataURL(file);
            }
        },
        removeImage () {
            this.itemPreviewImage = '';
            this.item.image = '';
        }
    }
}
</script>
