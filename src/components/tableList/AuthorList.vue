<template>
	<entity-list :service="service" :type="classType" :typeName="typeName" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AuthorService } from '@/services/eventManagerAPI';
import EntityList from '@/components/tableList/EntityList.vue';
import { Author } from '@/models';

export default defineComponent({
	components: {
		EntityList,
	},
	setup() {
		const service = new AuthorService();
		const classType = new Author();

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
