<template>
	<entity-list :service="service" :type="classType" :typeName="typeName" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EventService } from '@services/eventManagerAPI';
import EntityList from '@/components/tableList/EntityList.vue';
import { Event } from '@/models';

export default defineComponent({
	components: {
		EntityList,
	},
	setup() {
		const service = new EventService();
		const classType = new Event();

		return {
			service,
			classType,
		};
	},
	computed: {
		typeName(): string {
			return this.classType.constructor.name;
		},
	},
});
</script>
