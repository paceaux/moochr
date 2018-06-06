<template>
	<main id="MoochrApp">
		<Intro/>
		<router-view></router-view>
	</main>
</template>
<script>
import Intro from './components/Intro.vue';
import UserTable from './components/UserTable.vue';
import CategoryTable from './components/CategoryTable.vue';
import ItemTable from './components/ItemTable.vue';
import UserCards from './components/UserCards.vue';
import UserProfile from './components/UserProfile.vue';
import LoginSection from './components/LoginSection.vue';

export default {
	components: {
        Intro,
		UserTable,
		CategoryTable,
		ItemTable,
		UserCards,
		UserProfile,
		LoginSection,
	}
}
</script>
