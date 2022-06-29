<template>
	<event-list />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import EventList from '@/components/tableList/EventList.vue';

export default defineComponent({
	name: 'EventsIndex',
	components: {
		EventList,
	},
});
</script>
