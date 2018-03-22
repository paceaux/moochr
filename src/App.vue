<template>
	<div id="TodoApp">
		<Intro/>
        <TodoList />
	</div>
</template>
<script>
import Intro from './components/Intro.vue';
import TodoList from './components/TodoList.vue';

export default {
	components: {
        Intro,
        TodoList
	}
}
</script>
