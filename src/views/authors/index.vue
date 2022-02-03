<template>
	<author-list />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthorList from '@/components/tableList/AuthorList.vue';

export default defineComponent({
	components: {
		AuthorList,
	},
});
</script>
