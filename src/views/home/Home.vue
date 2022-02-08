<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="@assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
		<resource-list />
		<event-list />
		<class-list />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ResourceList from '@/components/tableList/ResourceList.vue';
import EventList from '@/components/tableList/EventList.vue';
import ClassList from '@/components/tableList/ClassList.vue';

export default defineComponent({
	name: 'Home',
	components: {
		ResourceList,
		EventList,
		ClassList,
	},
});
</script>
