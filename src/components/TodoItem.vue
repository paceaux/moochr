<template>
    <article class="todo">
        <header class="todo__header">
            <time class="todo__time" :datetime="todo.timestamp">{{day}}, {{month}} {{ordinalDate}}, {{time.getYear()}}</time>
            <p class="todo__type">{{todo.type}}</p>
            <button @click="$emit('remove',todo.id)">Delete</button>
        </header>
        <p class="todo__content" v-on:dblclick="toggleEdit" :contenteditable="isEditable" v-on:keyup.enter="updateContent($event)">{{todo.content}}</p>
    </article>
</template>
<script>
import TH from '../helpers/timehelper.js';
export default {
    props: {
        todo: {
            type: Object,
            required: true
        },
        isEditable: false
    },
    computed: {
        time() {
            const time = new Date(this.todo.timestamp);

            return time;
        },
        day() {
            return TH.getDayOfWeek(this.time.getDay())
        },
        month() {
            return TH.getMonthOfYear(this.time.getMonth());
        },
        ordinalDate() {
            const date = this.time.getDate();

            return TH.getOrdinalDate(date);
        }
    },
    methods: {
        updateContent(evt) {
            this.todo.content = evt.target.innerText;
            this.$emit('update', this.todo);
            this.toggleEdit();
    },
    toggleEdit() {
        this.isEditable = !this.isEditable;
        }
    }
}
</script>
