<template>
	<div>
		<h1>Resource List</h1>
		<table-list :items="resources" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TableList from '@/components/TableList.vue';
import { ResourceService } from '@services/eventManagerAPI';
import { ConsultList } from '@/models';

export default defineComponent({
	components: {
		TableList,
	},
	setup() {
		const resourceService = new ResourceService();
		const resources = ref(new ConsultList());
		const loading = ref(false);

		return {
			resourceService,
			resources,
			loading,
		};
	},
	methods: {
		fetchResources() {
			this.loading = true;
			this.resourceService
				.getResources()
				.then((data) => {
					this.resources = data;
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching resources');
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	created() {
		this.fetchResources();
	},
});
</script>
