<template>
	<div id="MoochrApp">
		<Intro/>
		<router-view></router-view>
	</div>
</template>
<script>
import Intro from './components/Intro.vue';
import UserTable from './components/UserTable.vue';
import CategoryTable from './components/CategoryTable.vue';

export default {
	components: {
        Intro,
		UserTable,
		CategoryTable
	}
}
</script>
