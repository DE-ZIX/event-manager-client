<template>
	<div v-if="modelValue.id">
		<resource-form v-model="modelValue" />
		<q-btn @click="save" class="q-mt-lg" label="Save" color="primary" no-caps />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ResourceForm from '@/views/resources/ResourceForm.vue';
import { ResourceService } from '@services/eventManagerAPI';
import { Resource } from '@/models';

export default defineComponent({
	components: {
		ResourceForm,
	},
	setup() {
		const modelValue = ref(new Resource());
		const service = new ResourceService();
		const loading = ref(false);

		return {
			loading,
			modelValue,
			service,
		};
	},
	methods: {
		save() {
			this.loading = true;
			this.service
				.put(this.modelValue as Resource)
				.then((data) => {
					this.$showSuccess('Resource updated');
					this.modelValue = new Resource(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error updating Resource');
				})
				.finally(() => {
					this.loading = false;
					this.$router.push({
						name: 'detailsResource',
						params: { id: this.modelValue.id },
					});
				});
		},
		fetch() {
			this.loading = true;
			this.service
				.get(Number(this.$route.params.id))
				.then((data) => {
					this.modelValue = new Resource(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Resource');
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	created() {
		this.fetch();
	},
});
</script>
