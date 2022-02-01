<template>
	<entity-list :service="service" :type="classType" :typeName="typeName" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ClassService } from '@services/eventManagerAPI';
import EntityList from '@/components/tableList/EntityList.vue';
import { Class } from '@/models';

export default defineComponent({
	components: {
		EntityList,
	},
	setup() {
		const service = new ClassService();
		const classType = new Class();

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
