<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="@assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
		<resource-list />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ResourceList from '../home/ResourceList.vue';

export default defineComponent({
	name: 'Home',
	components: {
		ResourceList,
	},
});
</script>
