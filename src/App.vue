<template>
	<div id="TodoApp">
		<Intro/>
		<UserTable />
        	<TodoList />
	</div>
</template>
<script>
import Intro from './components/Intro.vue';
import TodoList from './components/TodoList.vue';
import UserTable from './components/UserTable.vue';

export default {
	components: {
        Intro,
        TodoList,
	UserTable
	}
}
</script>
