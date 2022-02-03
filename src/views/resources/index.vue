<template>
	<resource-list />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ResourceList from '@/components/tableList/ResourceList.vue';

export default defineComponent({
	components: {
		ResourceList,
	},
});
</script>
