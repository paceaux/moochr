<template>
    <section class="todos" v-if="state.todos.length">
        <TodoItem v-for="todo in state.todos" :key="todo.id" :todo="todo" @remove="removeItem" @update="updateItem">
        </TodoItem>
    </section>
</template>
<script>
import Store from '../store.js';
import TodoItem from './TodoItem.vue';

export default {
    components: {
        TodoItem
    },
    data () {
        return Store;
    },
    beforeMount() {
        console.log(this.state);
    },
    mounted() {
        console.log(this.state);
    },
    methods: {
        removeItem(id) {
            this.deleteTodo(id);
        },
        updateItem(todo) {
            this.updateTodo(todo);
            console.log(this.state.todos);
        }
    }
}
</script>
